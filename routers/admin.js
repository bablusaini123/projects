const insertUserRouter =require("express").Router()
const insertUserController= require("../controller/admin")

function loginCheck(req, res, next) {
   
    const token = req.cookies.token
    console.log("yyyy",token)
    next()
    // if (token) {
    //     next()
    // } else {
    //     res.redirect("/")
    // }
}



insertUserRouter
.route("/")
.get(insertUserController.Login)
.post(insertUserController.LoginSubmit)

insertUserRouter
.route("/dashboard")
.get(loginCheck,insertUserController.dashboard)

insertUserRouter
.route("/logout")
.get(loginCheck,insertUserController.logout)

insertUserRouter
.route("/menuList")
.get(loginCheck,insertUserController.menuList)

insertUserRouter
.route("/addMenu")
.get(loginCheck,insertUserController.addMenu)
.post(loginCheck,insertUserController.addMenuSubmit)

insertUserRouter
.route("/editMenu/:id")
.get(loginCheck,insertUserController.editMenuList)
.post(loginCheck,insertUserController.editMenuListSubmit)

insertUserRouter
.route("/changeStatusMenu/:id")
.get(loginCheck,insertUserController.changeStatusMenu)

insertUserRouter
.route("/deleteMenu/:id")
.get(loginCheck,insertUserController.deleteMenu)


insertUserRouter
.route("/footerTitle")
.get(loginCheck,insertUserController.footerTitle)

insertUserRouter
.route("/editFooterTitle/:id")
.get(loginCheck,insertUserController.editFooterTitle)
.post(loginCheck,insertUserController.editFooterTitleSubmit)

insertUserRouter
.route("/addFooterLink")
.get(loginCheck,insertUserController.addFooterLink)
.post(loginCheck,insertUserController.addFooterLinkSubmit)

insertUserRouter
.route("/footerLinkList")
.get(loginCheck,insertUserController.footerLinkList)

insertUserRouter
.route("/editFooterLink/:id")
.get(loginCheck,insertUserController.editFooterLink)
.post(loginCheck,insertUserController.editFooterLinkSubmit)

insertUserRouter
.route("/deleteFooterLink/:id")
.get(loginCheck,insertUserController.deleteFooterLink)

insertUserRouter
.route("/ourClients")
.get(loginCheck,insertUserController.ourClients)

insertUserRouter
.route("/addClient")
.get(loginCheck,insertUserController.addClient)
.post(loginCheck,insertUserController.upload.fields([{ name: "frountLogo" },{ name: "backLogo" },{ name: "backgroundImage"}]),insertUserController.addClientSubmit)

insertUserRouter
.route("/editClient/:id")
.get(loginCheck,insertUserController.editClient)
.post(loginCheck,insertUserController.upload.fields([{ name: "frountLogo" },{ name: "backLogo" },{ name: "backgroundImage"}]),insertUserController.editClientSubmit)



insertUserRouter
.route("/slider")
.get(loginCheck,insertUserController.slider)

insertUserRouter
.route("/addSlider")
.get(loginCheck,insertUserController.addSlider)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.addSliderSubmit)

insertUserRouter
.route("/editSlider/:id")
.get(loginCheck,insertUserController.editSlider)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.editSliderSubmit)

insertUserRouter
.route("/deleteSlider/:id")
.get(loginCheck,insertUserController.deleteSlider)

insertUserRouter
.route("/technologies")
.get(loginCheck,insertUserController.technologies)

insertUserRouter
.route("/addTechnologies")
.get(loginCheck,insertUserController.addTechnologies)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.addTechnologiesSubmit)


insertUserRouter
.route("/editTechnologies/:id")
.get(loginCheck,insertUserController.editTechnologies)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.editTechnologiesSubmit)


insertUserRouter
.route("/deleteTechnologies/:id")
.get(loginCheck,insertUserController.deleteTechnologies)

insertUserRouter
.route("/awards")
.get(loginCheck,insertUserController.awards)

insertUserRouter
.route("/addAwards")
.get(loginCheck,insertUserController.addAwards)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.addAwardsSubmit)


insertUserRouter
.route("/editAwards/:id")
.get(loginCheck,insertUserController.editAwards)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.editAwardsSubmit)


insertUserRouter
.route("/deleteAwards/:id")
.get(loginCheck,insertUserController.deleteAwards)

insertUserRouter
.route("/offering")
.get(loginCheck,insertUserController.offering)

insertUserRouter
.route("/addOffering")
.get(loginCheck,insertUserController.addOffering)
.post(loginCheck,insertUserController.upload.fields([{ name: "frountLogo" },{ name: "backLogo" }]),insertUserController.addOfferingSubmit)


insertUserRouter
.route("/editOffering/:id")
.get(loginCheck,insertUserController.editOffering)
.post(loginCheck,insertUserController.upload.fields([{ name: "frountLogo" },{ name: "backLogo" }]),insertUserController.editOfferingSubmit)


insertUserRouter
.route("/deleteOffering/:id")
.get(loginCheck,insertUserController.deleteOffering)

