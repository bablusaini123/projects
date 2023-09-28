const getCareerRouter = require('express').Router()
const getCareerController = require("../controller/getCareer")


getCareerRouter
    .route('/getCareer')
    .get(getCareerController.getCareer)



module.exports=getCareerRouter