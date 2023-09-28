const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getAllTechnologies = async (req, res) => {
 
  try {
    const findTechnologiesTitleSql = `SELECT * FROM technologies`
    const findTechnologiesTitle = await connection(findTechnologiesTitleSql)
    const findTechnologiesSql = `SELECT * FROM technologies_list`
    const findTechnologies = await connection(findTechnologiesSql)
    res.status(200).json({ 
        technologiesTitle:findTechnologiesTitle,
        technologies:findTechnologies

        
     })
  } catch (error) {
    res.status(200).json({error:error})
  }
}
