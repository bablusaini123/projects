
const app = require("../app")
const connection = app.query
console.log(connection)
const jwt = require("jsonwebtoken")    
const otpGenerator = require("otp-generator");     
const nodemailer = require("nodemailer");    




module.exports.order = async (req, res) => {
    try {
    const email = req.body.email
    const findUserSql = `SELECT * FROM users where email = '${email}'`
    const findUser = await connection(findUserSql)
    const customer_id = findUser[0].id

    const findTransferSql = `SELECT * FROM transfer where id = '${req.body.transfer_id}'`
    const findTransfer = await connection(findTransferSql)
    // let order_id = otpGenerator.generate(20, {
    //   upperCaseAlphabets: false,
    //   specialChars: false,
    // });
    const order_id = "123245656765";
    const transfer_id = req.body.transfer_id
    const transfer_car = req.body.transfer_car
    const city = req.body.city
    const country = req.body.country
    const total_price = req.body.total_price

    const guest_name1 = req.body.guest_name1
    const guest_number1 = req.body.guest_number1
    const adult_age1 = req.body.adult_age1
    const children_age1 = req.body.children_age1
    const drop1 = req.body.drop1
    const pickup1 = req.body.pickup1
    const flight_number1 = req.body.flight_number1
    const flight_time1 = req.body.flight_time1
    const flight_airport1 = req.body.flight_airport1


    
    const guest_name2 = req.body.guest_name2
    const guest_number2 = req.body.guest_number2
    const adult_age2 = req.body.adult_age2
    const children_age2 = req.body.children_age2
    const drop2 = req.body.drop2
    const pickup2 = req.body.pickup2
    const flight_number2 = req.body.flight_number2
    const flight_time2 = req.body.flight_time2
    const flight_airport2 = req.body.flight_airport2
  
   
    const sql = `INSERT INTO orders ( id ,order_id,customer_id , transfer_id , transfer_car ,
       guest_name1, guest_number1, adult_age1, children_age1, drop1, pickup1, flight_number1, flight_time1 ,flight_airport1,
       guest_name2, guest_number2, adult_age2, children_age2, drop2, pickup2, flight_number2, flight_time2 ,flight_airport2,
      city , country,total_price) VALUES 
      ('${''}','${order_id}','${customer_id}','${transfer_id}','${transfer_car}'
      ,'${guest_name1}','${guest_number1}','${adult_age1}','${children_age1}','${drop1}','${pickup1}','${flight_number1}','${flight_time1}','${flight_airport1}'
      ,'${guest_name2}','${guest_number2}','${adult_age2}','${children_age2}','${drop2}','${pickup2}','${flight_number2}','${flight_time2}','${flight_airport2}'
      ,'${city}','${country}','${total_price}')`
      const result = await connection(sql)
      const mailTransporter = nodemailer.createTransport({
        host: `smtp.gmail.com`,
        port: 465,
        secure: true,
        auth: {
          user: "bablusaini90310@gmail.com",
          pass: "nrnuawnjlaacmory"
          
        },
      });
      let mailDetails = {
        from: "bablusaini90310@gmail.com",
        to: "bablusaini90310@gmail.com",
        subject: "Booking mail",
        html: `

        <!doctype html>
        <html lang="en">
          <head>
          
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        
           
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        
            <title>Hello, world!</title>
            <style>
                  .background{
                   
                  }
           </style>
          </head>
         
          <body>
          <div style="width:450px">
          <label style="background:#03979c;display:block;text-align:center;color:white;padding:80px 0px">
              <h1 style="margin:0;">
              Booking Confirmed
              </h1>
              <p style="margin:0;font-size:14px;">User Details</p>
          </label>
          <label style="width:100%;display:block;background:#ebebeb;padding:14px;box-sizing:border-box;font-size:14px">
               <p style="margin-top:0"> User :<b style="margin-left:40px">${email}</b></p>
           
                <p> Transfer :<b style="margin-left:40px">${findTransfer[0].name}</b></p>
          </label>
      </div> 
         <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
         </body>
        </html>
        `,
      };

      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({
            message: "mail have sent successfully",
          });
        }
      });
      res.status(200).json({message:"order successfull"})
    } catch (error) {
      console.log(error)
    }
  }
