const app = require("../app")
const connection = app.query
console.log(connection)
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const httpMsgs = require("http-msgs");
const multer = require("multer");
const otpGenerator = require("otp-generator");





// MULTER SETUP

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    //  console.log("file", file)
    let a = file.originalname;
    //  let extname = path.extname(a);
    // if (extname === ".jpg" || extname === ".png") {
    callback(null, "./public/img");
    // } else if (extname === ".pdf") {
    //  callback(null, "./public/upload-pdf");
    // }
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + Date.now() + file.originalname);
  },
});

module.exports.upload = multer({
  storage: Storage,
});





//  LOGIN FORM

module.exports.Login = async (req, res) => {
  res.render("login.ejs", { message: "" })
}


//  LOGIN SUBMIT

module.exports.LoginSubmit = async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password
    const sql = `SELECT * FROM tb_admin where user_name='${username}'`
    const result = await connection(sql)
    console.log(result)

    if (result.length > 0) {
      let bcryptMatchPassword = await bcrypt.compare(
        password,
        result[0].password
      );
      if (bcryptMatchPassword === true) {
          let userId = result[0].id
           
         //  const token = jwt.sign({ userId }, "zxcvbnm")
         // httpMsgs.send500(req, res, token);
          res.cookie("token", "token")
          res.status(200).json({ message: "successfully login" })

      } else {
        httpMsgs.send500(req, res, "your password is inccorect");
      }

    } else {
      httpMsgs.send500(req, res, "your account dose not exist");
    }
  } catch (error) {
    console.log(error)
  }

}





module.exports.dashboard = async (req, res) => {
  try {

    res.render("dashboard.ejs")
  } catch (error) {
    console.log(error)
  }
}

module.exports.users = async (req, res) => {
  try {
    const sql = `SELECT * FROM users`
    const result = await connection(sql)
    res.render("users.ejs",{result})
  } catch (error) {
    console.log(error)
  }
}




