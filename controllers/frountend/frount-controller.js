const Admin = require('../../model/admin')
const path = require('path');
const moment = require("moment");
const nodemailer = require('nodemailer')
const Product = require('../../model/productModal');
const slugify = require('slugify');
const { Parser } = require("json2csv");
const fs = require("fs");


// // ======= Generate CSV function =======
// async function generateFeed() {
//   try {

//     const products = await Product.find();

//     const feedData = products.map(product => ({
//       id: product._id.toString(),
//       title: product.title,
//       description: product.altText || product.overview?.replace(/(<([^>]+)>)/gi, "").slice(0, 500) || "High-performance ASIC miner",
//       link: `https://czminers.com/miner/${product.slug}`,
//       image_link: product.productImages?.[0] || "",
//       availability: "in stock",
//       price: product.sellPrice?.replace("US$", "").replace(",", "").trim() + " USD",
//       brand: product.brand || "Unknown",
//       condition: product.productType?.toLowerCase() || "new",
//       mpn: product._id.toString()
//     }));

//     const fields = [
//       "id",
//       "title",
//       "description",
//       "link",
//       "image_link",
//       "availability",
//       "price",
//       "brand",
//       "condition",
//       "mpn"
//     ];

//     const parser = new Parser({ fields });
//     const csv = parser.parse(feedData);

//     fs.writeFileSync("merchant-products-feed.csv", csv);
//     console.log("✅ Google Merchant CSV feed generated: merchant-products-feed.csv");

//     process.exit(0);
//   } catch (err) {
//     console.error("❌ Error generating feed:", err);
//     process.exit(1);
//   }
// }

// generateFeed();

// Sitemap
  
