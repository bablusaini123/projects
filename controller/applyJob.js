const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.applyJob = async (req, res) => {

  try {
    // const name = req.body.name
    // const jobTitle = req.body.jobTitle
    // const email = req.body.email
    // const qualification = req.body.qualification
    // const phone = req.body.phone
   
    // const resume = req.files.resume[0].filename
    // const sql = `INSERT INTO applyJob ( id ,name, jobTitle  , email , qualification  ,phone , resume) VALUES ('${''}','${name}','${jobTitle}','${email}','${qualification}','${phone}' , '${resume}')`
    // const result = await connection(sql)
    res.status(200).json({
      body: req.body,
      file: `this is file ${req.file}`
    })
  } catch (error) {
    res.status(200).json({ error: error })
  }
}
