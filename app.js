const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');



app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Sitemap: https://kryptodesk.com/sitemap.xml`);
});

app.get('/airdropListing', (req, res) => {
  res.redirect(301, '/Airdrops');
});

app.get('/icoListing', (req, res) => {
  res.redirect(301, '/ico');
});

app.get('/eventListing', (req, res) => {
  res.redirect(301, '/events');
});



// Setup S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

  const bucketName = 'tradzio-image'

  // Multer setup
  module.exports.upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      contentType: multerS3.AUTO_CONTENT_TYPE,
        contentDisposition: 'inline',
      metadata: function (req, file, cb) {
        console.log(file)
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        // Save file in a specific folder
        const folderPath = 'uploads/';
        const filename = Date.now() + '-' + file.originalname;
        cb(null, folderPath + filename);
      }
    }),
  });


const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));

// connect mongodb

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, () => {
  console.log("CryptoDesk database have connected to your project");
});

app.use(express.json());


// calling routers


const adminRouter = require("./router/backend/adminRouter");
const frountRouter = require("./router/frountend/frountRouter");
app.use("/admin",adminRouter);
app.use(frountRouter);


server.listen(process.env.PORT, (req, res) => {
  console.log(`Server in running on port ${process.env.PORT}`);
});
