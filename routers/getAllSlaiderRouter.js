const getAllSlaiderRouter = require('express').Router()
const getAllSlaiderController = require("../controller/getAllSlaider")


getAllSlaiderRouter
    .route('/getAllSlaider')
    .get(getAllSlaiderController.getAllSlaider)



module.exports=getAllSlaiderRouter