const orderRouter = require('express').Router()
const orderController = require("../controller/order-controller")


orderRouter
    .route('/order')
    .post(orderController.order)



module.exports=orderRouter