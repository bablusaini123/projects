
const app = require("../app")
const connection = app.query
console.log(connection)
const jwt = require("jsonwebtoken")



module.exports.projectManagerDashboard = async (req, res) => {

  const projectManagerToken = req.cookies.projectManagerToken
  const verifyTokenId = jwt.verify(projectManagerToken, "zxcvbnm");
  const userId = verifyTokenId.userId

  const findProjectSql = `SELECT * FROM projects where project_manager='${userId}'`
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
  res.render("projectManager_dashboard.ejs",{findProject:findProject});
};



module.exports.loginProjectManagerProject = async (req, res) => {
  const projectManagerToken = req.cookies.projectManagerToken
  const verifyTokenId = jwt.verify(projectManagerToken, "zxcvbnm");
  const userId = verifyTokenId.userId
  console.log(userId)

  const findProjectSql = `SELECT * FROM projects where project_manager='${userId}'`
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
  res.render("projectManagerProjects.ejs", { projects: findProject });
};


module.exports.readMoreProjectManagerProject = async (req, res) => {
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
  res.render("projectManagerReadMore.ejs", { result: findProject[0] });
};


exports.projectManagerProfile = async (req, res) => {
  try {
    const projectManagerToken = req.cookies.projectManagerToken
    const verifyTokenId = jwt.verify(projectManagerToken, "zxcvbnm");
    const findUserSql = `SELECT * FROM users where id = '${verifyTokenId.userId}'`
    const result = await connection(findUserSql)
    console.log("cccccccc",result)
    res.render("projectManagerProfilePage.ejs",{result:result[0]});
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

