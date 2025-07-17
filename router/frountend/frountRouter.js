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
   .route("/events")
   .get(frountController.eventListing)
frountRouter
   .route("/createEventListing")
   .get(frountController.createEventListing)
   .post(app.upload.fields([{name:'banner'}]),frountController.createEventListingSubmit)
frountRouter
   .route("/events/:id")
   .get(frountController.detailEventListing)
frountRouter
   .route("/ICO")
   .get(frountController.IcoListing)
frountRouter
   .route("/createIcoListing")
   .get(frountController.createIcoListing)
   .post(app.upload.fields([{name:'logo'},{name:'roadmap'},{name:'whitepaper'},{name:'projectSreenshot'}]),frountController.createIcoListingSubmit)
frountRouter
   .route("/ICO/:slug")
   .get(frountController.DetailIco)
frountRouter
   .route("/icoUnderProcess/:id")
   .get(frountController.icoListingUnderProcess)
frountRouter
   .route("/Airdrops")
   .get(frountController.airdropListing)
frountRouter
   .route("/Airdrops/:slug")
   .get(frountController.DetailAirdrop)
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
frountRouter
   .route("/news/:slug")
   .get(frountController.DetailNews)






frountRouter.all('*', (req, res) => {
  res.redirect('/'); // Redirect invalid routes to home page
});

module.exports = frountRouter;
