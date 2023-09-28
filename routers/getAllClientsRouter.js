const getAllOurClientsRouter = require('express').Router()
const getAllOurClientsController = require("../controller/getAllClients")


getAllOurClientsRouter
    .route('/getAllClients')
    .get(getAllOurClientsController.getAllOurClients)



module.exports=getAllOurClientsRouter