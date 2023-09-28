const customerDashboardRouter = require('express').Router()
const customerDashboardController = require("../controllers/customer-dashboard")
const authController = require("../controllers/auth-controller");


customerDashboardRouter
    .route('/customerDashboard')
    .get(authController.customerCheck,customerDashboardController.customerDashboard)
customerDashboardRouter
    .route('/loginCustomerProject')
    .get(authController.customerCheck,customerDashboardController.loginCustomerProject)
customerDashboardRouter
    .route('/readMoreCustomerProject/:id')
    .get(authController.customerCheck,customerDashboardController.readMoreCustomerProject)
customerDashboardRouter
    .route('/customerProfile')
    .get(authController.customerCheck,customerDashboardController.customerProfile)



module.exports=customerDashboardRouter