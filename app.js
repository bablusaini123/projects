const express = require("express")
const ejs = require("ejs")
const dotenv= require("dotenv")
dotenv.config()
const mysql = require("mysql")
const cookieParser = require("cookie-parser")
var bodyParser = require('body-parser')
const cors =require("cors")

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());




const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
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







const insertUser = require("./routers/admin")
const registerRouter = require("./routers/registerRouter")
const loginRouter = require("./routers/loginRouter")
const order = require("./routers/order")



app.use(insertUser)
app.use(registerRouter)
app.use(loginRouter)
app.use(order)



app.listen(5000, () => {
    console.log("server is running on 5000")
})