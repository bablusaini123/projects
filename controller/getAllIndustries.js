const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getAllIndustries = async (req, res) => {
 
  try {
    const findIndustriesTitleSql = `SELECT * FROM industries_title`
    const findIndustriesTitle = await connection(findIndustriesTitleSql)
    const findIndustriesSql = `SELECT * FROM industries`
    const findIndustries = await connection(findIndustriesSql)
    res.status(200).json({ 
      industriesTitle:findIndustriesTitle,
      industries:findIndustries
        
     })
  } catch (error) {
    res.status(200).json({error:error})
  }
}
