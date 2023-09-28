const getAllFooterListRouter = require('express').Router()
const getAllFooterListController = require("../controller/getAllFooterList")


getAllFooterListRouter
    .route('/getAllFooterList')
    .get(getAllFooterListController.getAllFooterList)



module.exports=getAllFooterListRouter