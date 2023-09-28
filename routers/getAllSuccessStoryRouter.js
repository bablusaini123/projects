const getAllSuccessStoryRouter = require('express').Router()
const getAllSuccessStoryController = require("../controller/getAllSuccessStory")


getAllSuccessStoryRouter
    .route('/getAllSuccessStory')
    .get(getAllSuccessStoryController.getAllSuccessStory)



module.exports=getAllSuccessStoryRouter