insertUserRouter
.route("/industries")
.get(loginCheck,insertUserController.industries)

insertUserRouter
.route("/addIndustries")
.get(loginCheck,insertUserController.addIndustries)
.post(loginCheck,insertUserController.upload.fields([{ name: "frountLogo" }]),insertUserController.addIndustriesSubmit)


insertUserRouter
.route("/editIndustries/:id")
.get(loginCheck,insertUserController.editIndustries)
.post(loginCheck,insertUserController.upload.fields([{ name: "frountLogo" }]),insertUserController.editIndustriesSubmit)



insertUserRouter
.route("/deleteIndustries/:id")
.get(loginCheck,insertUserController.deleteIndustries)


insertUserRouter
.route("/successStories")
.get(loginCheck,insertUserController.successStories)

insertUserRouter
.route("/addSuccessStories")
.get(loginCheck,insertUserController.addSuccessStories)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.addSuccessStoriesSubmit)


insertUserRouter
.route("/editSuccessStories/:id")
.get(loginCheck,insertUserController.editSuccessStories)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.editSuccessStoriesSubmit)


insertUserRouter
.route("/deleteSuccessStories/:id")
.get(loginCheck,insertUserController.deleteSuccessStories)

insertUserRouter
.route("/carrers")
.get(loginCheck,insertUserController.carrers)

insertUserRouter
.route("/editCarrers/:id")
.get(loginCheck,insertUserController.editCarrers)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.editCarrersSubmit)


insertUserRouter
.route("/blogs")
.get(loginCheck,insertUserController.blogs)


insertUserRouter
.route("/addBlogs")
.get(loginCheck,insertUserController.addBlogs)
.post(loginCheck,insertUserController.addBlogsSubmit) 

  


insertUserRouter
.route("/editBlogs/:id")
.get(loginCheck,insertUserController.editBlogs)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.editBlogsSubmit)


insertUserRouter
.route("/deleteBlogs/:id")
.get(loginCheck,insertUserController.deleteBlogs)

+
insertUserRouter
.route("/currentOpning")
.get(loginCheck,insertUserController.currentOpning)


insertUserRouter
.route("/addCurrentOpning")
.get(loginCheck,insertUserController.addCurrentOpning)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.addCurrentOpningSubmit)


insertUserRouter
.route("/editCurrentOpning/:id")
.get(loginCheck,insertUserController.editCurrentOpning)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.editCurrentOpningSubmit)


insertUserRouter
.route("/detailCurrentOpning/:id")
.get(loginCheck,insertUserController.detailCurrentOpning)

insertUserRouter
.route("/deleteCurrentOpning/:id")
.get(loginCheck,insertUserController.deleteCurrentOpning)

insertUserRouter
.route("/careersPageTitle")
.get(loginCheck,insertUserController.careerPageTitle)

insertUserRouter
.route("/editCareerPageTitle/:id")
.get(loginCheck,insertUserController.editCareerPageTitle)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.editCareerPageTitleSubmit)


insertUserRouter
.route("/masterPage")
.get(loginCheck,insertUserController.masterPage)

insertUserRouter
.route("/addMasterPage")
.get(loginCheck,insertUserController.addMasterPage)
.post(loginCheck,insertUserController.addMasterPageSubmit)

insertUserRouter
.route("/changeStatusMasterPage/:id")
.get(loginCheck,insertUserController.changeStatusMasterPage)

insertUserRouter
.route("/technologiesMaster")
.get(loginCheck,insertUserController.technologiesMaster)


insertUserRouter
.route("/addTechnologiesMaster")
.get(loginCheck,insertUserController.addTechnologiesMaster)
.post(loginCheck,insertUserController.addTechnologiesMasterSubmit)

insertUserRouter
.route("/editTechnologiesMaster/:id")
.get(loginCheck,insertUserController.editTechnologiesMaster)
.post(loginCheck,insertUserController.editTechnologiesMasterSubmit)


insertUserRouter
.route("/slaiderMaster")
.get(loginCheck,insertUserController.slaiderMaster)


insertUserRouter
.route("/addSliderMaster")
.get(loginCheck,insertUserController.addSlaiderMaster)
.post(loginCheck,insertUserController.addSlaiderMasterSubmit)

insertUserRouter
.route("/editSlaiderMaster/:id")
.get(loginCheck,insertUserController.editSlaiderMaster)
.post(loginCheck,insertUserController.editSlaiderMasterSubmit)


insertUserRouter
.route("/clientsMaster")
.get(loginCheck,insertUserController.clientsMaster)


insertUserRouter
.route("/addClientsMaster")
.get(loginCheck,insertUserController.addClientsMaster)
.post(loginCheck,insertUserController.addClientsMasterSubmit)

insertUserRouter
.route("/editClientsMaster/:id")
.get(loginCheck,insertUserController.editClientsMaster)
.post(loginCheck,insertUserController.editClientsMasterSubmit)


insertUserRouter
.route("/successStoryMaster")
.get(loginCheck,insertUserController.successStoryMaster)