module.exports.deleteUser = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM users where id="${id}"`
    const result = await connection(query)
    res.redirect("/users")

  } catch (error) {
    console.log(error)
  }
}


module.exports.tours = async (req, res) => {
  try {
    const sql = `SELECT * FROM tours`
    const result = await connection(sql)
    res.render("tours.ejs",{result})
  } catch (error) {
    console.log(error)
  }
}

module.exports.addTour = async (req, res) => {
  try {
    res.render("add-tour.ejs")
  } catch (error) {
    console.log(error)
  }
}

module.exports.addTourSubmit = async (req, res) => {
  try {
    const tourName = req.body.tourName
    const smallCarPrice = req.body.smallCarPrice
    const innovaPrice = req.body.innovaPrice
    const vanPrice = req.body.vanPrice
  
  
    const sql = `INSERT INTO tours ( id ,name,smallcarprice , innovacarprice , vanprice  , status) VALUES ('${''}','${tourName}','${smallCarPrice}','${innovaPrice}','${vanPrice}','${'1'}')`
    const result = await connection(sql)
    res.redirect("/tours")
  } catch (error) {
    console.log(error)
  }
}



module.exports.editTour = async (req, res) => {
  try {
    const id = req.params.id
    const sql = `SELECT * FROM tours where id = '${id}'`
    const result = await connection(sql)
    res.render("edit-tour.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT Tour


module.exports.editTourrSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const tourName = req.body.tourName
    const smallCarPrice = req.body.smallCarPrice
    const innovaPrice = req.body.innovaPrice
    const vanPrice = req.body.vanPrice

   const editTourSql = `UPDATE tours set name = '${tourName}', smallcarprice = '${smallCarPrice}', innovacarprice = '${innovaPrice}' , vanprice = '${vanPrice}'  where id = '${id}'`
      const editTour = await connection(editTourSql)
      res.redirect("/tours")
   

  } catch (error) {
    console.log(error)
  }
}





module.exports.transfer = async (req, res) => {
  try {
    const sql = `SELECT * FROM transfer`
    const result = await connection(sql)
    res.render("transfer.ejs",{result})
  } catch (error) {
    console.log(error)
  }
}

module.exports.addTransfer = async (req, res) => {
  try {
    
    res.render("add-transfer.ejs")
  } catch (error) {
    console.log(error)
  }
}


module.exports.addTransferSubmit = async (req, res) => {
  try {
    const transferName = req.body.transferName
    const smallCarPrice = req.body.smallCarPrice
    const innovaPrice = req.body.innovaPrice
    const vanPrice = req.body.vanPrice
  
  
    const sql = `INSERT INTO transfer ( id ,name,smallcarprice , innovacarprice , vanprice  , status) VALUES ('${''}','${transferName}','${smallCarPrice}','${innovaPrice}','${vanPrice}','${'1'}')`
    const result = await connection(sql)
    res.redirect("/transfer")
  } catch (error) {
    console.log(error)
  }
}



module.exports.editTransfer = async (req, res) => {
  try {
    const id = req.params.id
    const sql = `SELECT * FROM transfer where id = '${id}'`
    const result = await connection(sql)
    res.render("edit-transfer.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT Transfer


module.exports.editTransferSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const transferName = req.body.transferName
    const smallCarPrice = req.body.smallCarPrice
    const innovaPrice = req.body.innovaPrice
    const vanPrice = req.body.vanPrice

   const editTrasferSql = `UPDATE transfer set name = '${transferName}', smallcarprice = '${smallCarPrice}', innovacarprice = '${innovaPrice}' , vanprice = '${vanPrice}'  where id = '${id}'`
      const editTrasfer = await connection(editTrasferSql)
      res.redirect("/transfer")
   

  } catch (error) {
    console.log(error)
  }
}



module.exports.cars = async (req, res) => {
  try {
    const sql = `SELECT * FROM cars`
    const result = await connection(sql)
  
    res.render("cars.ejs",{result})
  } catch (error) {
    console.log(error)
  }
}

module.exports.addCar = async (req, res) => {
  try {
    
    res.render("add-car.ejs")
  } catch (error) {
    console.log(error)
  }
}


module.exports.addCarSubmit = async (req, res) => {
  try {
    const carClass = req.body.carClass
    const seats = req.body.seats
    const start = req.body.start
    const status = req.body.status
    let generateId = otpGenerator.generate(20, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
 //   console.log(req.body)
    const sql = `INSERT INTO cars ( id,generateId ,carclass,seats , start   , status) VALUES ('${''}','${generateId}','${carClass}','${seats}','${start}','${status}')`
    const result = await connection(sql)
    res.redirect("/cars")
  } catch (error) {
    console.log(error)
  }
}


module.exports.deleteCar = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM cars where generateId="${id}"`
    const result = await connection(query)
    res.redirect("/cars")

  } catch (error) {
    console.log(error)
  }
}




module.exports.carPrice = async (req, res) => {
  try {
    const sql = `SELECT * FROM carPrice`
    var result = await connection(sql)
  //  console.log(result)
  for (let i = 0; i < result.length; i++) {
    var element = result[i].carclass
    console.log(element)
    const findCarSql = `SELECT * FROM cars where generateId = '${element}'`
    const findCar = await connection(findCarSql)
    console.log(findCar)
    if(findCar.length > 0){
      result[i].carclass = findCar[0].carclass
      result[i].seats = findCar[0].seats
    }else{
      result[i].carclass = "null"
      result[i].seats = "null"
    }
   
  }

  console.log(result)
  
    res.render("carPrice.ejs",{result})
  } catch (error) {
    console.log(error)
  }
}

module.exports.addCarPrice = async (req, res) => {
  try {
  const sql = `SELECT * FROM cars`
  const result = await connection(sql)
    res.render("add-carPrice.ejs",{result:result})
  } catch (error) {
    console.log(error)
  }
}


