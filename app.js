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
const getAllOurClientsRouter = require("./routers/getAllClientsRouter")
const getAllSuccessStoryRouter = require("./routers/getAllServicesRouter")
const getAllTechnologiesRouter = require("./routers/getAllSectors")
const getAllSlaiderRouter = require("./routers/getAllSlaiderRouter")
const contectUsRouter = require("./routers/contectUsRouter")
const applyJobRouter = require("./routers/applyJobRouter")
const getAllSolutions = require("./routers/getAllSolutions")
const getAllSolutionsCategory = require("./routers/getAllSolutionsCategoryRouter")



app.use(insertUser)
app.use(getAllOurClientsRouter)
app.use(getAllSuccessStoryRouter)
app.use(getAllTechnologiesRouter)
app.use(getAllSlaiderRouter)
app.use(contectUsRouter)
app.use(applyJobRouter)
app.use(getAllSolutions)
app.use(getAllSolutionsCategory)


app.listen(5000, () => {
    console.log("server is running on 5000")
})