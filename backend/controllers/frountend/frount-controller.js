const Admin = require('../../model/admin')
const User = require('../../model/userModal')
const PaymentHistory = require('../../model/PaymentHistory')
const Withdrawal = require('../../model/withdrawal')
const BonusHistory = require('../../model/bonusHistory')
const path = require('path');
const moment = require("moment");
const Joi = require('joi');
const app = require("../../app")
const crypto = require('crypto');
const mongoose = require('mongoose');
const { Console } = require('console');
const nodemailer = require('nodemailer');




exports.registerUser = async (req, res) => {
  try {
    // JOI SCHEMA
    const schema = Joi.object({
      firstName: Joi.string()
        .required(),
      lastName: Joi.string()
        .required(),
      email: Joi.string()
        .email()
        .required(),
      phoneNo: Joi.string()
        .pattern(/^\d{10}$/)
        .required(),
      password: Joi.string()
        .min(6)
        .required(),
      joinCode: Joi.string()
    }).options({ abortEarly: false }); // Show all errors

    // JOI VALIDATION
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.details // just like your example
      });
    }

    const { email, firstName, lastName, phoneNo, password } = req.body;
    const joinCode = req.body.joinCode || null;

    // EMAIL EXIST CHECK
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // If joinCode is provided, validate it
    if (joinCode) {
      const referrer = await User.findOne({ referCode: joinCode });
      if (!referrer) {
        return res.status(400).json({ success: false, message: "Invalid referral code" });
      }
    }

    // generate refer code

    const referCode = Math.floor(100 + Math.random() * 9000000000);

    // USER SAVE
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNo: phoneNo,
      password: password,
      status: "active",
      profileLevel: 1,
      referCode: referCode,
      joinCode: joinCode,
      accountActivationKey: false,
      userWallet: 0
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

exports.loginUser = async (req, res) => {
  try {

    // JOI validation
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }).options({ abortEarly: false });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        bablu: error.details
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Check user status
    if (user.status === 'banned') {
      return res.status(403).json({ success: false, message: "Your account is banned" });
    }

    if (user.status === 'inactive') {
      return res.status(403).json({ success: false, message: "Your account is inactive" });
    }

    // Plain password match (no bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Success
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: user
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create Order API