module.exports.addCarPriceSubmit = async (req, res) => {
  try {
    const carClass = req.body.carClass
    const hourPrice = req.body.hourPrice
    const kmPrice = req.body.kmPrice
    const fullDayPrice = req.body.fullDayPrice
    const status = req.body.status
    let generateId = otpGenerator.generate(20, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    console.log(req.body)
    const sql = `INSERT INTO carprice ( id,generateId ,carclass,hourprice , kmprice , fulldayprice,status) VALUES ('${''}','${generateId}','${carClass}','${hourPrice}','${kmPrice}','${fullDayPrice}','${status}')`
    const result = await connection(sql)
    res.redirect("/carPrice")
  } catch (error) {
    console.log(error)
  }
}



module.exports.deleteCarPrice = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM carprice where generateId="${id}"`
    const result = await connection(query)
    res.redirect("/carPrice")

  } catch (error) {
    console.log(error)
  }
}





module.exports.attractionCategory = async (req, res) => {
  try {
    const sql = `SELECT * FROM attraction_category`
    const result = await connection(sql)
 
  
    res.render("attraction-category.ejs",{result})
  } catch (error) {
    console.log(error)
  }
}

module.exports.addAttractionCategory = async (req, res) => {
  try {
    
    res.render("add-attraction-category.ejs")
  } catch (error) {
    console.log(error)
  }
}


module.exports.addAttractionCategorySubmit = async (req, res) => {
  try {
    const title = req.body.title
    const description = req.body.description
    const status = req.body.status
    let generateId = otpGenerator.generate(20, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
 //   console.log(req.body)
    const sql = `INSERT INTO attraction_category ( id,generateId , title, description , status) VALUES ('${''}','${generateId}','${title}','${description}','${status}')`
    const result = await connection(sql)
    res.redirect("/attractionCategory")
  } catch (error) {
    console.log(error)
  }
}


module.exports.deleteAttractionCategory = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM attraction_category where generateId="${id}"`
    const result = await connection(query)
    res.redirect("/attractionCategory")

  } catch (error) {
    console.log(error)
  }
}





module.exports.attractions = async (req, res) => {
  try {
    const sql = `SELECT * FROM attractions`
    var result = await connection(sql)
  //  console.log(result)
  for (let i = 0; i < result.length; i++) {
    var element = result[i].attraction_category
  //  console.log(element)
    const findAttractionCategorySql = `SELECT * FROM attraction_category where generateId = '${element}'`
    const findAttractionCategory = await connection(findAttractionCategorySql)
  //  console.log(findAttractionCategory)
    if(findAttractionCategory.length > 0){
      result[i].attraction_category = findAttractionCategory[0].title
    }else{
      result[i].attraction_category = "null"
    }
   
  }

 // console.log(result)
 
  
    res.render("attractions.ejs",{result})
  } catch (error) {
    console.log(error)
  }
}

module.exports.addAttractions = async (req, res) => {
  try {
    const sql = `SELECT * FROM attraction_category`
    const result = await connection(sql)
    res.render("add-attractions.ejs",{result})
  } catch (error) {
    console.log(error)
  }
}


