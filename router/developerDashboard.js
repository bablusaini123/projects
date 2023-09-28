const developerDashboardRouter = require('express').Router()
const developerDashboardController = require("../controllers/developer-dashboard")
const authController = require("../controllers/auth-controller");



developerDashboardRouter
    .route('/developerDashboard')
    .get(authController.developerCheck,developerDashboardController.developerDashboard)

developerDashboardRouter
    .route('/loginDeveloperProjects')
    .get(authController.developerCheck,developerDashboardController.loginDeveloperProjects)

developerDashboardRouter
    .route('/developerReadMore/:id')
    .get(authController.developerCheck,developerDashboardController.readMoreDeveloperProject)
developerDashboardRouter
    .route('/developerProfile')
    .get(authController.developerCheck,developerDashboardController.developerProfile)



module.exports=developerDashboardRouter