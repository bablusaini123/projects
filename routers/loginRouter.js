const loginRouter = require('express').Router()
const loginController = require("../controller/login-controller")


loginRouter
    .route('/login')
    .post(loginController.login)



module.exports=loginRouter