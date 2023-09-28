const getAllTechnologiesRouter = require('express').Router()
const getAllTechnologiesController = require("../controller/getAllTechnologies")


getAllTechnologiesRouter
    .route('/getAllTechnologies')
    .get(getAllTechnologiesController.getAllTechnologies)



module.exports=getAllTechnologiesRouter