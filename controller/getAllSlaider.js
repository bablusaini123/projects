const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getAllSlaider = async (req, res) => {
 
  try {
    const findSlaiderSql = `SELECT * FROM slider`
    const findSlaider = await connection(findSlaiderSql)
    res.status(200).json({ 
       
        slaider:findSlaider

        
     })
  } catch (error) {
    res.status(200).json({error:error})
  }
}
