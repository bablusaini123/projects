const adminRouter = require("express").Router();
const adminController = require("../controllers/admin-controller");
const authController = require("../controllers/auth-controller");

adminRouter
  .route("/login")
  .get(adminController.adminLogin);
adminRouter
  .route("/login")
  .post(adminController.adminLoginSubmit);
adminRouter
  .route("/adminDashboard")
  .get(authController.adminCheck, adminController.dashboard);

adminRouter
  .route("/customers")
  .get(authController.adminCheck,adminController.customers );
adminRouter
  .route("/addCustomers")
  .get(authController.adminCheck,adminController.addCustomers )
  .post(authController.adminCheck,adminController.addCustomerSubmit );
  adminRouter
  .route("/editCustomer/:id")
  .get(authController.adminCheck,adminController.editCustomer )
  .post(authController.adminCheck,adminController.editCustomerSubmmit)
  adminRouter
  .route("/deleteCustomer/:id")
  .get(authController.adminCheck,adminController.deleteCustomer )



adminRouter
  .route("/developers")
  .get(authController.adminCheck,adminController.developers );
adminRouter
  .route("/addDevelopers")
  .get(authController.adminCheck,adminController.addDevelopers )
  .post(authController.adminCheck,adminController.addDeveloperSubmit)
  adminRouter
  .route("/editDeveloper/:id")
  .get(authController.adminCheck,adminController.editDevelopers )
  .post(authController.adminCheck,adminController.editDevelopersSubmmit)
  adminRouter
  .route("/deleteDeveloper/:id")
  .get(authController.adminCheck,adminController.deleteDeveloper )


  adminRouter
  .route("/projectManager")
  .get(authController.adminCheck,adminController.projectManager );
adminRouter
  .route("/addProjectManager")
  .get(authController.adminCheck,adminController.addProjectManager )
  .post(authController.adminCheck,adminController.addProjectManagerSubmit );
  adminRouter
  .route("/editProjectManager/:id")
  .get(authController.adminCheck,adminController.editProjectManager )
  .post(authController.adminCheck,adminController.editProjectManagerSubmmit)
  adminRouter
  .route("/deleteProjectManager/:id")
  .get(authController.adminCheck,adminController.deleteProjectManager )




adminRouter
  .route("/delete/:id")
  .get(authController.adminCheck, adminController.deleteteUser);

adminRouter
  .route("/projects")
  .get(authController.adminCheck,adminController.project )
adminRouter
  .route("/addProject")
  .get(authController.adminCheck,adminController.addProject )
  .post(authController.adminCheck,adminController.upload.fields([{name:"invoice"}]),adminController.addProjectSubmit)
adminRouter
  .route("/editProject/:id")
  .get(authController.adminCheck,adminController.editProject )
  .post(authController.adminCheck,adminController.upload.fields([{name:"invoice"}]),adminController.editProjectSubmmit)
adminRouter
  .route("/deleteProject/:id")
  .get(authController.adminCheck,adminController.deleteProject )
adminRouter
  .route("/adminReadMore/:id")
  .get(authController.adminCheck,adminController.adminReadMore )






  adminRouter
  .route("/addProjectName")
  .get(authController.adminCheck,adminController.addProjectName )
  .post(authController.adminCheck,adminController.addProjectNameSubmit )
  adminRouter
  .route("/editProjectName/:id")
  .get(authController.adminCheck,adminController.editProjectName )
  .post(authController.adminCheck,adminController.editProjectNameSubmmit )
  adminRouter
  .route("/deleteProjectName/:id")
  .get(authController.adminCheck,adminController.deleteProjectName )


 adminRouter
  .route("/addStatus")
  .get(authController.adminCheck,adminController.addStatus )
  .post(authController.adminCheck,adminController.addStatusSubmit )
  adminRouter
  .route("/editStatus/:id")
  .get(authController.adminCheck,adminController.editStatus )
  .post(authController.adminCheck,adminController.editStatusSubmmit )
  adminRouter
  .route("/deleteStatus/:id")
  .get(authController.adminCheck,adminController.deleteStatus )
  adminRouter
  .route("/adminProfile")
  .get(authController.adminCheck,adminController.adminProfile )
adminRouter
  .route("/changeAdminDetails")
  .post(authController.adminCheck,adminController.changeAdminDetails )

  adminRouter
  .route("/userDetails/:id")
  .get(authController.adminCheck,adminController.userDetails )



adminRouter
  .route("/logout")
  .get(adminController.logout);






module.exports = adminRouter;
