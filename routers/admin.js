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
.route("/users")
.get(loginCheck,insertUserController.users)
insertUserRouter
.route("/deleteUser/:id")
.get(loginCheck,insertUserController.deleteUser)


insertUserRouter
.route("/tours")
.get(loginCheck,insertUserController.tours)
insertUserRouter
.route("/addTour")
.get(loginCheck,insertUserController.addTour)
.post(loginCheck,insertUserController.addTourSubmit)
insertUserRouter
.route("/editTour/:id")
.get(loginCheck,insertUserController.editTour)
.post(loginCheck,insertUserController.editTourrSubmit)



insertUserRouter
.route("/transfer")
.get(loginCheck,insertUserController.transfer)
insertUserRouter
.route("/addTransfer")
.get(loginCheck,insertUserController.addTransfer)
.post(loginCheck,insertUserController.addTransferSubmit)
insertUserRouter
.route("/editTransfer/:id")
.get(loginCheck,insertUserController.editTransfer)
.post(loginCheck,insertUserController.editTransferSubmit)



insertUserRouter
.route("/cars")
.get(loginCheck,insertUserController.cars)
insertUserRouter
.route("/addCar")
.get(loginCheck,insertUserController.addCar)
.post(loginCheck,insertUserController.addCarSubmit)
insertUserRouter
.route("/deleteCar/:id")
.get(loginCheck,insertUserController.deleteCar)



insertUserRouter
.route("/carPrice")
.get(loginCheck,insertUserController.carPrice)
insertUserRouter
.route("/addCarPrice")
.get(loginCheck,insertUserController.addCarPrice)
.post(loginCheck,insertUserController.addCarPriceSubmit)
insertUserRouter
.route("/deleteCarPrice/:id")
.get(loginCheck,insertUserController.deleteCarPrice)




insertUserRouter
.route("/attractionCategory")
.get(loginCheck,insertUserController.attractionCategory)
insertUserRouter
.route("/addAttractionCategory")
.get(loginCheck,insertUserController.addAttractionCategory)
.post(loginCheck,insertUserController.addAttractionCategorySubmit)
insertUserRouter
.route("/deleteAttractionCategory/:id")
.get(loginCheck,insertUserController.deleteAttractionCategory)


insertUserRouter
.route("/attractions")
.get(loginCheck,insertUserController.attractions)
insertUserRouter
.route("/addAttractions")
.get(loginCheck,insertUserController.addAttractions)
.post(loginCheck,insertUserController.addAttractionsSubmit)
insertUserRouter
.route("/detailAttractions/:id")
.get(loginCheck,insertUserController.detailAttractions)
insertUserRouter
.route("/deleteAttractions/:id")
.get(loginCheck,insertUserController.deleteAttractions)




insertUserRouter
.route("/bookings")
.get(insertUserController.bookings)
insertUserRouter
.route("/detailBookings/:id")
.get(insertUserController.detailBookings)









insertUserRouter
.route("/detailsCar/:id")
.get(insertUserController.detailCar)


insertUserRouter
.route("/logout")
.get(loginCheck,insertUserController.logout)


insertUserRouter
.route("/getAllTours")
.get(insertUserController.getAllTours)


insertUserRouter
.route("/getAllTransfer")
.get(insertUserController.getAllTransfer)

insertUserRouter
.route("/viewProfile")
.get(insertUserController.viewProfile)


insertUserRouter
.route("/getAllBookings")
.get(insertUserController.getAllBookings)








module.exports = insertUserRouter
