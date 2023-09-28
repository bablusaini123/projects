const getAllAwardsRouter = require('express').Router()
const getAllAwardsController = require("../controller/getAllAwards")


getAllAwardsRouter
    .route('/getAllAwards')
    .get(getAllAwardsController.getAllAwards)



module.exports=getAllAwardsRouter