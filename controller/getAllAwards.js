const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getAllAwards = async (req, res) => {
 
  try {
    const findAwardsTitleSql = `SELECT * FROM awards_title`
    const findAwardsTitle = await connection(findAwardsTitleSql)
    const findAwardsSql = `SELECT * FROM awards`
    const findAwards = await connection(findAwardsSql)
    res.status(200).json({ 
      awardsTitle:findAwardsTitle,
      awards:findAwards
        
     })
  } catch (error) {
    res.status(200).json({error:error})
  }
}
