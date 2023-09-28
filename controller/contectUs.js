const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.contectUs = async (req, res) => {

    try {
        const name = req.body.name
        const email = req.body.email
        const company = req.body.company
        const phoneNo = req.body.phoneNo
        const interested = req.body.interested
        const message = req.body.message
        const headerMasterSql = `INSERT INTO contect (id ,name,email ,company , phoneNo ,interested ,message) VALUES ('${''}','${name}', '${email}' , '${company}','${phoneNo}','${interested}','${message}')`
        const findAwardsTitle = await connection(headerMasterSql)

        res.status(200).json({
            message: "query submited"

        })
    } catch (error) {
        res.status(200).json({ error: error })
    }
}
