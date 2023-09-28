const getAllOurClientsRouter = require('express').Router()
const getAllOurClientsController = require("../controller/getAllOurClients")


getAllOurClientsRouter
    .route('/getAllOurClients')
    .get(getAllOurClientsController.getAllOurClients)



module.exports=getAllOurClientsRouter