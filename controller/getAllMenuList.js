const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getAllMenuList = async (req, res) => {
 
  try {
    const findMenuListSql = `SELECT * FROM menu_list`
    const findMenuList = await connection(findMenuListSql)
    res.status(200).json({ 
      menuList:findMenuList
        
     })
  } catch (error) {
    res.status(200).json({error:error})
  }
}
