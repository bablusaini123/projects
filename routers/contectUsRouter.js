const contectUsRouter = require('express').Router()
const contectUsController = require("../controller/contectUs")


contectUsRouter
    .route('/contectUs')
    .post(contectUsController.contectUs)



module.exports=contectUsRouter