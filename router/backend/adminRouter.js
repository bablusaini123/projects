const adminRouter = require("express").Router();
const adminController = require("../../controllers/backend/admin-controller");

adminRouter
   .route("/admin")
   .get(adminController.adminHomePage)





module.exports = adminRouter;
