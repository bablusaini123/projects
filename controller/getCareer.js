const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getCareer = async (req, res) => {
 
  try {
   
    const findCareerSql = `SELECT * FROM carrers`
    const findCareer = await connection(findCareerSql)
    res.status(200).json({  
      Career:findCareer
        
     })
  } catch (error) {
    res.status(200).json({error:error})
  }
}
