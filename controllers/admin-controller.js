
const multer = require("multer");
const bcrypt = require("bcrypt");
const httpMsgs = require("http-msgs");
const jwt = require("jsonwebtoken");
const path = require("path");
const app = require("../app");
const { json } = require("body-parser");
const connection = app.query




const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    let a = file.originalname;
    let extname = path.extname(a);
    if (extname === ".jpg" || extname === ".png") {
      callback(null, "./public/image");
    } else if (extname === ".pdf") {
      callback(null, "./public/upload-pdf");
    }
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + Date.now() + file.originalname);
  },
});




module.exports.upload = multer({
  storage: Storage,
});





module.exports.adminLogin = async (req, res) => {
  res.render("login.ejs");
};



module.exports.adminLoginSubmit = async (req, res) => {

  try {
    console.log("bbbbb", req.body)
    const email = req.body.email
    const password = req.body.password
    const sql = `SELECT * FROM users where email='${email}'`
    const result = await connection(sql)
    console.log(result)

    if (result.length > 0) {
      // let bcryptMatchPassword = await bcrypt.compare(
      //   password,
      //   result[0].password
      // );
      if (result[0].password == password) {


        if (result[0].status == 1) {

          if (result[0].type === 'admin') {
            let userId = result[0].id
            const token = jwt.sign({ userId }, "zxcvbnm")
            res.cookie("adminToken", token)
            res.status(200).json({ message: "admin successfully login" })
          }
          else if (result[0].type === 'developer') {
            let userId = result[0].id
            const token = jwt.sign({ userId }, "zxcvbnm")
            res.cookie("developerToken", token)
            res.status(200).json({ message: "developer successfully login" })
          }
          else if (result[0].type === 'customer') {
            let userId = result[0].id
            const token = jwt.sign({ userId }, "zxcvbnm")
            res.cookie("customerToken", token)
            res.status(200).json({ message: "customer successfully login" })
          }
          else if (result[0].type === 'projectManager') {
            let userId = result[0].id
            const token = jwt.sign({ userId }, "zxcvbnm")
            res.cookie("projectManagerToken", token)
            res.status(200).json({ message: "project Manager successfully login" })
          }
        } else {
          httpMsgs.send500(req, res, "this account is dissabled ! please contect admin");
        }



      } else {
        httpMsgs.send500(req, res, "your password is inccorect");
      }

    } else {
      httpMsgs.send500(req, res, "your account dose not exist");
    }
  } catch (error) {
    console.log(error)
  }
};

module.exports.dashboard = async (req, res) => {

  // ALL PROJECT

  const findProjectSql = `SELECT * FROM projects`
  var findProject = await connection(findProjectSql)
  for (let i = 0; i < findProject.length; i++) {
    const id = findProject[i].projectName;
    const findProjectNameSql = `SELECT * FROM projectname where id = '${id}'`
    const findProjectName = await connection(findProjectNameSql)
    if (findProjectName.length > 0) {
      findProject[i].projectName = findProjectName[0].projectName
    } else {
      findProject[i].projectName = "null"
    }

  }

  console.log(findProject)
  res.render("dashboard.ejs", { findProject: findProject });
};




