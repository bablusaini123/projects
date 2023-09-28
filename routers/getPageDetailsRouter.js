const getPageDetailsRouter = require('express').Router()
const getPageDetailsController = require("../controller/getPageDetails")


getPageDetailsRouter
    .route('/getPageDetails')
    .get(getPageDetailsController.getPageDetails)



module.exports=getPageDetailsRouter