insertUserRouter
.route("/addSuccessStoryMaster")
.get(loginCheck,insertUserController.addSuccessStoryMaster)
.post(loginCheck,insertUserController.addSuccessStoryMasterSubmit)

insertUserRouter
.route("/editSuccessStoryMaster/:id")
.get(loginCheck,insertUserController.editSuccessStoryMaster)
.post(loginCheck,insertUserController.editSuccessStoryMasterSubmit)



insertUserRouter
.route("/offeringMaster")
.get(loginCheck,insertUserController.offeringMaster)


insertUserRouter
.route("/addOfferingMaster")
.get(loginCheck,insertUserController.addOfferingMaster)
.post(loginCheck,insertUserController.addOfferingMasterSubmit)

insertUserRouter
.route("/editOfferingMaster/:id")
.get(loginCheck,insertUserController.editOfferingMaster)
.post(loginCheck,insertUserController.editOfferingMasterSubmit)


insertUserRouter
.route("/industriesMaster")
.get(loginCheck,insertUserController.industriesMaster)


insertUserRouter
.route("/addIndustriesMaster")
.get(loginCheck,insertUserController.addIndustriesMaster)
.post(loginCheck,insertUserController.addIndustriesMasterSubmit)

insertUserRouter
.route("/editIndustriesMaster/:id")
.get(loginCheck,insertUserController.editIndustriesMaster)
.post(loginCheck,insertUserController.editIndustriesMasterSubmit)


insertUserRouter
.route("/awardsMaster")
.get(loginCheck,insertUserController.awardsMaster)


insertUserRouter
.route("/addAwardsMaster")
.get(loginCheck,insertUserController.addAwardsMaster)
.post(loginCheck,insertUserController.addAwardsMasterSubmit)

insertUserRouter
.route("/editAwardsMaster/:id")
.get(loginCheck,insertUserController.editAwardsMaster)
.post(loginCheck,insertUserController.editAwardsMasterSubmit)


insertUserRouter
.route("/blogMaster")
.get(loginCheck,insertUserController.blogMaster)


insertUserRouter
.route("/addBlogMaster")
.get(loginCheck,insertUserController.addBlogMaster)
.post(loginCheck,insertUserController.addBlogMasterSubmit)

insertUserRouter
.route("/editBlogMaster/:id")
.get(loginCheck,insertUserController.editBlogMaster)
.post(loginCheck,insertUserController.editBlogMasterSubmit)


insertUserRouter
.route("/logoMaster")
.get(loginCheck,insertUserController.logoMaster)


insertUserRouter
.route("/addLogoMaster")
.get(loginCheck,insertUserController.addLogoMaster)
.post(loginCheck,insertUserController.upload.fields([{ name: "logo" },{name:"inverseLogo"}]),insertUserController.addLogoMasterSubmit)

insertUserRouter
.route("/editLogoMaster/:id")
.get(loginCheck,insertUserController.editLogoMaster)
.post(loginCheck,insertUserController.upload.fields([{ name: "logo" },{name:"inverseLogo"}]),insertUserController.editLogoMasterSubmit)


insertUserRouter
.route("/menuMaster")
.get(loginCheck,insertUserController.menuMaster)


insertUserRouter
.route("/addMenuMaster")
.get(loginCheck,insertUserController.addMenuMaster)
.post(loginCheck,insertUserController.addMenuMasterSubmit)

insertUserRouter
.route("/editMenuMaster/:id")
.get(loginCheck,insertUserController.editMenuMaster)
.post(loginCheck,insertUserController.editMenuMasterSubmit)

insertUserRouter
.route("/headerMaster")
.get(loginCheck,insertUserController.headerMaster)


insertUserRouter
.route("/addHeaderMaster")
.get(loginCheck,insertUserController.addHeaderMaster)
.post(loginCheck,insertUserController.addHeaderMasterSubmit)

insertUserRouter
.route("/editHeaderMaster/:id")
.get(loginCheck,insertUserController.editHeaderMaster)
.post(loginCheck,insertUserController.editHeaderMasterSubmit)


insertUserRouter
.route("/createPageMaster")
.get(loginCheck,insertUserController.createPageMaster)

insertUserRouter
.route("/editCreatePageMaster/:id")
.get(loginCheck,insertUserController.editCreatePageMaster)
.post(loginCheck,insertUserController.editCreatePageMasterSubmit)


insertUserRouter
.route("/addCreatePageMaster")
.get(loginCheck,insertUserController.addCreatePageMaster)
.post(loginCheck,insertUserController.addCreatePageMasterSubmit)

insertUserRouter
.route("/editHeaderMaster/:id")
.get(loginCheck,insertUserController.editHeaderMaster)
.post(loginCheck,insertUserController.editHeaderMasterSubmit)

insertUserRouter
.route("/detailsPage/:id")
.get(loginCheck,insertUserController.detailsCreatePageMaster)

insertUserRouter
.route("/allQuerys")
.get(loginCheck,insertUserController.AllQuerys)

insertUserRouter
.route("/QuerysDetails/:id")
.get(loginCheck,insertUserController.QuerysDetails)


module.exports = insertUserRouter