module.exports.getSitemap = async (req, res) => {
    try {
        const products = await Product.find({}, 'slug');
        console.log(products.length)

        let urls = products.map(product => {
            
            return `
                <url>
                    <loc>https://czminers.com/miner/${product.slug}</loc>
                    <changefreq>weekly</changefreq>
                    <priority>0.8</priority>
                </url>
            `;
        });

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                    <loc>https://czminers.com/</loc>
                    <changefreq>daily</changefreq>
                    <priority>1.0</priority>
                </url>
                ${urls.join('\n')}
            </urlset>
        `;

        res.header('Content-Type', 'application/xml');
        res.status(200).send(sitemap);

    } catch (err) {
        console.error('Error generating sitemap:', err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports.frountHomePage = async (req, res) => {
  try {
     const productData = await Product.find()
     .limit(16)

      const productData2 = await Product.find()
     .sort({ _id: -1 })
     .limit(16)
    
    res.render("frountend/index.ejs",{productData:productData,productData2:productData2})
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.products = async (req, res) => {
  try {
    const perPage = 12;
    const page = parseInt(req.query.page) || 1;
    const brand = req.query.brand;
    const algorithm = req.query.algorithm;

    // Filter logic
    let filter = {};

    if (brand) {
      filter.brand = brand;
    }
    if (algorithm) {
      filter.algorithm = algorithm;
    }

    const totalCount = await Product.countDocuments(filter);
    const pages = Math.ceil(totalCount / perPage); // Calculate total pages

    const productData = await Product.find(filter)
      .sort({ createdAt: -1 }) // Sort by createdAt if needed
      .skip((page - 1) * perPage)
      .limit(perPage);

    // Ensure that current and pages are passed correctly
    res.render('frountend/product', {
      productData: productData,
      current: page,  // Pass current page
      pages: pages,   // Pass total pages
      brand: brand,   // Pass brand filter
      algorithm: algorithm  // Pass algorithm filter
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addProducts = async (req, res) => {
  try {
    res.render("frountend/addProduct.ejs")
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addProductsSubmit = async (req, res) => {
  try {
    console.log("=======", req.body)
    console.log("=======", req.files)

    try {
      const {
        title, brand, algorithm, coin, mrp, sellPrice, productType,
        power, hashRate, overview, description
      } = req.body;

      const descriptionImage = req.files.descriptionImage ? req.files.descriptionImage[0]?.location : null;
      const productImages = req.files.productImages ? req.files.productImages.map(file => file.location) : [];

      const newProduct = new Product({
        title,
        brand,
        algorithm,
        coin,
        mrp,
        sellPrice,
        productType,
        power,
        hashRate,
        overview,
        description,
        status: 'active',
        descriptionImage: descriptionImage,
        productImages: productImages
      });

      // Save product to database
      await newProduct.save();

      res.redirect('/products')
    } catch (err) {
      console.error("Error creating product:", err);
      res.status(500).json({ message: "Error creating product", error: err });
    }


  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.productDetailPage = async (req, res) => {
  try {
    const slug = req.params.slug
    const productDetail = await Product.findOne({ slug: slug })
    console.log("===", productDetail)
    res.render("frountend/productDetail.ejs", { productDetail: productDetail })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.checkout = async (req, res) => {
  try {
    const slug = req.params.slug
    const productDetail = await Product.findOne({ slug: slug })
    console.log("===", productDetail)
    res.render("frountend/checkout.ejs", { productDetail: productDetail })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.checkoutSubmit = async (req, res) => {
  try {
    console.log("======", req.body)
    console.log("======", req.files)
    const { email, firstName, lastName, company, country, street, apartment, town, region, postcode, phone, orderNotes, payment, transactionId } = req.body

    const customerEmail = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
        <!-- Header -->
        <tr>
            <td style="background-color: #2c3e50; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Order Confirmation</h1>
            </td>
        </tr>
        
        <!-- Greeting -->
        <tr>
            <td style="padding: 30px 20px 20px 20px;">
                <h2 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 24px;">Dear Bablu Saini,</h2>
                <p style="color: #555; line-height: 1.6; margin: 0; font-size: 16px;">
                    Thank you for your order! We have successfully received your payment and your order is being processed.
                </p>
            </td>
        </tr>
        
        <!-- Order Details -->
        <tr>
            <td style="padding: 0 20px;">
                <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px;">
                    <tr>
                        <td style="padding: 20px;">
                            <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Order Information</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #555; font-weight: bold; width: 40%;">Transaction ID:</td>
                                    <td style="padding: 8px 0; color: #2c3e50; font-size: 16px; font-weight: bold;">${transactionId}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Payment Method:</td>
                                    <td style="padding: 8px 0; color: #2c3e50;">${payment}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Email:</td>
                                    <td style="padding: 8px 0; color: #2c3e50;">${email}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Phone:</td>
                                    <td style="padding: 8px 0; color: #2c3e50;">${phone}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Shipping Address -->
        <tr>
            <td style="padding: 20px;">
                <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px;">
                    <tr>
                        <td style="padding: 20px;">
                            <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Shipping Address</h3>
                            <div style="color: #555; line-height: 1.6;">
                                <strong style="color: #2c3e50;">${firstName} ${lastName}</strong><br>
                                ${street}<br>
                                ${town}, ${region}, ${postcode}<br>
                                India
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Payment Screenshot -->
        <tr>
            <td style="padding: 20px;">
                <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px;">
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #27ae60; padding-bottom: 10px;">Payment Confirmation</h3>
                            <div style="border: 2px dashed #bdc3c7; padding: 20px; border-radius: 8px; background-color: #ffffff;">
                                <img src="${req.files.paymentScreenshot[0].location}" 
                                     alt="Payment Screenshot" 
                                     style="max-width: 100%; height: auto; border-radius: 4px;">
                                <p style="margin: 15px 0 0 0; color: #7f8c8d; font-size: 14px; font-style: italic;">
                                    Replace this placeholder with your actual payment screenshot
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Next Steps -->
        <tr>
            <td style="padding: 20px;">
                <div style="background-color: #e8f5e8; border-left: 4px solid #27ae60; padding: 15px; border-radius: 0 8px 8px 0;">
                    <h3 style="color: #27ae60; margin: 0 0 10px 0; font-size: 18px;">What's Next?</h3>
                    <ul style="color: #555; margin: 0; padding-left: 20px; line-height: 1.6;">
                        <li>Your order is being processed</li>
                        <li>You will receive a shipping confirmation email within 24-48 hours</li>
                        <li>Track your order using transaction ID: <strong>#78990</strong></li>
                    </ul>
                </div>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td style="background-color: #34495e; padding: 20px; text-align: center;">
                <p style="color: #bdc3c7; margin: 0 0 10px 0; font-size: 14px;">
                    Thank you for your business!
                </p>
                <p style="color: #95a5a6; margin: 0; font-size: 12px;">
                    If you have any questions, please contact our support team.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>`

    const companyMail = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Order Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table style="width: 100%; max-width: 650px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
        <!-- Header -->
        <tr>
            <td style="background-color: #e74c3c; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">🎉 New Order Received!</h1>
                <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">Order #78990</p>
            </td>
        </tr>
        
        <!-- Alert Banner -->
        <tr>
            <td style="background-color: #f39c12; padding: 15px; text-align: center;">
                <p style="color: #ffffff; margin: 0; font-size: 16px; font-weight: bold;">
                    ⚡ Action Required: Process this order immediately
                </p>
            </td>
        </tr>
        
        <!-- Order Summary -->
        <tr>
            <td style="padding: 25px 20px;">
                <table style="width: 100%; border-collapse: collapse; background-color: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px;">
                    <tr>
                        <td style="padding: 20px;">
                            <h2 style="color: #e74c3c; margin: 0 0 15px 0; font-size: 20px;">Order Summary</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #555; font-weight: bold; width: 30%;">Order ID:</td>
                                    <td style="padding: 8px 0; color: #2c3e50; font-size: 16px; font-weight: bold;">${transactionId}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Payment Method:</td>
                                    <td style="padding: 8px 0; color: #2c3e50;">
                                        <span style="background-color: #3498db; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${payment}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Transaction ID:</td>
                                    <td style="padding: 8px 0; color: #2c3e50; font-family: monospace; background-color: #f8f9fa; padding: 4px 8px; border-radius: 4px;">${transactionId}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Order Date:</td>
                                    <td style="padding: 8px 0; color: #2c3e50;">${new Date().toLocaleDateString()}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Customer Information -->
        <tr>
            <td style="padding: 0 20px 20px 20px;">
                <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px;">
                    <tr>
                        <td style="padding: 20px;">
                            <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">👤 Customer Details</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #555; font-weight: bold; width: 25%;">Name:</td>
                                    <td style="padding: 8px 0; color: #2c3e50; font-weight: bold;">${firstName} ${lastName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Email:</td>
                                    <td style="padding: 8px 0; color: #2c3e50;">
                                        <a href="mailto:${email}" style="color: #3498db; text-decoration: none;">${email}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Phone:</td>
                                    <td style="padding: 8px 0; color: #2c3e50;">
                                        <a href="tel:${phone}" style="color: #3498db; text-decoration: none;">${phone}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Country:</td>
                                    <td style="padding: 8px 0; color: #2c3e50;">${country}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Shipping Address -->
        <tr>
            <td style="padding: 0 20px 20px 20px;">
                <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px;">
                    <tr>
                        <td style="padding: 20px;">
                            <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">📍 Shipping Address</h3>
                            <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border-left: 4px solid #e74c3c;">
                                <strong style="color: #2c3e50; display: block; margin-bottom: 5px;">${firstName} ${lastName}</strong>
                                <div style="color: #555; line-height: 1.6;">
                                    ${street}<br>
                                    ${town}, ${region} ${postcode}<br>
                                    India
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Payment Proof -->
        <tr>
            <td style="padding: 0 20px 20px 20px;">
                <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px;">
                    <tr>
                        <td style="padding: 20px;">
                            <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #27ae60; padding-bottom: 10px;">💳 Payment Screenshot</h3>
                            <div style="text-align: center; border: 2px dashed #bdc3c7; padding: 20px; border-radius: 8px; background-color: #ffffff;">
                                <img src="${req.files.paymentScreenshot[0].location}" 
                                     alt="Payment Screenshot" 
                                     style="max-width: 100%; height: auto; border-radius: 4px;">
                                <p style="margin: 15px 0 0 0; color: #27ae60; font-size: 14px; font-weight: bold;">
                                    ✅ Payment Verification Required
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Action Items -->
        <tr>
            <td style="padding: 0 20px 20px 20px;">
                <table style="width: 100%; border-collapse: collapse; background-color: #fff3cd; border: 2px solid #ffc107; border-radius: 8px;">
                    <tr>
                        <td style="padding: 20px;">
                            <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 18px;">⚠️ Action Required</h3>
                            <div style="color: #856404; line-height: 1.6;">
                                <strong>Next Steps:</strong>
                                <ol style="margin: 10px 0 0 0; padding-left: 20px;">
                                    <li>Verify payment screenshot</li>
                                    <li>Confirm payment in PayPal dashboard</li>
                                    <li>Update order status to "Processing"</li>
                                    <li>Prepare items for shipment</li>
                                    <li>Send tracking information to customer</li>
                                </ol>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Quick Actions -->
        <tr>
            <td style="padding: 0 20px 25px 20px; text-align: center;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px; text-align: center;">
                            <a href="mailto:bablusaini90310@gmail.com" style="display: inline-block; background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 0 10px;">Email Customer</a>
                        </td>
                        <td style="padding: 10px; text-align: center;">
                            <a href="tel:08949352677" style="display: inline-block; background-color: #27ae60; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 0 10px;">Call Customer</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td style="background-color: #2c3e50; padding: 20px; text-align: center;">
                <p style="color: #bdc3c7; margin: 0 0 10px 0; font-size: 14px;">
                    Order Management System
                </p>
                <p style="color: #95a5a6; margin: 0; font-size: 12px;">
                    Process this order within 24 hours for best customer experience
                </p>
            </td>
        </tr>
    </table>
</body>
</html>`

    // 1. Create transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kamleshatel123@gmail.com',     // replace with your email
        pass: 'ahukberzqtdyhwcw'         // not your email password!
      }
    });

    // 2. Define email options
    let mailOptions = {
      from: 'kamleshatel123@gmail.com',
      to: email,
      subject: 'Test Mail',
      html: customerEmail
    };
     // 2. Define email options
    let mailOptions2 = {
      from: 'kamleshatel123@gmail.com',
      to: 'pawanshrii@gmail.com',
      subject: 'Test Mail',
      html: companyMail
    };

    // 3. Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('❌ Error:', error);
      }
      console.log('✅ Email sent: ' + info.response);
    });

     // 3. Send email
    transporter.sendMail(mailOptions2, (error, info) => {
      if (error) {
        return console.log('❌ Error:', error);
      }
      console.log('✅ Email sent: ' + info.response);
    });

    res.redirect("/success")


  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

