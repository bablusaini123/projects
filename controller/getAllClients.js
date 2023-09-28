const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getAllOurClients = async (req, res) => {
   try {
  
    const findOurClientsSql = `SELECT * FROM technologies_list`
    const findOurClients = await connection(findOurClientsSql)
    res.status(200).json({ 
       
        Clients:findOurClients

        
     })
   } catch (error) {
    res.status(200).json({error:error})
   }
}
