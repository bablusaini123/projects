const frountRouter = require("express").Router();
const frountController = require("../../controllers/frountend/frount-controller");
const app = require("../../app")


frountRouter
   .route('/sitemap.xml')
   .get(frountController.getSitemap);



frountRouter
   .route("/")
   .get(frountController.frountHomePage)
frountRouter
   .route("/miner")
   .get(frountController.products)
frountRouter
   .route("/addProducts")
   .get(frountController.addProducts)
   .post(app.upload.fields([{name:'descriptionImage'},{name:'productImages'}]),frountController.addProductsSubmit)
frountRouter
   .route("/miner/:slug")
   .get(frountController.productDetailPage)
frountRouter
   .route("/checkout/:slug")
   .get(frountController.checkout)
   .post(app.upload.fields([{name:'paymentScreenshot'}]),frountController.checkoutSubmit)




module.exports = frountRouter;
