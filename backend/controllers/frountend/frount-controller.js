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

    console.log("---------", req.body)

    // // ✅ Required field check
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !buyerId || !course) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // // ✅ Razorpay Signature Verification
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SCERET)
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

    const price = parseFloat(course.price);
    const commissionPercent = parseFloat(course.commisionPercent);
    const level1Commission = (parseInt(price) * parseInt(commissionPercent)) / 100;
    let level2Commission = 0;

    let level1 = null;
    let level2 = null;

    // ✅ Check level 1
    if (buyer.joinCode) {
      level1 = await User.findOne({ referCode: buyer.joinCode });
      console.log("1111111111", level1)
    }

    // ✅ Check level 2 only if level1 exists and has joinCode
    if (level1 && level1.joinCode) {
      level2 = await User.findOne({ referCode: level1.joinCode });
      console.log("l222222222", level2)

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


    // ✅ Save to payment history
    await PaymentHistory.create({
      userId: buyer._id,
      course: course,
      amountPaid: price,
      paymentMethod: "razorpay",
      paymentStatus: "success",
      transactionId: razorpay_payment_id,
      level1Referrer: level1?._id || null,
      level2Referrer: level2?._id || null,
      commissionToLevel1: level1 ? level1Commission : 0,
      commissionToLevel2: level2 ? level2Commission : 0
    });

    res.status(200).json({
      message: 'Payment verified and purchase complete.',
      commission: {
        level1: level1 ? level1Commission : 0,
        level2: level2 ? level2Commission : 0
      }
    });

  } catch (err) {
    Console.log("ERROR", err)
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
  if (!user){
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
  res.status(200).json({ message: 'Bonus received' ,user:updatedUser})
 } catch (error) {
   return res.status(500).json({
      success: false,
      error:error.message,
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
      error:error.message,
      message: "Server error. Please try again later."
    });
  }
};


