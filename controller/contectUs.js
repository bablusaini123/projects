const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.contectUs = async (req, res) => {

  try {
    const name = req.body.name
    const jobTitle = req.body.jobTitle
    const email = req.body.email
    const companyName = req.body.companyName
    const phone = req.body.phone
    const message = req.body.message
    const sql = `INSERT INTO contectus ( id ,name, jobTitle  , email , companyName  ,phone , message) VALUES ('${''}','${name}','${jobTitle}','${email}','${companyName}','${phone}' , '${message}')`
    const result = await connection(sql)
    res.status(200).json({
      message: "Query Submited"
    })
  } catch (error) {
    res.status(200).json({ error: error })
  }
}
