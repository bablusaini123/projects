const getAllBlogRouter = require('express').Router()
const getAllBlogController = require("../controller/getAllBlog")


getAllBlogRouter
    .route('/getAllBlog')
    .get(getAllBlogController.getAllBlog)



module.exports=getAllBlogRouter