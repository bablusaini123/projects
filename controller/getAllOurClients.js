const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getAllOurClients = async (req, res) => {
   try {
    const findTitleSql = `SELECT * FROM our_client_title`
    const result = await connection(findTitleSql)
    const findOurClientsSql = `SELECT * FROM our_clients`
    const findOurClients = await connection(findOurClientsSql)
    res.status(200).json({ 
        TitleAndDesc: result,
        ourClients:findOurClients

        
     })
   } catch (error) {
    res.status(200).json({error:error})
   }
}
