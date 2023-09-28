const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const mysql = require("mysql")







app.use(cors());

const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const dotenv = require("dotenv");
dotenv.config();


app.use(express.json());

const connection = mysql.createConnection({
   host: "localhost",
  user: "root",
  password: '',
  database: "adminX"
})

connection.connect(() => {
  console.log("SQL database is successfully connected")
})

module.exports = {
  query: (sql) => {  
      return new Promise((resolve, reject) => {
          connection.query(sql, (err, result) => {
              if (err) {
                 console.log(err)
              } else {
                  resolve(result)
              }
          })
      })


  }
}


const adminRouter = require("./router/adminRouter");
const authorsRouter = require("./router/cartRouter");
const developerDashboard = require("./router/developerDashboard");
const customerDashboard = require("./router/customerDashboard");
const projectManagerDashboard = require("./router/projectManagerDashboard");



app.use(adminRouter);
app.use(authorsRouter);
app.use(developerDashboard)
app.use(customerDashboard)
app.use(projectManagerDashboard)



app.listen(5000, (req, res) => {
  console.log(`Server in running on port ${process.env.PORT}`);
});
