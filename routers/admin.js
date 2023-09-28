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
.route("/staff")
.get(loginCheck,insertUserController.staff)
.post(loginCheck,insertUserController.staffSubmit)
insertUserRouter
.route("/changeStatusSubadmin/:id")
.get(loginCheck,insertUserController.changeStatusSubAdmin)
insertUserRouter
.route("/editStaff/:id")
.get(loginCheck,insertUserController.editStaff)
.post(loginCheck,insertUserController.editStaffSubmit)
insertUserRouter
.route("/deleteStaff/:id")
.get(loginCheck,insertUserController.deleteStaff)

insertUserRouter
.route("/changeStatus/:id")
.get(loginCheck,insertUserController.changeStatusUser)

insertUserRouter
.route("/createUser")
.post(loginCheck,insertUserController.createUser)

insertUserRouter
.route("/users")
.get(loginCheck,insertUserController.users)
.post(loginCheck,insertUserController.createUser)

insertUserRouter
.route("/userDelete/:id")
.get(loginCheck,insertUserController.deleteUser)

insertUserRouter
.route("/category")
.get(loginCheck,insertUserController.category)
.post(loginCheck,insertUserController.createCategory)

insertUserRouter
.route("/editCategory/:id")
.get(loginCheck,insertUserController.editCategory)
.post(loginCheck,insertUserController.editCategorySubmit)


insertUserRouter
.route("/changeStatusCategory/:id")
.get(loginCheck,insertUserController.changeStatusCategory)

insertUserRouter
.route("/deleteCategori/:id")
.get(loginCheck,insertUserController.deleteCategori)

insertUserRouter
.route("/contest")
.get(loginCheck,insertUserController.contest)

insertUserRouter
.route("/addContest")
.get(loginCheck,insertUserController.addContest)
.post(loginCheck, insertUserController.upload.fields([{ name: "bannerImg" },{ name: "pImage" },{ name: "sImage" }]),insertUserController.addContestSubmit)

insertUserRouter
.route("/changeStatusContest/:id")
.get(loginCheck,insertUserController.changeStatusContest)

insertUserRouter
.route("/editContest/:id")
.get(loginCheck,insertUserController.editContest)
.post(loginCheck,insertUserController.editContestSubmit)

insertUserRouter
.route("/getContest/:id")
.get(loginCheck,insertUserController.getContest)

insertUserRouter
.route("/deleteContest/:id")
.get(loginCheck,insertUserController.deleteContest)

insertUserRouter
.route("/editAnswer/:id")
.get(loginCheck,insertUserController.editAnswer)
.post(loginCheck,insertUserController.editAnswerSubmit)


insertUserRouter
.route("/timezone")
.get(loginCheck,insertUserController.timezone)
.post(loginCheck,insertUserController.timezoneedit)

insertUserRouter
.route("/userReport")
.get(loginCheck,insertUserController.userReport)
insertUserRouter
.route("/contestReport")
.get(loginCheck,insertUserController.contestReport)

insertUserRouter
.route("/generalSetting")
.get(loginCheck,insertUserController.generalSetting)
.post(loginCheck,insertUserController.upload.fields([{ name: "logo" },{ name: "icon" },{ name: "sinupBanner", },{name :"resultBanner"},{name :"contactBanner"},{name :"resetPassword"}]), insertUserController.generalSettingSubmit)


insertUserRouter
.route("/manageStaticPage")
.get(loginCheck,insertUserController.manageStaticPage)

insertUserRouter
.route("/editStaticPage/:id")
.get(loginCheck,insertUserController.editStaticPage)
.post(loginCheck,insertUserController.upload.fields([{ name: "image" }]),insertUserController.editStaticPageSubmit)





// insertUserRouter
// .route("/userEdit/:id")
// .get(loginCheck,insertUserController.userEdit)
// .post(loginCheck,insertUserController.userEditSubmit)

// insertUserRouter
// .route("/userEditSubmit/:id")
// .post(loginCheck,insertUserController.userEditSubmit)









module.exports = insertUserRouter
