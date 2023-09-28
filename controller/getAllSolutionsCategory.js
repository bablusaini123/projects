const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getAllSolutionsCategory = async (req, res) => {
  try {

    const sql = `SELECT * FROM solutionscategory`
    const result = await connection(sql)
    res.json({message:result})
  } catch (error) {
    console.log(error)
  }
}
