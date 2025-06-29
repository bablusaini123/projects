const frountRouter = require("express").Router();
const frountController = require("../../controllers/frountend/frount-controller");
const app = require("../../app")

frountRouter
   .route("/userRegisteration")
   .post(frountController.registerUser)

frountRouter
   .route("/userLogin")
   .post(frountController.loginUser)

frountRouter
   .route("/createOrder")
   .post(frountController.createOrder)

frountRouter
   .route("/purchaseCourse")
   .post(frountController.purchaseCourse)

frountRouter
   .route("/dashBoardInfo")
   .get(frountController.dashBoardInfo)

frountRouter
   .route("/withdrawFunds")
   .post(frountController.withdrawFunds)

frountRouter
   .route("/invitationBonus")
   .post(frountController.invitationBonus)

   frountRouter
   .route("/bonusHistory")
   .post(frountController.bonusHistory)




module.exports = frountRouter;
