const getAllOfferingRouter = require('express').Router()
const getAllOfferingController = require("../controller/getAllOffering")


getAllOfferingRouter
    .route('/getAllOffering')
    .get(getAllOfferingController.getAllOffering)



module.exports=getAllOfferingRouter