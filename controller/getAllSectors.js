const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getAllSectors = async (req, res) => {
 
  try {
  
    const findTechnologiesSql = `SELECT * FROM current_opning`
    const findTechnologies = await connection(findTechnologiesSql)
    res.status(200).json({ 
      
        sectors:findTechnologies

        
     })
  } catch (error) {
    res.status(200).json({error:error})
  }
}
