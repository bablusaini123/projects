const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getAllSolutions = async (req, res) => {
  try {

    const sql = `SELECT * FROM solutions`
    const result = await connection(sql)
    // for (let i = 0; i < result.length; i++) {
    //   const element = result[i];
    //   const findCategorySql = `SELECT * FROM solutionscategory where id = '${element.category}'`
    //   const findCategory = await connection(findCategorySql)
    //   result[i].category = findCategory[0]
    // }
   // console.log(result)
   res.json({message:result})
  
   
  } catch (error) {
    console.log(error)
  }
}