module.exports.addAttractionsSubmit = async (req, res) => {
  try {
    const category = req.body.category
    const title = req.body.title
    const description = req.body.description
    const adultTicketPrice = req.body.adultTicketPrice
    const childrenTicketPrice = req.body.childrenTicketPrice
    const openTime = req.body.openTime
    const closeingTime = req.body.closeingTime
    const status = req.body.status
  
    let generateId = otpGenerator.generate(20, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
  //  console.log(req.body)
    const sql = `INSERT INTO attractions ( id,generateId,attraction_category	 , title, description,adultticketprice,childrenticketprice ,openingtime,closingtime, status) VALUES ('${''}','${generateId}','${category}','${title}','${description}','${adultTicketPrice}','${childrenTicketPrice}','${openTime}','${closeingTime}','${status}')`
    const result = await connection(sql)
    res.redirect("/attractions")
  } catch (error) {
    console.log(error)
  }
}


module.exports.detailAttractions = async (req, res) => {
  try {
    const sql = `SELECT * FROM attractions where generateId = '${req.params.id}'`
    var result = await connection(sql)
  //  console.log(result)
  for (let i = 0; i < result.length; i++) {
    var element = result[i].attraction_category
    console.log(element)
    const findAttractionCategorySql = `SELECT * FROM attraction_category where generateId = '${element}'`
    const findAttractionCategory = await connection(findAttractionCategorySql)
    console.log(findAttractionCategory)
    if(findAttractionCategory.length > 0){
      result[i].attraction_category = findAttractionCategory[0].title
    }else{
      result[i].attraction_category = "null"
    }
   
  }

  console.log(result)
 
  
    res.render("detailAttractions.ejs",{result:result[0]})
  } catch (error) {
    console.log(error)
  }
}



module.exports.deleteAttractions = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM attractions where generateId="${id}"`
    const result = await connection(query)
    res.redirect("/attractions")

  } catch (error) {
    console.log(error)
  }
}

module.exports.bookings = async (req, res) => {
  try {
    const sql = `SELECT * FROM orders`
    var result = await connection(sql)
    console.log(result)
  for (let i = 0; i < result.length; i++) {
    var customer_id = result[i].customer_id
    var transfer_id = result[i].transfer_id

  //  console.log(element)
    const findUsersSql = `SELECT * FROM users where id = '${customer_id}'`
    const findUsers = await connection(findUsersSql)
  
    if(findUsers.length > 0){
      result[i].customer_id = findUsers[0].email
    }else{
      result[i].customer_id = "null"
    }


    const findTransferSql = `SELECT * FROM transfer where id = '${transfer_id}'`
    const findTransfer = await connection(findTransferSql)
  
    if(findTransfer.length > 0){
      result[i].transfer_id = findTransfer[0].name
    }else{
      result[i].transfer_id = "null"
    }
   
  }

  console.log(result)
 
  
    res.render("bookings.ejs",{result})
  } catch (error) {
    console.log(error)
  }
}



module.exports.detailBookings = async (req, res) => {
  try {
    const sql = `SELECT * FROM orders where id = '${req.params.id}'`
    var result = await connection(sql)
    console.log(result)
  for (let i = 0; i < result.length; i++) {
    var customer_id = result[i].customer_id
    var transfer_id = result[i].transfer_id

  //  console.log(element)
    const findUsersSql = `SELECT * FROM users where id = '${customer_id}'`
    const findUsers = await connection(findUsersSql)
  
    if(findUsers.length > 0){
      result[i].customer_id = findUsers[0].email
    }else{
      result[i].customer_id = "null"
    }


    const findTransferSql = `SELECT * FROM transfer where id = '${transfer_id}'`
    const findTransfer = await connection(findTransferSql)
  
    if(findTransfer.length > 0){
      result[i].transfer_id = findTransfer[0].name
    }else{
      result[i].transfer_id = "null"
    }
   
  }

  console.log(result)
 
  
    res.render("detailBookings.ejs",{result:result[0]})
  } catch (error) {
    console.log(error)
  }
}
























// LOGOUT


module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/")
  } catch (error) {
    console.log(error)
  }
}


module.exports.detailCar = async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    const sql = `SELECT * FROM cars where generateId = '${id}'`
    const result = await connection(sql)
  //  console.log(result)
    res.status(200).json({message:result[0]})
  } catch (error) {
    console.log(error)
  }
}



module.exports.getAllTours = async (req, res) => {
  try {
    const sql = `SELECT * FROM tours`
    const result = await connection(sql)
   res.status(200).json({message:result})
  } catch (error) {
    console.log(error)
  }
}


module.exports.getAllTransfer = async (req, res) => {
  try {
    const sql = `SELECT * FROM transfer`
    const result = await connection(sql)
   res.status(200).json({message:result})
  } catch (error) {
    console.log(error)
  }
}


module.exports.viewProfile = async (req, res) => {
  try {
    const token = req.headers.authorization
    // const verifyTokenId = jwt.verify(token, "zxcvbnm")
   // console.log(verifyTokenId)
   // const id = verifyTokenId.userId
  // const email = req.body.email
    const sql = `SELECT * FROM users where email = '${token}'`
    const result = await connection(sql)
   res.status(200).json({message:result})
  } catch (error) {
    console.log(error)
  }
}





module.exports.getAllBookings = async (req, res) => {
  try {
    const email = req.headers.authorization
    console.log(email)
    const findUserSql = `SELECT * FROM users where email = '${email}'`
    const findUser = await connection(findUserSql)
    console.log(findUser)
    
    const sql = `SELECT * FROM orders where customer_id = '${findUser[0].id}'`
    const result = await connection(sql)
    for (let i = 0; i < result.length; i++) {
     
      var transfer_id = result[i].transfer_id

  
      const findTransferSql = `SELECT * FROM transfer where id = '${transfer_id}'`
      const findTransfer = await connection(findTransferSql)
    
      if(findTransfer.length > 0){
        result[i].transfer_id = findTransfer[0].name
      }else{
        result[i].transfer_id = "null"
      }
     
    }
   res.status(200).json({message:result})
  } catch (error) {
    console.log(error)
  }
}









