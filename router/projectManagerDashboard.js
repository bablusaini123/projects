const projectManagerDashboardRouter = require('express').Router()
const projectManagerDashboardController = require("../controllers/projectManager-dashboard")
const authController = require("../controllers/auth-controller");


projectManagerDashboardRouter
    .route('/projectManagerDashboard')
    .get(authController.projectManagerCheck,projectManagerDashboardController.projectManagerDashboard)
projectManagerDashboardRouter
    .route('/loginProjectManagerProject')
    .get(authController.projectManagerCheck,projectManagerDashboardController.loginProjectManagerProject)
projectManagerDashboardRouter
    .route('/readMoreProjectManagerProject/:id')
    .get(authController.projectManagerCheck,projectManagerDashboardController.readMoreProjectManagerProject)
projectManagerDashboardRouter
    .route('/projectManagerProfile')
    .get(authController.projectManagerCheck,projectManagerDashboardController.projectManagerProfile)



module.exports=projectManagerDashboardRouter