module.exports.customers = async (req, res) => {
  try {
    const sql = `SELECT * FROM users where type = "customer"`
    const userData = await connection(sql)
    res.render("customers.ejs", { userData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports.addCustomers = async (req, res) => {
  try {
    // const sql = `SELECT * FROM users where type='user'`
    //   const userData = await connection(sql)
    res.render("add-customer.ejs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addCustomerSubmit = async (req, res) => {
  try {
    console.log(req.body)

    const name = req.body.name
    const phone_no = req.body.phone_no
    const company_name = req.body.company_name
    const address = req.body.address
    const gst_no = req.body.gst_no
    const domain = req.body.domain
    const email = req.body.email
    const password = req.body.password
    const findUserWithEmailSql = `SELECT * FROM users where email='${email}'`
    const findUserWithEmail = await connection(findUserWithEmailSql)
    //  console.log(findUserWithEmail)
    if (findUserWithEmail.length > 0) {
      httpMsgs.send500(req, res, "this email is already exist");

    } else {
      const sql = `INSERT INTO users ( id ,name, phone_no , company_name , address , gst_no , domain,email, password , status , type ) VALUES ('${''}','${name}','${phone_no}','${company_name}','${address}','${gst_no}','${domain}','${email}','${password}','${1}','${"customer"}')`
      const result = await connection(sql)
      res.redirect("/customers")
    }


  } catch (error) {
    console.log(error)
  }
}


module.exports.editCustomer = async (req, res) => {
  try {
    const sql = `SELECT * FROM users where id = '${req.params.id}' `
    const result = await connection(sql)
    res.render("edit-customer.ejs", { result: result[0] });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.editCustomerSubmmit = async (req, res) => {
  try {

    const id = req.params.id
    const name = req.body.name
    const phone_no = req.body.phone_no
    const company_name = req.body.company_name
    const address = req.body.address
    const gst_no = req.body.gst_no
    const domain = req.body.domain
    const email = req.body.email
    const password = req.body.password
    const editProjectNameSql = `UPDATE users set name = '${name}' , phone_no = '${phone_no}' ,company_name = '${company_name}',address = '${address}',gst_no = '${gst_no}',domain = '${domain}',email = '${email}',password = '${password}' where id = '${id}'`
    const editStatus = await connection(editProjectNameSql)
    res.redirect("/customers")
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports.deleteCustomer = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM users where id="${id}"`
    const result = await connection(query)
    res.redirect("/customers")

  } catch (error) {
    console.log(error)
  }
}





module.exports.developers = async (req, res) => {
  try {
    const sql = `SELECT * FROM users where type = "developer"`
    const userData = await connection(sql)
    res.render("developers.ejs", { userData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports.addDevelopers = async (req, res) => {
  try {
    // const sql = `SELECT * FROM users where type='user'`
    //   const userData = await connection(sql)
    res.render("add-developer.ejs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports.addDeveloperSubmit = async (req, res) => {
  try {
    console.log(req.body)

    const name = req.body.name
    const phone_no = req.body.phone_no
    const company_name = req.body.company_name
    const address = req.body.address
    const gst_no = req.body.gst_no
    const domain = req.body.domain
    const email = req.body.email
    const password = req.body.password
    const findUserWithEmailSql = `SELECT * FROM users where email='${email}'`
    const findUserWithEmail = await connection(findUserWithEmailSql)
    //  console.log(findUserWithEmail)
    if (findUserWithEmail.length > 0) {
      httpMsgs.send500(req, res, "this email is already exist");

    } else {
      const sql = `INSERT INTO users ( id ,name, phone_no , company_name , address , gst_no , domain,email, password , status , type ) VALUES ('${''}','${name}','${phone_no}','${company_name}','${address}','${gst_no}','${domain}','${email}','${password}','${1}','${"developer"}')`
      const result = await connection(sql)
      res.redirect("/customers")
    }


  } catch (error) {
    console.log(error)
  }
}

module.exports.editDevelopers = async (req, res) => {
  try {
    const sql = `SELECT * FROM users where id = '${req.params.id}' `
    const result = await connection(sql)
    res.render("edit-developer.ejs", { result: result[0] });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.editDevelopersSubmmit = async (req, res) => {
  try {

    const id = req.params.id
    const name = req.body.name
    const phone_no = req.body.phone_no
    const company_name = req.body.company_name
    const address = req.body.address
    const gst_no = req.body.gst_no
    const domain = req.body.domain
    const email = req.body.email
    const password = req.body.password
    const editProjectNameSql = `UPDATE users set name = '${name}' , phone_no = '${phone_no}' ,company_name = '${company_name}',address = '${address}',gst_no = '${gst_no}',domain = '${domain}',email = '${email}',password = '${password}' where id = '${id}'`
    const editStatus = await connection(editProjectNameSql)
    res.redirect("/developers")
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports.deleteDeveloper = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM users where id="${id}"`
    const result = await connection(query)
    res.redirect("/developers")

  } catch (error) {
    console.log(error)
  }
}




module.exports.deleteteUser = async (req, res) => {
  try {

    res.redirect("/users");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.project = async (req, res) => {
  try {
    const sql = `SELECT * FROM projects`
    const projects = await connection(sql)
    for (let i = 0; i < projects.length; i++) {
      const id = projects[i].projectName;
      const findProjectNameSql = `SELECT * FROM projectname where id = '${id}'`
      const findProjectName = await connection(findProjectNameSql)
      if (findProjectName.length > 0) {
        projects[i].projectName = findProjectName[0].projectName
      } else {
        projects[0].projectName = "null"
      }

    }
    res.render("adminProjectList.ejs", { projects });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports.addProject = async (req, res) => {
  try {
    const findCustomerSql = `SELECT * FROM users where type='${"customer"}'`
    const findCustomer = await connection(findCustomerSql)

    const findDeveloperSql = `SELECT * FROM users where type='${"developer"}'`
    const findDeveloper = await connection(findDeveloperSql)

    const findProjectManagerSql = `SELECT * FROM users where type='${"projectManager"}'`
    const findProjectManager = await connection(findProjectManagerSql)

    const projectNameSql = `SELECT * FROM projectname`
    const projectName = await connection(projectNameSql)

    const findProjectStatusSql = `SELECT * FROM status`
    const findProjectStatus = await connection(findProjectStatusSql)
    res.render("add-project.ejs", { findCustomer, projectName, findProjectStatus, findDeveloper ,findProjectManager });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports.addProjectSubmit = async (req, res) => {
  try {
    // console.log("req", req.body)
    const projectName = req.body.projectName
    const customer = req.body.customer
    const domain = req.body.domain
    const projectBasicCost = req.body.projectBasicCost
    const gst = req.body.gst
    const paybleAmount = req.body.paybleAmount
    const advancePayment = req.body.advancePayment
    const balancePayment = req.body.balancePayment
    const projectStatus = req.body.projectStatus
    const Remark = req.body.Remark
    const projectStart = req.body.projectStart
    const projectEnd = req.body.projectEnd
    const projectManager = req.body.projectManager
    const customerAdPay1 = req.body.customerAdPay1
    const customerAdPay2 = req.body.customerAdPay2
    const customerAdPay3 = req.body.customerAdPay3
    const customerAdPay4 = req.body.customerAdPay4

    const customerAdPayDate1 = req.body.customerAdPayDate1
    const customerAdPayDate2 = req.body.customerAdPayDate2
    const customerAdPayDate3 = req.body.customerAdPayDate3
    const customerAdPayDate4 = req.body.customerAdPayDate4


    const developer = req.body.developer
    const d_projectBasicCost = req.body.d_projectBasicCost
    const d_gst = req.body.d_gst
    const d_paybleAmount = req.body.d_paybleAmount
    const d_advancePayment = req.body.d_advancePayment
    const d_balancePayment = req.body.d_balancePayment
    const d_Remark = req.body.d_Remark
    const invoiceNo = req.body.invoiceNo
   
    const developerAdPay1 = req.body.developerAdPay1
    const developerAdPay2 = req.body.developerAdPay2
    const developerAdPay3 = req.body.developerAdPay3
    const developerAdPay4 = req.body.developerAdPay4

    const developerAdPayDate1 = req.body.developerAdPayDate1
    const developerAdPayDate2 = req.body.developerAdPayDate2
    const developerAdPayDate3 = req.body.developerAdPayDate3
    const developerAdPayDate4 = req.body.developerAdPayDate4



    const pm_projectBasicCost = req.body.pm_projectBasicCost
    const pm_gst = req.body.pm_gst
    const pm_paybleAmount = req.body.pm_paybleAmount
    const pm_advancePayment = req.body.pm_advancePayment
    const pm_balancePayment = req.body.pm_balancePayment
    const pmAdPay1 = req.body.pmAdPay1
    const pmAdPay2 = req.body.pmAdPay2
    const pmAdPay3 = req.body.pmAdPay3
    const pmAdPay4 = req.body.pmAdPay4

    const pmAdPayDate1 = req.body.pmAdPayDate1
    const pmAdPayDate2 = req.body.pmAdPayDate2
    const pmAdPayDate3 = req.body.pmAdPayDate3
    const pmAdPayDate4 = req.body.pmAdPayDate4

    console.log(req.files)
   
    if(req.files.invoice){
      const invoice = req.files.invoice[0].filename
      const sql = `INSERT INTO projects ( id ,projectName, customer  , domain , projectBasicCost , gst,paybleAmount, 
        advancePayment , balancePayment , projectStatus , Remark , projectStart , projectEnd ,
        d_projectName , developer  , d_projectBasicCost , d_gst,d_paybleAmount, d_advancePayment , 
        d_balancePayment  , d_Remark , invoiceno , invoice , project_manager , customeradpay1 , customeradpay2 , customeradpay3,customeradpay4,
        developeradpay1 ,developeradpay2, developeradpay3, developeradpay4,pmadpay1,pmadpay2,pmadpay3,pmadpay4,
        pm_totalProjectCost,pm_gst,pm_paybleAmount,pm_advancePayment,pm_balancePayment,
        customeradpaydate1 ,customeradpaydate2 ,customeradpaydate3, customeradpaydate4 ,
        developeradpaydate1 ,developeradpaydate2 ,developeradpaydate3 ,developeradpaydate4,
        pmadpaydate1 , pmadpaydate2, pmadpaydate3, pmadpaydate4) VALUES 
        ('${''}','${projectName}','${customer}','${domain}','${projectBasicCost}','${gst}',
        '${paybleAmount}','${advancePayment}','${balancePayment}','${projectStatus}','${Remark}','${projectStart}',
        '${projectEnd}','${projectName}','${developer}','${d_projectBasicCost}','${d_gst}','${d_paybleAmount}',
        '${d_advancePayment}','${d_balancePayment}','${d_Remark}','${invoiceNo}','${invoice}','${projectManager}','${customerAdPay1}'
        ,'${customerAdPay2}','${customerAdPay3}','${customerAdPay4}','${developerAdPay1}','${developerAdPay2}','${developerAdPay3}'
        ,'${developerAdPay4}','${pmAdPay1}','${pmAdPay2}','${pmAdPay3}','${pmAdPay4}','${pm_projectBasicCost}','${pm_gst}','${pm_paybleAmount}',
        '${pm_advancePayment}','${pm_balancePayment}' ,'${customerAdPayDate1}' ,'${customerAdPayDate2}' ,'${customerAdPayDate3}' ,'${customerAdPayDate4}'
        , '${developerAdPayDate1}','${developerAdPayDate2}','${developerAdPayDate3}','${developerAdPayDate4}'
        , '${pmAdPayDate1}','${pmAdPayDate2}','${pmAdPayDate3}','${pmAdPayDate4}')`
      const result = await connection(sql)
      res.redirect("/projects")
    }else{

      const sql = `INSERT INTO projects ( id ,projectName, customer  , domain , projectBasicCost , gst,paybleAmount, 
        advancePayment , balancePayment , projectStatus , Remark , projectStart , projectEnd ,
        d_projectName , developer  , d_projectBasicCost , d_gst,d_paybleAmount, d_advancePayment , 
        d_balancePayment  , d_Remark , invoiceno  , project_manager , customeradpay1 , customeradpay2 , customeradpay3,customeradpay4,
        developeradpay1 ,developeradpay2, developeradpay3, developeradpay4,pmadpay1,pmadpay2,pmadpay3,pmadpay4,
        pm_totalProjectCost,pm_gst,pm_paybleAmount,pm_advancePayment,pm_balancePayment,
        customeradpaydate1 ,customeradpaydate2 ,customeradpaydate3, customeradpaydate4 ,
        developeradpaydate1 ,developeradpaydate2 ,developeradpaydate3 ,developeradpaydate4,
        pmadpaydate1 , pmadpaydate2, pmadpaydate3, pmadpaydate4) VALUES 
        ('${''}','${projectName}','${customer}','${domain}','${projectBasicCost}','${gst}',
        '${paybleAmount}','${advancePayment}','${balancePayment}','${projectStatus}','${Remark}','${projectStart}',
        '${projectEnd}','${projectName}','${developer}','${d_projectBasicCost}','${d_gst}','${d_paybleAmount}',
        '${d_advancePayment}','${d_balancePayment}','${d_Remark}','${invoiceNo}','${projectManager}','${customerAdPay1}'
        ,'${customerAdPay2}','${customerAdPay3}','${customerAdPay4}','${developerAdPay1}','${developerAdPay2}','${developerAdPay3}'
        ,'${developerAdPay4}','${pmAdPay1}','${pmAdPay2}','${pmAdPay3}','${pmAdPay4}','${pm_projectBasicCost}','${pm_gst}','${pm_paybleAmount}',
        '${pm_advancePayment}','${pm_balancePayment}' ,'${customerAdPayDate1}' ,'${customerAdPayDate2}' ,'${customerAdPayDate3}' ,'${customerAdPayDate4}'
        , '${developerAdPayDate1}','${developerAdPayDate2}','${developerAdPayDate3}','${developerAdPayDate4}'
        , '${pmAdPayDate1}','${pmAdPayDate2}','${pmAdPayDate3}','${pmAdPayDate4}')`
      const result = await connection(sql)
      res.redirect("/projects")

    }

  

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



module.exports.editProject = async (req, res) => {

  try {
  //   const findProjectSql = `SELECT * FROM projects where id='${req.params.id}'`
  //   const findProject = await connection(findProjectSql)
  //   var developeradvanceprice=  findProject[0].developeradvanceprice
  //  const abc=  JSON.parse(developeradvanceprice)
  //  abc.push(6)
  //  console.log(abc)
  

    const findCustomerSql = `SELECT * FROM users where type='${"customer"}'`
    const findCustomer = await connection(findCustomerSql)

    const findDeveloperSql = `SELECT * FROM users where type='${"developer"}'`
    const findDeveloper = await connection(findDeveloperSql)

    const findProjectManagerSql = `SELECT * FROM users where type='${"projectManager"}'`
    const findProjectManager = await connection(findProjectManagerSql)

    const projectNameSql = `SELECT * FROM projectname`
    const projectName = await connection(projectNameSql)

    const findProjectStatusSql = `SELECT * FROM status`
    const findProjectStatus = await connection(findProjectStatusSql)
    const sql = `SELECT * FROM projects where id = '${req.params.id}'`
    const result = await connection(sql)
    res.render("edit-project.ejs", { project: result[0], findCustomer, projectName, findProjectStatus, findDeveloper ,findProjectManager});
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.editProjectSubmmit = async (req, res) => {
  try {

    const id = req.params.id
   // console.log("req", req.body)
    const projectName = req.body.projectName
    const customer = req.body.customer
    const domain = req.body.domain
    const projectBasicCost = req.body.projectBasicCost
    const gst = req.body.gst
    const paybleAmount = req.body.paybleAmount
    const advancePayment = req.body.advancePayment
    const balancePayment = req.body.balancePayment
    const projectStatus = req.body.projectStatus
    const Remark = req.body.Remark
    const projectStart = req.body.projectStart
    const projectEnd = req.body.projectEnd
    const developer = req.body.developer
    const d_projectBasicCost = req.body.d_projectBasicCost
    const d_gst = req.body.d_gst
    const d_paybleAmount = req.body.d_paybleAmount
    const d_advancePayment = req.body.d_advancePayment
    const d_balancePayment = req.body.d_balancePayment
    const d_Remark = req.body.d_Remark
    const invoiceNo = req.body.invoiceNo
    const projectManager = req.body.projectManager

    const customerAdPay1 = req.body.customerAdPay1
    const customerAdPay2 = req.body.customerAdPay2
    const customerAdPay3 = req.body.customerAdPay3
    const customerAdPay4 = req.body.customerAdPay4

    const customerAdPayDate1 = req.body.customerAdPayDate1
    const customerAdPayDate2 = req.body.customerAdPayDate2
    const customerAdPayDate3 = req.body.customerAdPayDate3
    const customerAdPayDate4 = req.body.customerAdPayDate4


    const developerAdPay1 = req.body.developerAdPay1
    const developerAdPay2 = req.body.developerAdPay2
    const developerAdPay3 = req.body.developerAdPay3
    const developerAdPay4 = req.body.developerAdPay4

    const developerAdPayDate1 = req.body.developerAdPayDate1
    const developerAdPayDate2 = req.body.developerAdPayDate2
    const developerAdPayDate3 = req.body.developerAdPayDate3
    const developerAdPayDate4 = req.body.developerAdPayDate4

    const pm_projectBasicCost = req.body.pm_projectBasicCost
    const pm_gst = req.body.pm_gst
    const pm_paybleAmount = req.body.pm_paybleAmount
    const pm_advancePayment = req.body.pm_advancePayment
    const pm_balancePayment = req.body.pm_balancePayment
    const pmAdPay1 = req.body.pmAdPay1
    const pmAdPay2 = req.body.pmAdPay2
    const pmAdPay3 = req.body.pmAdPay3
    const pmAdPay4 = req.body.pmAdPay4

    const pmAdPayDate1 = req.body.pmAdPayDate1
    const pmAdPayDate2 = req.body.pmAdPayDate2
    const pmAdPayDate3 = req.body.pmAdPayDate3
    const pmAdPayDate4 = req.body.pmAdPayDate4
    // var developerAdvanceAmount = req.body.developerAdvanceAmount
    // const customerAdvanceAmount = req.body.customerAdvanceAmount
 
    // const findProjectSql = `SELECT * FROM projects where id='${req.params.id}'`
    // const findProject = await connection(findProjectSql)
    // var developeradvanceprice=  findProject[0].developeradvanceprice
    // var customeradvanceprice=  findProject[0].customeradvanceprice
    // developerAdvanceAmount = customeradvanceprice
    // const convertDeveloperAdvancePrice =JSON.parse(developeradvanceprice)
    // developerAdvanceAmount = convertDeveloperAdvancePrice
    // console.log(convertDeveloperAdvancePrice)
   
  //  var convertCustomerAdvancePrice = JSON.parse(customeradvanceprice)
   
  

    if (req.files.invoice) {
      const invoice = req.files.invoice[0].filename
      const editProjectSql = `UPDATE projects set projectName = '${projectName}' , customer = '${customer}' ,domain = '${domain}'
      ,projectBasicCost = '${projectBasicCost}',gst = '${gst}',paybleAmount = '${paybleAmount}',
      advancePayment = '${advancePayment}',balancePayment = '${balancePayment}' ,
      projectStatus = '${projectStatus}',Remark = '${Remark}',projectStart = '${projectStart}',
       projectEnd = '${projectEnd}',developer = '${developer}', d_projectBasicCost = '${d_projectBasicCost}',
       d_gst = '${d_gst}',d_paybleAmount = '${d_paybleAmount}', d_advancePayment = '${d_advancePayment}', 
       d_balancePayment = '${d_balancePayment}' , d_Remark = '${d_Remark}', invoiceno = '${invoiceNo}', invoice = '${invoice}' ,
        project_manager = '${projectManager}' ,
        customeradpay1 = '${customerAdPay1}', customeradpay2 = '${customerAdPay2}', customeradpay3 = '${customerAdPay3}', customeradpay4 = '${customerAdPay4}',
        developeradpay1 = '${developerAdPay1}', developeradpay2 = '${developerAdPay2}', developeradpay3 = '${developerAdPay3}', developeradpay4 = '${developerAdPay4}',
        pmadpay1 = '${pmAdPay1}', pmadpay2 = '${pmAdPay2}', pmadpay3 = '${pmAdPay3}', pmadpay4 = '${pmAdPay4}',
        pm_totalProjectCost = '${pm_projectBasicCost}', pm_gst = '${pm_gst}', pm_paybleAmount = '${pm_paybleAmount}', pm_advancePayment = '${pm_advancePayment}',
        pm_balancePayment = '${pm_balancePayment}',
        customeradpaydate1 = '${customerAdPayDate1}' , customeradpaydate2 = '${customerAdPayDate2}' , customeradpaydate3 = '${customerAdPayDate3}'
        , customeradpaydate4 = '${customerAdPayDate4}',
        developeradpaydate1 = '${developerAdPayDate1}' , developeradpaydate2 = '${developerAdPayDate2}' , developeradpaydate3 = '${developerAdPayDate3}'
        , developeradpaydate4 = '${developerAdPayDate4}',
        pmadpaydate1 = '${pmAdPayDate1}' , pmadpaydate2 = '${pmAdPayDate2}' , pmadpaydate3 = '${pmAdPayDate3}'
        , pmadpaydate4 = '${pmAdPayDate4}'
         where id = '${id}'`

      const editProject = await connection(editProjectSql)
      res.redirect("/projects")
    }else{

      const editProjectSql = `UPDATE projects set projectName = '${projectName}' , customer = '${customer}' ,domain = '${domain}'
      ,projectBasicCost = '${projectBasicCost}',gst = '${gst}',paybleAmount = '${paybleAmount}',
      advancePayment = '${advancePayment}',balancePayment = '${balancePayment}' ,
      projectStatus = '${projectStatus}',Remark = '${Remark}',projectStart = '${projectStart}',
       projectEnd = '${projectEnd}',developer = '${developer}', d_projectBasicCost = '${d_projectBasicCost}',
       d_gst = '${d_gst}',d_paybleAmount = '${d_paybleAmount}', d_advancePayment = '${d_advancePayment}', 
       d_balancePayment = '${d_balancePayment}' , d_Remark = '${d_Remark}', invoiceno = '${invoiceNo}' ,
       project_manager = '${projectManager}' , 
       customeradpay1 = '${customerAdPay1}', customeradpay2 = '${customerAdPay2}', customeradpay3 = '${customerAdPay3}', customeradpay4 = '${customerAdPay4}',
       developeradpay1 = '${developerAdPay1}', developeradpay2 = '${developerAdPay2}', developeradpay3 = '${developerAdPay3}', developeradpay4 = '${developerAdPay4}',
       pmadpay1 = '${pmAdPay1}', pmadpay2 = '${pmAdPay2}', pmadpay3 = '${pmAdPay3}', pmadpay4 = '${pmAdPay4}',
       pm_totalProjectCost = '${pm_projectBasicCost}', pm_gst = '${pm_gst}', pm_paybleAmount = '${pm_paybleAmount}', pm_advancePayment = '${pm_advancePayment}',
       pm_balancePayment = '${pm_balancePayment}',
       customeradpaydate1 = '${customerAdPayDate1}' , customeradpaydate2 = '${customerAdPayDate2}' , customeradpaydate3 = '${customerAdPayDate3}'
       , customeradpaydate4 = '${customerAdPayDate4}',
       developeradpaydate1 = '${developerAdPayDate1}' , developeradpaydate2 = '${developerAdPayDate2}' , developeradpaydate3 = '${developerAdPayDate3}'
       , developeradpaydate4 = '${developerAdPayDate4}',
       pmadpaydate1 = '${pmAdPayDate1}' , pmadpaydate2 = '${pmAdPayDate2}' , pmadpaydate3 = '${pmAdPayDate3}'
       , pmadpaydate4 = '${pmAdPayDate4}'
       where id = '${id}'`

      const editProject = await connection(editProjectSql)
      res.redirect("/projects")

    }

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.deleteProject = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM projects where id="${id}"`
    const result = await connection(query)
    res.redirect("/projects")

  } catch (error) {
    console.log(error)
  }
}

module.exports.adminReadMore = async (req, res) => {
  try {
    const findProjectSql = `SELECT * FROM projects where id = '${req.params.id}'`
    var findProject = await connection(findProjectSql)
    const findProjectNameSql = `SELECT * FROM projectname where id = '${findProject[0].projectName}'`
    const findProjectName = await connection(findProjectNameSql)
    if (findProjectName.length > 0) {
      findProject[0].projectName = findProjectName[0].projectName
    } else {
      findProject[0].projectName = "null"
    }
    res.render("adminProjectReadMore.ejs", { result: findProject[0] });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};













module.exports.addProjectName = async (req, res) => {
  try {
    const sql = `SELECT * FROM projectname`
    const projectName = await connection(sql)
    res.render("add-projectName.ejs", { projectName });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



module.exports.addProjectNameSubmit = async (req, res) => {
  try {
    console.log(req.body)

    const projectName = req.body.projectName

    const sql = `INSERT INTO projectname ( id ,projectName ) VALUES ('${''}','${projectName}')`
    const result = await connection(sql)
    res.redirect("/addProjectName")


  } catch (error) {
    console.log(error)
  }

}

module.exports.editProjectName = async (req, res) => {
  try {
    const sql = `SELECT * FROM projectname where id = '${req.params.id}' `
    const result = await connection(sql)
    res.render("edit-projectName.ejs", { result: result[0] });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.editProjectNameSubmmit = async (req, res) => {
  try {
    const projectName = req.body.projectName
    const id = req.params.id
    const editProjectNameSql = `UPDATE projectname set projectName = '${projectName}'  where id = '${id}'`
    const editProjectName = await connection(editProjectNameSql)
    res.redirect("/addProjectName")
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.deleteProjectName = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM projectname where id="${id}"`
    const result = await connection(query)
    res.redirect("/addProjectName")

  } catch (error) {
    console.log(error)
  }
}






module.exports.addStatus = async (req, res) => {
  try {
    const sql = `SELECT * FROM status`
    const status = await connection(sql)
    res.render("add-status.ejs", { status });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



module.exports.addStatusSubmit = async (req, res) => {
  try {
    console.log(req.body)

    const status = req.body.status

    const sql = `INSERT INTO status ( id ,status ) VALUES ('${''}','${status}')`
    const result = await connection(sql)
    res.redirect("/addStatus")


  } catch (error) {
    console.log(error)
  }
}



module.exports.editStatus = async (req, res) => {
  try {
    const sql = `SELECT * FROM status where id = '${req.params.id}' `
    const result = await connection(sql)
    res.render("edit-status.ejs", { result: result[0] });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.editStatusSubmmit = async (req, res) => {
  try {
    const status = req.body.status
    const id = req.params.id
    const editProjectNameSql = `UPDATE status set status = '${status}'  where id = '${id}'`
    const editStatus = await connection(editProjectNameSql)
    res.redirect("/addStatus")
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports.deleteStatus = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM status where id="${id}"`
    const result = await connection(query)
    res.redirect("/addStatus")

  } catch (error) {
    console.log(error)
  }
}


exports.adminProfile = async (req, res) => {
  try {
    const token = req.cookies.adminToken
    const verifyTokenId = jwt.verify(token, "zxcvbnm");

    const findUserSql = `SELECT * FROM users where id = '${verifyTokenId.userId}'`
    const result = await connection(findUserSql)
    res.render("adminProfilePage.ejs", { result: result[0] });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


exports.changeAdminDetails = async (req, res) => {
  try {
    const token = req.cookies.adminToken
    const verifyTokenId = jwt.verify(token, "zxcvbnm");
    console.log(req.body.password)
    const email = req.body.email
    const findEmailSql = `SELECT * FROM users where email = '${email}'`
    const findEmail = await connection(findEmailSql)

    if(findEmail.length<1){
      const editPasswordSql = `UPDATE users set email = '${email}',  password = '${req.body.password}'  where id = '${verifyTokenId.userId}'`
      const editPassword = await connection(editPasswordSql)
      res.redirect("/adminProfile")
    }else{
      if(findEmail[0].type == "admin"){
        const editPasswordSql = `UPDATE users set email = '${email}',  password = '${req.body.password}'  where id = '${verifyTokenId.userId}'`
        const editPassword = await connection(editPasswordSql)
        res.redirect("/adminProfile")
      }else{
        httpMsgs.send500(req, res, "this email is already axist");

      }
    }

  
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.userDetails = async (req, res) => {
  try {
    const findUserSql = `SELECT * FROM users where id = '${req.params.id}'`
    const result = await connection(findUserSql)
    console.log(result)
    res.render("adminUserReadMore.ejs", { result: result[0] })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



module.exports.projectManager = async (req, res) => {
  try {
    const sql = `SELECT * FROM users where type = "projectManager"`
    const userData = await connection(sql)
    res.render("projectManager.ejs", { userData });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports.addProjectManager = async (req, res) => {
  try {
    // const sql = `SELECT * FROM users where type='user'`
    //   const userData = await connection(sql)
    res.render("add-projectManager.ejs");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.addProjectManagerSubmit = async (req, res) => {
  try {
    console.log(req.body)

    const name = req.body.name
    const phone_no = req.body.phone_no
    const company_name = req.body.company_name
    const address = req.body.address
    const gst_no = req.body.gst_no
    const domain = req.body.domain
    const email = req.body.email
    const password = req.body.password
    const findUserWithEmailSql = `SELECT * FROM users where email='${email}'`
    const findUserWithEmail = await connection(findUserWithEmailSql)
    //  console.log(findUserWithEmail)
    if (findUserWithEmail.length > 0) {
      httpMsgs.send500(req, res, "this email is already exist");

    } else {
      const sql = `INSERT INTO users ( id ,name, phone_no , company_name , address , gst_no , domain,email, password , status , type ) VALUES ('${''}','${name}','${phone_no}','${company_name}','${address}','${gst_no}','${domain}','${email}','${password}','${1}','${"projectManager"}')`
      const result = await connection(sql)
      res.redirect("/projectManager")
    }


  } catch (error) {
    console.log(error)
  }
}


module.exports.editProjectManager = async (req, res) => {
  try {
    const sql = `SELECT * FROM users where id = '${req.params.id}' `
    const result = await connection(sql)
    res.render("edit-projectManager.ejs", { result: result[0] });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.editProjectManagerSubmmit = async (req, res) => {
  try {

    const id = req.params.id
    const name = req.body.name
    const phone_no = req.body.phone_no
    const company_name = req.body.company_name
    const address = req.body.address
    const gst_no = req.body.gst_no
    const domain = req.body.domain
    const email = req.body.email
    const password = req.body.password
    const editProjectManagerSql = `UPDATE users set name = '${name}' , phone_no = '${phone_no}' ,company_name = '${company_name}',address = '${address}',gst_no = '${gst_no}',domain = '${domain}',email = '${email}',password = '${password}' where id = '${id}'`
    const editProjectManager = await connection(editProjectManagerSql)
    res.redirect("/projectManager")
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports.deleteProjectManager = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM users where id="${id}"`
    const result = await connection(query)
    res.redirect("/projectManager")

  } catch (error) {
    console.log(error)
  }
}













module.exports.logout = async (req, res) => {
  res.clearCookie("adminToken");
  res.clearCookie("developerToken");
  res.clearCookie("customerToken");
  res.redirect("/login");
};