exports.createOrder = async (req, res) => {
  console.log("hiiiiiiiiiiiiiiiii")
  console.log("1==========",process.env.RAZORPAY_KEYID)
  console.log("2=========",process.env.RAZORPAY_SECRET)
  const razorpay = app.razorpay
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // Razorpay uses paisa
    currency: "INR",
    receipt: "order_rcptid_11"
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("Razorpay Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }

};


exports.purchaseCourse = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      buyerId,
      course
    } = req.body;

    const price = parseFloat(course.price);

    // ✅ Save to payment history
    const savePaymentHistory = await PaymentHistory.create({
      userId: buyerId,
      course: course,
      amountPaid: price,
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      transactionId: razorpay_payment_id,
    });

    // // ✅ Required field check
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !buyerId || !course) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // // ✅ Razorpay Signature Verification
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid signature. Payment verification failed.' });
    }

    const buyer = await User.findById(buyerId);
    if (!buyer) return res.status(404).json({ message: 'Buyer not found.' });

    // 🔓 Activate Account
    buyer.accountActivationKey = true;
    await buyer.save();
    const commissionPercent = parseFloat(course.commisionPercent);
    const level1Commission = (parseInt(price) * parseInt(commissionPercent)) / 100;
    let level2Commission = 0;

    let level1 = null;
    let level2 = null;

    // ✅ Check level 1
    if (buyer.joinCode) {
      level1 = await User.findOne({ referCode: buyer.joinCode });
      // console.log("1111111111", level1)
    }

    // ✅ Check level 2 only if level1 exists and has joinCode
    if (level1 && level1.joinCode) {
      level2 = await User.findOne({ referCode: level1.joinCode });
      // console.log("l222222222", level2)

      if (level2) {
        level2Commission = parseInt((price * 5)) / 100;
      }
    }

    // ✅ Update wallets safely
    if (level1) {
      const level1Wallet = isNaN(Number(level1.userWallet)) ? 0 : Number(level1.userWallet);
      level1.userWallet = level1Wallet + level1Commission;

      await level1.save();
    }

    if (level2) {
      const level2Wallet = isNaN(Number(level2.userWallet)) ? 0 : Number(level2.userWallet);
      level2.userWallet = level2Wallet + level2Commission;
      await level2.save();

    }


    // Update the payment history to 'success' with additional information
    const updatedPayment = await PaymentHistory.findByIdAndUpdate(
      savePaymentHistory._id, // Finding the record by the initial 'payment' object
      {
        $set: {
          paymentStatus: "success",
          level1Referrer: level1?._id || null,
          level2Referrer: level2?._id || null,
          commissionToLevel1: level1 ? level1Commission : 0,
          commissionToLevel2: level2 ? level2Commission : 0,
        },
      },
      { new: true } // This will return the updated document
    );

    // send mail to user

    const mailTemp = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Purchase Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.4; color: #333; margin: 0; padding: 10px; background-color: #f4f4f4;">
    
    <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; max-width: 100%;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #2c3e50; margin: 0; font-size: 22px;">🎉 Course Purchased!</h1>
            <p style="color: #7f8c8d; margin: 5px 0 0 0; font-size: 14px;">Thank you for your purchase</p>
        </div>
        
        <!-- Course Details -->
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 16px;">Dear ${buyer.firstName}</h3>
            <p style="margin: 5px 0; color: #2c3e50; font-size: 14px;"><strong>Course:</strong> ${course.title}</p>
            <p style="margin: 5px 0; color: #2c3e50; font-size: 14px;"><strong>Order ID:</strong> ${razorpay_order_id}</p>
            <p style="margin: 5px 0; color: #27ae60; font-size: 14px;"><strong>Amount:</strong> ${course.price}</p>
        </div>
        
        <!-- Access Button -->
        <div style="text-align: center; margin: 20px 0;">
            <a href="[COURSE_ACCESS_LINK]" style="background-color: #3498db; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block;">
                🚀 Access Course
            </a>
        </div>
        
        <!-- Referral Section -->
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 16px;">💰 Earn 80% Commission!</h3>
            <p style="margin: 0 0 10px 0; color: #856404; font-size: 14px;">Share & earn 80% on every sale!</p>
            
            <div style="background-color: #ffffff; padding: 10px; border-radius: 4px; margin: 10px 0;">
                <p style="margin: 0 0 5px 0; color: #856404; font-weight: bold; font-size: 14px;">Your Referral Link:</p>
                <div style="background-color: #f8f9fa; padding: 8px; border-radius: 4px; word-break: break-all; font-size: 12px; color: #2c3e50; border: 1px dashed #ffc107;">
                    [YOUR_REFERRAL_LINK]
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 10px;">
                <a href="[REFERRAL_DASHBOARD_LINK]" style="background-color: #ffc107; color: #856404; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; font-size: 14px;">
                    📊 View Dashboard
                </a>
            </div>
        </div>
        
        <!-- What's Next -->
        <div style="margin-bottom: 20px;">
            <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 16px;">✅ Next Steps:</h3>
            <ol style="margin: 0; padding-left: 18px; color: #2c3e50; font-size: 14px;">
                <li style="margin: 5px 0;">Access your course above</li>
                <li style="margin: 5px 0;">Start learning</li>
                <li style="margin: 5px 0;">Share referral link</li>
                <li style="margin: 5px 0;">Earn 80% commission</li>
            </ol>
        </div>
        
        <!-- Support -->
        <div style="background-color: #e3f2fd; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #1976d2; margin: 0 0 8px 0; font-size: 16px;">💬 Need Help?</h3>
            <p style="margin: 0; color: #1976d2; font-size: 14px;">
                Email: <a href="mailto:support@yoursite.com" style="color: #2196f3;">support@yoursite.com</a><br>
                FAQ: <a href="[FAQ_LINK]" style="color: #2196f3;">Help Center</a>
            </p>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee;">
            <p style="color: #7f8c8d; margin: 0 0 8px 0; font-size: 12px;">Thanks for choosing us!</p>
            <p style="color: #bdc3c7; margin: 0; font-size: 11px;">
                © 2024 [YOUR_WEBSITE_NAME]<br>
                Sent to [USER_EMAIL]
            </p>
        </div>
        
    </div>
    
