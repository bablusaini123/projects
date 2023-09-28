const getAllTechnologiesRouter = require('express').Router()
const getAllTechnologiesController = require("../controller/getAllSectors")


getAllTechnologiesRouter
    .route('/getAllSectors')
    .get(getAllTechnologiesController.getAllSectors)



module.exports=getAllTechnologiesRouter