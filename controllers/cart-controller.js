
const app = require("../app")
const connection = app.query
console.log(connection)
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


module.exports.addCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const token = req.headers.authorization;
    const verifyTokenId = jwt.verify(token, "zxcvbnm");
    const userId = verifyTokenId.userId
    const findcartSql = `SELECT * FROM cart where user="${userId}" AND product = "${productId}"`
    const findcart = await connection(findcartSql)
    if(findcart.length <1 ){
      const addCartSql = `INSERT INTO cart ( id  , user , quantity , product ) VALUES ('${''}','${userId}','${1}', '${productId}')`
      const addCart = await connection(addCartSql)
      res.status(200).json({message:"cart added"})
    }else{
      const newQuantity = findcart[0].quantity +1
      const editCartSql = `UPDATE cart set user = '${userId}' , quantity = '${newQuantity}', product = '${productId}'  where id = '${findcart[0].id}'`
    const editCart = await connection(editCartSql)
      res.status(200).json({message:"cart added"})
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.viewCart = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const verifyTokenId = jwt.verify(token, "zxcvbnm");
    const userId = verifyTokenId.userId
    const findcartSql = `SELECT * FROM cart where user="${userId}"`
    var findcart = await connection(findcartSql)
    for (let i = 0; i < findcart.length; i++) {
      const id = findcart[i].product;
      const findProductSql = `SELECT * FROM product where id="${id}"`
      const findProduct = await connection(findProductSql)
     findcart[i].product = findProduct
    }
  
    res.status(200).json({message:findcart})
  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};