</body>
</html>`

    // Step 1: Create a transporter object using your email provider
    let transporter = nodemailer.createTransport({
      service: 'gmail',  // You can use other email services too (like Yahoo, Outlook)
      auth: {
        user: 'earnscop.com@gmail.com',  // Replace with your email address
        pass: 'wzgcdludkaknjzgz'    // Replace with your email password or app-specific password
      }
    });

    // Step 2: Define the email options (to, from, subject, body)
    let mailOptions = {
      from: 'earnscop.com@gmail.com',   // Sender address
      to: buyer.email,  // List of recipients
      subject: 'Test Email from NodeMailer',  // Subject line
      html: mailTemp  // Plain text body
    };

    // Step 3: Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred:', error);
      } else {
        console.log('Email sent:');
      }
    });

    res.status(200).json({
      message: 'Payment verified and purchase complete.',
      commission: {
        level1: level1 ? level1Commission : 0,
        level2: level2 ? level2Commission : 0
      }
    });

  } catch (err) {
    console.error("❌ Razorpay Payment Error:", err);
    return res.status(500).json({
      message: 'Internal server error.',
      error: err.message
    });
  }
};

exports.dashBoardInfo = async (req, res) => {

  try {

    const { userId, referCode } = req.query;
    if (!userId || !referCode) {
      return res.status(400).json({ message: 'userId and referCode are required in query.' });
    }

    // 📅 Date Ranges
    const todayStart = moment().startOf('day').toDate();
    const todayEnd = moment().endOf('day').toDate();

    const yesterdayStart = moment().subtract(1, 'days').startOf('day').toDate();
    const yesterdayEnd = moment().subtract(1, 'days').endOf('day').toDate();

    const monthStart = moment().startOf('month').toDate();
    const monthEnd = moment().endOf('month').toDate();

    // 📊 Exact earnings by level
    const getExactEarnings = async (start, end) => {
      const [level1Result, level2Result] = await Promise.all([
        PaymentHistory.aggregate([
          {
            $match: {
              level1Referrer: mongoose.Types.ObjectId(userId),
              createdAt: { $gte: start, $lte: end }
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: { $toDouble: '$commissionToLevel1' } }
            }
          }
        ]),
        PaymentHistory.aggregate([
          {
            $match: {
              level2Referrer: mongoose.Types.ObjectId(userId),
              createdAt: { $gte: start, $lte: end }
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: { $toDouble: '$commissionToLevel2' } }
            }
          }
        ])
      ]);

      return {
        level1: level1Result[0]?.total || 0,
        level2: level2Result[0]?.total || 0
      };
    };

    const today = await getExactEarnings(todayStart, todayEnd);
    const yesterday = await getExactEarnings(yesterdayStart, yesterdayEnd);
    const monthly = await getExactEarnings(monthStart, monthEnd);
    const total = await getExactEarnings(new Date('1970-01-01'), new Date());

    // 👥 Direct Subnets (Level 1)
    const directUsers = await User.find(
      { joinCode: referCode },
      { firstName: 1, referCode: 1 }
    );
    const directUserIds = directUsers.map(u => u._id);

    // 📦 Count of Direct Users Who Purchased a Course
    const directUserCoursePurchaseCount = await PaymentHistory.countDocuments({
      userId: { $in: directUserIds },
      paymentStatus: 'success'
    });

    // 👥 Team Subnets (Level 2)
    const level1ReferCodes = directUsers.map(u => u.referCode).filter(Boolean);
    const teamSubnetCount = await User.countDocuments({
      joinCode: { $in: level1ReferCodes }
    });

    // 🧾 Commission History
    const rawCommissionHistory = await PaymentHistory.find({
      $or: [
        { level1Referrer: mongoose.Types.ObjectId(userId) },
        { level2Referrer: mongoose.Types.ObjectId(userId) }
      ]
    })
      .populate('userId', 'firstName')
      .sort({ createdAt: -1 });

    const commissionHistory = rawCommissionHistory.map(entry => {
      let level = null;
      let commission = 0;

      if (entry.level1Referrer?.toString() === userId) {
        level = 'level1';
        commission = parseFloat(entry.commissionToLevel1 || 0);
      } else if (entry.level2Referrer?.toString() === userId) {
        level = 'level2';
        commission = parseFloat(entry.commissionToLevel2 || 0);
      }

      return {
        buyerName: entry.userId?.firstName || 'Unknown',
        courseTitle: entry.course?.title || 'N/A',
        level,
        commission,
        date: entry.createdAt.toISOString().split('T')[0]
      };
    });

    // 🧾 User's Own Purchase History
    const userPurchases = await PaymentHistory.find({ userId: mongoose.Types.ObjectId(userId) })
      .populate('course', 'title price')
      .sort({ createdAt: -1 });

    const purchaseHistory = userPurchases.map(entry => ({
      courseTitle: entry.course?.title || 'N/A',
      price: entry.course?.price || 0,
      date: entry.createdAt.toISOString().split('T')[0]
    }));

    // fetch withdrawal history by user

    const withdrawalHistory = await Withdrawal.find({ userId: userId }).sort({ requestedAt: -1 });
    // ✅ Final Response
    res.json({
      todayEarning: today.level1 + today.level2,
      yesterdayEarning: yesterday.level1 + yesterday.level2,
      monthlyEarning: monthly.level1 + monthly.level2,
      totalEarning: total.level1 + total.level2,
      directSubnets: directUsers.map(u => u.firstName),
      directSubnetsPurchaseCount: directUserCoursePurchaseCount, // <-- ✅ Added Count Here
      teamSubnetCount,
      commissionHistory,
      purchaseHistory,
      withdrawalHistory
    });

  } catch (error) {
    console.error('Earning API Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }

}


exports.withdrawFunds = async (req, res) => {
  const { userId, amount, password, paymentMethod, paymentDetails } = req.body;

  // ✅ 1. Basic validation
  if (!userId || !amount || !password || !paymentMethod || !paymentDetails) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields."
    });
  }

  try {
    // ✅ 2. Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    // ✅ 3. Validate password

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password."
      });
    }

    // ✅ 4. Check wallet balance
    if (amount >= user.userWallet) {
      return res.status(400).json({
        success: false,
        message: "Insufficient wallet balance."
      });
    }

    // ✅ 5. Deduct wallet balance
    user.userWallet -= amount;
    await user.save();

    // ✅ 6. Create withdrawal record
    const withdrawal = await Withdrawal.create({
      userId: user._id,
      amount,
      paymentMethod,
      paymentDetails,
      status: "pending",         // For admin approval
    });

    // ✅ 6. Fetch all withdrawals by user
    const withdrawalHistory = await Withdrawal.find({ userId: user._id }).sort({ requestedAt: -1 });

    // ✅ 7. Send success response
    return res.status(200).json({
      success: true,
      message: "Withdrawal request submitted successfully.",
      newBalance: user.walletBalance,
      withdrawalHistory: withdrawalHistory
    });

  } catch (error) {
    console.error("❌ Withdrawal error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};

// Example: Give Signup Bonus
module.exports.invitationBonus = async (req, res) => {
  try {
    const userId = req.body.userId
    const bonusId = req.body.bonusId
    const bonusAmount = req.body.bonusAmount
    const user = await User.findById(userId);
    if (!user) {
      return { error: 'User not found' };
    }


    if (user.bonusesReceived.includes(bonusId)) {
      return res.status(400).json({
        success: false,
        message: "Bonus already received"
      });
    }

    // Update wallet and mark bonus as received
    user.userWallet += bonusAmount;
    user.bonusesReceived.push(bonusId);
    await user.save();
    const updatedUser = await User.findById(userId);
    res.status(200).json({ message: 'Bonus received', user: updatedUser })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Server error. Please try again later."
    });
  }
};


module.exports.bonusHistory = async (req, res) => {
  try {
    const userId = req.body.userId
    const bonusAmount = req.body.bonusAmount
    const bonusType = req.body.bonusType
    const createBonusHistory = await BonusHistory.create({
      userId: userId,
      bonusAmount: bonusAmount,
      bonusType: bonusType,
    });
    const bonusHistory = await BonusHistory.find({ userId: userId })
    res.status(200).json({ message: 'Bonus history saved', bonusHistory: bonusHistory })

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Server error. Please try again later."
    });
  }
};


