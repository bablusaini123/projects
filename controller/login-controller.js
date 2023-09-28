
const app = require("../app")
const connection = app.query
console.log(connection)
const jwt = require("jsonwebtoken")




module.exports.login = async (req, res) => {
    try {
      const email = req.body.email
      const password = req.body.password
      const sql = `SELECT * FROM users where email='${email}'`
      const result = await connection(sql)
      console.log(result)
  
      if (result.length > 0) {
      
        if (password == result[0].password) {
          if( result[0].type == 'user'){
            let userId = result[0].id
            // const token = jwt.sign({ userId }, "zxcvbnm")
            res.status(200).json({ message: "successfully login",email:email })
          }else{
            res.status(200).json({ message: "this account is not user account" })
          }
         
        } else {
          res.status(200).json({ message: "your password is inccorect" });
        }
  
      } else {
        res.status(200).json({ message: "your account dose not found" });
      }
    } catch (error) {
      console.log(error)
    }
  }
