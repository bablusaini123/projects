const getAllSuccessStoryRouter = require('express').Router()
const getAllSuccessStoryController = require("../controller/getAllServices")


getAllSuccessStoryRouter
    .route('/getAllServices')
    .get(getAllSuccessStoryController.getAllServices)



module.exports=getAllSuccessStoryRouter