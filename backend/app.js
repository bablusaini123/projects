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
const Razorpay = require("razorpay");
let a ="bablu"

app.use(cors())

// Initialize Razorpay


module.exports.razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEYID,
  key_secret: process.env.RAZORPAY_SECRET,
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
  console.log("Earnscope database have connected to your project");
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
