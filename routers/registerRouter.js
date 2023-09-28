const registerRouter = require('express').Router()
const registerController = require("../controller/register-controller")


registerRouter
    .route('/registration')
    .post(registerController.registration)




module.exports=registerRouter