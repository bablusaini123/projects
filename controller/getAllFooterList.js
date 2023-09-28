const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getAllFooterList = async (req, res) => {
 
  try {
    const findFooterLinkTitleSql = `SELECT * FROM footer_title`
    const findFooterLinkTitle = await connection(findFooterLinkTitleSql)
    const findFooterLinkSql = `SELECT * FROM footer_links`
    const findFooterLink = await connection(findFooterLinkSql)
    res.status(200).json({ 
      footerLinkTitle:findFooterLinkTitle,
      footerLinkList:findFooterLink
        
     })
  } catch (error) {
    res.status(200).json({error:error})
  }
}
