const getAllSolutionsCategoryRouter = require('express').Router()
const getAllSolutionsCategoryController = require("../controller/getAllSolutionsCategory")


getAllSolutionsCategoryRouter
    .route('/getAllSolutionsCategory')
    .get(getAllSolutionsCategoryController.getAllSolutionsCategory)



module.exports=getAllSolutionsCategoryRouter