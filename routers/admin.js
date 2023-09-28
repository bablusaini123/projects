const insertUserRouter =require("express").Router()
const insertUserController= require("../controller/admin")

function loginCheck(req, res, next) {
   
    const token = req.cookies.token
    console.log("yyyy",token)
  
    if (token) {
        next()
    } else {
        res.redirect("/")
    }
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
.route("/clients")
.get(loginCheck,insertUserController.clients)

insertUserRouter
.route("/addClients")
.get(loginCheck,insertUserController.addClients)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.addClientsSubmit)


insertUserRouter
.route("/editClients/:id")
.get(loginCheck,insertUserController.editClients)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.editClientsSubmit)


insertUserRouter
.route("/deleteClients/:id")
.get(loginCheck,insertUserController.deleteClients)



insertUserRouter
.route("/services")
.get(loginCheck,insertUserController.services)

insertUserRouter
.route("/addServices")
.get(loginCheck,insertUserController.addServices)
.post(loginCheck,insertUserController.upload.fields([{ name: "frountLogo" }]),insertUserController.addServicesSubmit)


insertUserRouter
.route("/editServices/:id")
.get(loginCheck,insertUserController.editServices)
.post(loginCheck,insertUserController.upload.fields([{ name: "frountLogo" }]),insertUserController.editServicesSubmit)


insertUserRouter
.route("/detailServices/:id")
.get(loginCheck,insertUserController.detailsServices)

insertUserRouter
.route("/deleteServices/:id")
.get(loginCheck,insertUserController.deleteServices)


insertUserRouter
.route("/Sectors")
.get(loginCheck,insertUserController.sectors)


insertUserRouter
.route("/addSectors")
.get(loginCheck,insertUserController.addSectors)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.addSectorsSubmit)


insertUserRouter
.route("/editSectors/:id")
.get(loginCheck,insertUserController.editSectors)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.editSectorsSubmit)



insertUserRouter
.route("/deleteSectors/:id")
.get(loginCheck,insertUserController.deleteSectors)


insertUserRouter
.route("/solutionsCategory")
.get(loginCheck,insertUserController.solutionsCategory)


insertUserRouter
.route("/addSolutionsCategory")
.get(loginCheck,insertUserController.addSolutionsCategory)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" },{name:"backgroundImage"}]),insertUserController.addSolutionsCategorysSubmit)

insertUserRouter
.route("/editSolutionsCategory/:id")
.get(loginCheck,insertUserController.editSolutionsCategory)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" } , {name:"backgroundImage"}]),insertUserController.editSolutionsCategorySubmit)

insertUserRouter
.route("/deleteSolutionsCategory/:id")
.get(loginCheck,insertUserController.deleteSolutionsCategory)


insertUserRouter
.route("/solutions")
.get(loginCheck,insertUserController.solutions)

insertUserRouter
.route("/addSolutions")
.get(loginCheck,insertUserController.addSolutions)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.addSolutionsSubmit)

insertUserRouter
.route("/editSolutions/:id")
.get(loginCheck,insertUserController.editSolutions)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.editSolutionsSubmit)

insertUserRouter
.route("/detailSolutions/:id")
.get(loginCheck,insertUserController.detailsSolutions)

insertUserRouter
.route("/deleteSolutions/:id")
.get(loginCheck,insertUserController.deleteSolutions)

insertUserRouter
.route("/contectUs")
.get(loginCheck,insertUserController.contectUs)

insertUserRouter
.route("/applyJob")
.get(loginCheck,insertUserController.applyJob)

insertUserRouter
.route("/detailContectUs/:id")
.get(loginCheck,insertUserController.detailsContectUs)

insertUserRouter
.route("/broshure")
.get(loginCheck,insertUserController.broshure)

insertUserRouter
.route("/addBroshure")
.get(loginCheck,insertUserController.addBroshure)
.post(loginCheck,insertUserController.upload.fields([{ name: "pdf" }]),insertUserController.addBroshureSubmit)

insertUserRouter
.route("/editBroshure/:id")
.get(loginCheck,insertUserController.editBroshure)
.post(loginCheck,insertUserController.upload.fields([{ name: "pdf" }]),insertUserController.editBroshureSubmit)

insertUserRouter
.route("/deleteBroshure/:id")
.get(loginCheck,insertUserController.deleteBroshure)

insertUserRouter
.route("/getAllBroshure")
.get(insertUserController.getAllBroshure)


module.exports = insertUserRouter
