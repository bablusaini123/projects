
const app = require("../app")
const connection = app.query
console.log(connection)
const jwt = require("jsonwebtoken")



module.exports.customerDashboard = async (req, res) => {

  const customerToken = req.cookies.customerToken
  const verifyTokenId = jwt.verify(customerToken, "zxcvbnm");
  const userId = verifyTokenId.userId

  const findProjectSql = `SELECT * FROM projects where customer='${userId}'`
  const findProject = await connection(findProjectSql)
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
  console.log("findProject", findProject)
  res.render("customer_dashboard.ejs",{findProject:findProject});
};



module.exports.loginCustomerProject = async (req, res) => {
  const customerToken = req.cookies.customerToken
  const verifyTokenId = jwt.verify(customerToken, "zxcvbnm");
  const userId = verifyTokenId.userId

  const findProjectSql = `SELECT * FROM projects where customer='${userId}'`
  const findProject = await connection(findProjectSql)
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
  console.log("findProject", findProject)
  res.render("customerProjects.ejs", { projects: findProject });
};


module.exports.readMoreCustomerProject = async (req, res) => {
   const id = req.params.id
  const findProjectSql = `SELECT * FROM projects where id='${id}'`
  const findProject = await connection(findProjectSql)
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
  console.log("findProject", findProject)
  res.render("customerReadMore.ejs", { result: findProject[0] });
};


exports.customerProfile = async (req, res) => {
  try {
    const token =req.cookies.customerToken
    const verifyTokenId = jwt.verify(token, "zxcvbnm");

    const findUserSql = `SELECT * FROM users where id = '${verifyTokenId.userId}'`
    const result = await connection(findUserSql)
    console.log("cccccccc",result)
    res.render("customerProfilePage.ejs",{result:result[0]});
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

