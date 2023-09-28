const express = require("express")
const ejs = require("ejs")
const dotenv= require("dotenv")
dotenv.config()
const mysql = require("mysql")
const cookieParser = require("cookie-parser")
var bodyParser = require('body-parser')

const app = express()
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
const getAllOurClientsRouter = require("./routers/getAllOurClientsRouter")
const getAllSuccessStoryRouter = require("./routers/getAllSuccessStoryRouter")
const getAllTechnologiesRouter = require("./routers/getAllTechnologiesRouter")
const getAllOfferingRouter = require("./routers/getAllOfferingRouter")
const getAllIndustriesRouter = require("./routers/getAllIndustriesRouter")
const getCareerRouter = require("./routers/getCareerRouter")
const getAllAwardsRouter = require("./routers/getAllAwardsRouter")
const getAllBlogRouter = require("./routers/getAllBlogRouter")
const getAllSlaiderRouter = require("./routers/getAllSlaiderRouter")
const getAllMenuListRouter = require("./routers/getAllMenuListRouter")
const getAllFooterListRouter = require("./routers/getAllFooterListRouter")
const getPageDetailsRouter = require("./routers/getPageDetailsRouter")
const contectUsRouter = require("./routers/contectUsRouter") 

app.use(insertUser)
app.use(getAllOurClientsRouter)
app.use(getAllSuccessStoryRouter)
app.use(getAllTechnologiesRouter)
app.use(getAllOfferingRouter)
app.use(getAllIndustriesRouter)
app.use(getCareerRouter)
app.use(getAllAwardsRouter)
app.use(getAllBlogRouter)
app.use(getAllSlaiderRouter)
app.use(getAllMenuListRouter)
app.use(getAllFooterListRouter)
app.use(getPageDetailsRouter)
app.use(contectUsRouter)


app.listen(5000, () => {
    console.log("server is running on 5000")
})