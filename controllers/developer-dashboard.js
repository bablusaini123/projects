
const app = require("../app")
const connection = app.query
console.log(connection)
const jwt = require("jsonwebtoken")



module.exports.developerDashboard = async (req, res) => {
  const developerToken =  req.cookies.developerToken
  const verifyTokenId = jwt.verify(developerToken, "zxcvbnm");
  const userId = verifyTokenId.userId
 console.log(userId)
  const findProjectSql = `SELECT * FROM projects where developer='${userId}'`
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
    res.render("developer_dashboard.ejs",{findProject:findProject});
  };


module.exports.loginDeveloperProjects = async (req, res) => {
    const developerToken =  req.cookies.developerToken
    const verifyTokenId = jwt.verify(developerToken, "zxcvbnm");
    const userId = verifyTokenId.userId
   console.log(userId)
    const findProjectSql = `SELECT * FROM projects where developer='${userId}'`
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
    console.log("findProject",findProject)
      res.render("developerProjects.ejs",{projects:findProject});
 };

module.exports.readMoreDeveloperProject = async (req, res) => {
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

 res.render("developerReadMore.ejs", { result: findProject[0] });
};


exports.developerProfile = async (req, res) => {
  try {
    const token =req.cookies.developerToken
    const verifyTokenId = jwt.verify(token, "zxcvbnm");

    const findUserSql = `SELECT * FROM users where id = '${verifyTokenId.userId}'`
    const result = await connection(findUserSql)
    console.log("ddddddddd",result)
    res.render("developerProfilePage.ejs",{result:result[0]});
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
    
  
