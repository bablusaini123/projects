const applyJobRouter = require('express').Router()
const applyJobController = require("../controller/applyJob")
const insertUserController= require("../controller/admin")

applyJobRouter
    .route('/applyJob')
    .post(insertUserController.upload.fields([{ name: "resume" }]),applyJobController.applyJob)



module.exports=applyJobRouter