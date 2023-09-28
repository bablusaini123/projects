const getAllSolutionsRouter = require('express').Router()
const getAllSolutionsController = require("../controller/getAllSolutions")


getAllSolutionsRouter
    .route('/getAllSolutions')
    .get(getAllSolutionsController.getAllSolutions)



module.exports=getAllSolutionsRouter