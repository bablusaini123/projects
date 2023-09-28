const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getAllSuccessStory = async (req, res) => {
 
  try {
    const findSuccessStorySql = `SELECT * FROM success_strories`
    const findSuccessStory = await connection(findSuccessStorySql)
    res.status(200).json({ 
        successStory:findSuccessStory
        
     })
  } catch (error) {
    res.status(200).json({error:error})
  }
}
