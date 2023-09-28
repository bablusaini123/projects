const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getAllOffering = async (req, res) => {
 
  try {
    const findOfferingTitleSql = `SELECT * FROM offring_title`
    const findOfferingTitle = await connection(findOfferingTitleSql)
    const findOfferingSql = `SELECT * FROM offering`
    const findOffering = await connection(findOfferingSql)
    res.status(200).json({ 
        offeringTitle:findOfferingTitle,
        offering:findOffering

        
     })
  } catch (error) {
    res.status(200).json({error:error})
  }
}
