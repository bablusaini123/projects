const frountRouter = require("express").Router();
const frountController = require("../../controllers/frountend/frount-controller");
const app = require("../../app")

frountRouter
   .route("/")
   .get(frountController.frountHomePage)
frountRouter
   .route("/eventListing")
   .get(frountController.eventListing)
frountRouter
   .route("/createEventListing")
   .get(frountController.createEventListing)
   .post(app.upload.fields([{name:'banner'}]),frountController.createEventListingSubmit)
frountRouter
   .route("/events/:id")
   .get(frountController.detailEventListing)
frountRouter
   .route("/icoListing")
   .get(frountController.IcoListing)
frountRouter
   .route("/createIcoListing")
   .get(frountController.createIcoListing)
   .post(app.upload.fields([{name:'logo'},{name:'roadmap'},{name:'whitepaper'},{name:'projectSreenshot'}]),frountController.createIcoListingSubmit)

frountRouter
   .route("/icoUnderProcess/:id")
   .get(frountController.icoListingUnderProcess)
frountRouter
   .route("/airdropListing")
   .get(frountController.airdropListing)
frountRouter
   .route("/createAirdrop")
   .get(frountController.createAirdrop)
   .post(app.upload.fields([{name:'tokenImage'},{name:'bannerImage'}]),frountController.createAirdropSubmit)
frountRouter
   .route("/influencers")
   .get(frountController.influencers)
frountRouter
   .route("/createInfluencer")
   .get(frountController.createInfluencer)
   .post(app.upload.fields([{name:'profileImage'}]),frountController.createInfluencerSubmit)

frountRouter
   .route("/news")
   .get(frountController.allNews)
frountRouter
   .route("/addNews")
   .get(frountController.addNews)
   .post(app.upload.fields([{name:'newsBanner'},{name:'file'}]),frountController.addNewsSubmit)






module.exports = frountRouter;
