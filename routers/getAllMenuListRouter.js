const getAllMenuListRouter = require('express').Router()
const getAllMenuListController = require("../controller/getAllMenuList")


getAllMenuListRouter
    .route('/getAllMenuList')
    .get(getAllMenuListController.getAllMenuList)



module.exports=getAllMenuListRouter