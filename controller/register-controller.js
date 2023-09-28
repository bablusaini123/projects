
const app = require("../app")
const connection = app.query
console.log(connection)



module.exports.registration = async (req, res) => {
  try {
    console.log("body", req.body)
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const password = req.body.password
    const address1 = req.body.address1
    const address2 = req.body.address2
    const number = req.body.number
    const pincode = req.body.pincode
    const skypeId = req.body.skypeId
    const country = req.body.country
    const state = req.body.state
    const city = req.body.city
    const findEmailSql = `SELECT * FROM users where email = '${email}'`
    const findEmail = await connection(findEmailSql)

    
      if (findEmail.length > 0) {
        res.status(200).json({ message: "email is already exist" })
      } else {
        const sql = `INSERT INTO users ( id  , firstname,lastname,email,password,address1,address2,number,pincode,skypeId ,country,
          state,city,status,type) VALUES ('${''}','${firstname}','${lastname}'
          ,'${email}' ,'${password}','${address1}','${address2}','${number}','${pincode}','${skypeId}','${country}','${state}'
          ,'${city}','${"1"}','${"user"}')`
        const result = await connection(sql)
        res.status(200).json({ message: "registration successfull" })
      
      }


  } catch (error) {
    console.log(error)
  }
}






