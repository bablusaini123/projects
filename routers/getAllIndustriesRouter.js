const getAllIndustriesRouter = require('express').Router()
const getAllIndustriesController = require("../controller/getAllIndustries")


getAllIndustriesRouter
    .route('/getAllIndustries')
    .get(getAllIndustriesController.getAllIndustries)



module.exports=getAllIndustriesRouter