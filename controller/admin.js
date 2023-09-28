const app = require("../app")
const connection = app.query
console.log(connection)
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const httpMsgs = require("http-msgs");
const multer = require("multer");





// MULTER SETUP

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log("file", file)
    let a = file.originalname;
    //  let extname = path.extname(a);
    // if (extname === ".jpg" || extname === ".png") {
    callback(null, "./public/img");
    // } else if (extname === ".pdf") {
    //  callback(null, "./public/upload-pdf");
    // }
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + Date.now() + file.originalname);
  },
});

module.exports.upload = multer({
  storage: Storage,
});





//  LOGIN FORM

module.exports.Login = async (req, res) => {
  res.render("login.ejs", { message: "" })
}


//  LOGIN SUBMIT

module.exports.LoginSubmit = async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password
    const sql = `SELECT * FROM tb_admin where user_name='${username}'`
    const result = await connection(sql)
    console.log(result)

    if (result.length > 0) {
      let bcryptMatchPassword = await bcrypt.compare(
        password,
        result[0].password
      );
      if (bcryptMatchPassword === true) {

        if (result[0].status === 1) {
          let userId = result[0].id
          const token = jwt.sign({ userId }, "zxcvbnm")
          res.cookie("token", token)
          res.status(200).json({ message: "successfully login" })
        } else {
          httpMsgs.send500(req, res, "your account is disabled please contact admin");
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

}





module.exports.dashboard = async (req, res) => {
  try {
    const userQuery = `SELECT * FROM tb_users`
    const usersResult = await connection(userQuery)
    const contestQuery = `SELECT * FROM tb_contests where status=1`
    const contestResult = await connection(contestQuery)
    res.render("dashboard.ejs", { number: usersResult.length, activeContest: contestResult.length })
  } catch (error) {
    console.log(error)
  }
}



// LISTING SUBADMIN

module.exports.staff = async (req, res) => {

  try {
    const query = `SELECT * FROM tb_admin`
    const result = await connection(query)

    res.render("staff.ejs", { message: "", subAdmins: result })
  } catch (error) {
    console.log(error)
  }
}


// CREATE SUBADMIN


module.exports.staffSubmit = async (req, res) => {
  try {
    console.log(req.body)

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const user_name = req.body.user_name
    const email = req.body.email
    const phone = req.body.phone
    const Originalpassword = req.body.password
    let password = await bcrypt.hash(Originalpassword, 10);
    console.log(password)

    var checkUserSql = `SELECT * FROM tb_admin where user_name='${user_name}'`
    const result = await connection(checkUserSql)
    console.log("result", result)
    if (result.length < 1) {
      const sql = `INSERT INTO tb_admin (firstName,lastName,user_name,email,phone,password,role,status) VALUES ('${firstName}','${lastName}','${user_name}','${email}','${phone}','${password}','${"admin"}','${"1"}')`
      const insertDetails = await connection(sql)
      console.log(insertDetails)
      res.redirect("/staff")
    } else {
      const query = `SELECT * FROM tb_admin`
      const result2 = await connection(query)
      res.render("staff.ejs", { message: "username is already taken", subAdmins: result2 })

    }
  } catch (error) {
    console.log(error)
  }

}

// EDIT SUBADMIN

module.exports.editStaff = async (req, res) => {

  try {
    const id = req.params.id
    const query = `SELECT * FROM tb_admin`
    const subAdmins = await connection(query)
    const getSubAdminById = `SELECT * FROM tb_admin where id = '${id}'`
    const subAdmin = await connection(getSubAdminById)
    console.log(subAdmin)
    res.render("edit-staff.ejs", { message: "", subAdmins: subAdmins, subAdmin })
  } catch (error) {
    console.log(error)
  }
}



module.exports.editStaffSubmit = async (req, res) => {

  try {
    const id = req.params.id
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const phone = req.body.phone
    const getSubAdminById = `UPDATE tb_admin set firstName = '${firstName}' , lastName = '${lastName}', email = '${email}', phone = '${phone}'where id = '${id}' `
    const updateSubAdmin = await connection(getSubAdminById)
    res.redirect("/staff")
  } catch (error) {
    console.log(error)
  }
}


//  DELETE SUB ADMIN


module.exports.deleteStaff = async (req, res) => {

  try {
    const id = req.params.id
    const getSubAdminById = `DELETE FROM tb_admin where id = '${id}' `
    const updateSubAdmin = await connection(getSubAdminById)
    res.redirect("/staff")
  } catch (error) {
    console.log(error)
  }
}

// EDIT USER FORM


// module.exports.userEdit = async (req, res) => {
//     console.log(req.params.id)
//     const sql = `SELECT * FROM sonu where id='${req.params.id}'`
//     const result = await connection(sql)
//     res.render("userEdit.ejs", { user: result[0] })
// }


//CHANGE SUBADMIN STATUS SUBMIT

module.exports.changeStatusSubAdmin = async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    const query = `SELECT * FROM tb_admin where id="${id}"`
    const result = await connection(query)
    if (result[0].status === 1) {
      const updateQuery = `UPDATE tb_admin set status ="0" where id = "${id}"`
      await connection(updateQuery)
      res.redirect("/staff")


    } else {
      const updateQuery = `UPDATE tb_admin set status ="1" where id = "${id}"`
      await connection(updateQuery)

      res.redirect("/staff")

    }
  } catch (error) {
    console.log(error)
  }

}



//CHANGE USERS STATUS 

module.exports.changeStatusUser = async (req, res) => {
  try {

    const id = req.params.id
    console.log(req.url)
    const query = `SELECT * FROM tb_users where id="${id}"`
    const result = await connection(query)
    if (result[0].status === 1) {
      const updateQuery = `UPDATE tb_users set status ="0" where id = "${id}"`
      await connection(updateQuery)
      res.redirect("/users")


    } else {
      const updateQuery = `UPDATE tb_users set status ="1" where id = "${id}"`
      await connection(updateQuery)

      res.redirect("/users")

    }
  } catch (error) {
    console.log(error)
  }

}


// LISTING USERS

module.exports.users = async (req, res) => {

  try {
    const query = `SELECT * FROM tb_users`
    const result = await connection(query)

    res.render("users.ejs", { message: "", users: result.reverse() })
  } catch (error) {
    console.log(error)
  }
}




// CREATE USER


module.exports.createUser = async (req, res) => {

  try {
    const username = req.body.username
    const email = req.body.email
    const Originalpassword = req.body.password
    let password = await bcrypt.hash(Originalpassword, 10);
    console.log(password)

    var checkUserSql = `SELECT * FROM users where username='${username}'`
    const result = await connection(checkUserSql)
    if (result.length < 1) {
      var sql = `INSERT into users (username,email,password,type,role,status) VALUES('${username}','${email}','${password}','${"user"}','${"user"}','${"active"}')`
      const insertDetails = await connection(sql)
      res.redirect("/users")
    } else {
      const query = `SELECT * FROM users where type = "user"`
      const result2 = await connection(query)
      res.render("users.ejs", { message: "username is already taken", users: result2 })

    }

  } catch (error) {
    console.log(error)
  }

}




//DELETE USER 



module.exports.deleteUser = async (req, res) => {
  console.log(req.params.id)

  const sql = `DELETE FROM USERS where id='${req.params.id}'`
  const result = await connection(sql)
  res.redirect("/users")
}



// LOGOUT


module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/")
  } catch (error) {
    console.log(error)
  }
}




// CATEGORY

module.exports.category = async (req, res) => {

  try {
    const query = `SELECT * FROM tb_category`
    const result = await connection(query)
    //    console.log(result)
    res.render("category.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}



// CREATE  CATEGORY

module.exports.createCategory = async (req, res) => {

  try {
    const name = req.body.name
    console.log(req.body)
    const query = `INSERT INTO tb_category (category , status) VALUES ('${name}','1')`
    const result = await connection(query)
    res.redirect("/category")

  } catch (error) {
    console.log(error)
  }
}



// EDIT  CATEGORY


module.exports.editCategory = async (req, res) => {

  try {
    const id = req.params.id
    const query = `SELECT * FROM tb_category`
    const result = await connection(query)
    const categoryQuery = `SELECT * FROM tb_category where id = '${id}'`
    const categoryResult = await connection(categoryQuery)
    console.log(categoryResult)
    res.render("edit-category.ejs", { result: result, categoryResult: categoryResult[0] })
  } catch (error) {
    console.log(error)
  }
}


module.exports.editCategorySubmit = async (req, res) => {

  try {
    const id = req.params.id
    const cat = req.body.name

    const categoryQuery = `UPDATE tb_category set category = '${cat}'  where id = '${id}'`
    const categoryResult = await connection(categoryQuery)
    console.log(req.body)
    res.redirect("/category")
  } catch (error) {
    console.log(error)
  }
}




// CHANGE STATUS  CATEGORY

module.exports.changeStatusCategory = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `SELECT * FROM tb_category where id="${id}"`
    const result = await connection(query)

    if (result[0].status === 1) {
      const updateQuery = `UPDATE tb_category set status ="0" where id = "${id}"`
      await connection(updateQuery)
      res.redirect("/category")

    } else {
      const updateQuery = `UPDATE tb_category set status = "1" where id = "${id}"`
      await connection(updateQuery)
      res.redirect("/category")
    }
  } catch (error) {
    console.log(error)
  }
}


// DELETE CATEGORI

module.exports.deleteCategori = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM tb_category where id="${id}"`
    const result = await connection(query)
    res.redirect("/category")

  } catch (error) {
    console.log(error)
  }
}

// CONTEST

module.exports.contest = async (req, res) => {

  try {
    const sql = `SELECT * FROM tb_contests`
    const result = await connection(sql)
    // console.log(result)

    res.render("contest.ejs", { contests: result })
  } catch (error) {
    console.log(error)
  }
}



// CREATE CONTEST

module.exports.addContest = async (req, res) => {

  try {
    const sql = `SELECT * FROM tb_category where status = '1'`
    const result = await connection(sql)


    res.render("add-contest.ejs", { result })
  } catch (error) {
    console.log(error)
  }
}


// CREATE CONTEST SUBMIT



module.exports.addContestSubmit = async (req, res) => {

  try {
    console.log(req.files)
    const category = req.body.category
    const name = req.body.name
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const endTime = req.body.endTime
    const description = req.body.description
    const questions = req.body.questions


    // CREATE CONTEST 

    const sql = `INSERT into tb_contests (id,category,name,description,startDate,endDate,endTime,status,isComplete) VALUES ('${''}','${category}','${name}','${description}','${startDate}','${endDate}','${endTime}','${"1"}','${"0"}')`
    const result = await connection(sql)

    console.log("result", result)

    // CREATE QUESTIONS

    console.log(typeof questions)

    if (typeof questions !== "string") {
      console.log("ifff")
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i]

        const options = 'schoolcontact' + i;
        const asnwers = req.body["answers"]
        var allAptions = req.body[options]
        console.log("allAptions", allAptions)
        if (typeof allAptions === "string") {
          allAptions = [allAptions]
        }

        console.log("allAptions", allAptions)

        if (req.body.questionsType[i] === "0") {
          const createQuestionSql = `INSERT into tb_questions (id,contest_id,question,option1,option2,option3,option4,option5,option6,option7,answer,type) VALUES ('${''}','${result.insertId}','${question}','${allAptions[0]}','${allAptions[1]}','${allAptions[2]}','${allAptions[3]}','${allAptions[4]}','${allAptions[5]}','${allAptions[6]}','${asnwers[i]}','${0}')`
          await connection(createQuestionSql)

        } else {
          const createQuestionSql = `INSERT into tb_questions (id,contest_id,question,answer,type) VALUES ('${''}','${result.insertId}','${question}','${asnwers[i]}','${1}')`
          await connection(createQuestionSql)

        }


      }
    } else {

      console.log("else")
      const options = 'schoolcontact0';
      const asnwers = req.body["answers"]
      var allAptions = req.body[options]
      console.log("allAptions", allAptions)
      if (typeof allAptions === "string") {
        allAptions = [allAptions]
      }
      console.log("allAptions", allAptions)
      if (req.body.questionsType === "0") {
        const createQuestionSql = `INSERT into tb_questions (id,contest_id,question,option1,option2,option3,option4,option5,option6,option7,answer,type) VALUES ('${''}','${result.insertId}','${questions}','${allAptions[0]}','${allAptions[1]}','${allAptions[2]}','${allAptions[3]}','${allAptions[4]}','${allAptions[5]}','${allAptions[6]}','${asnwers}','${0}')`
        await connection(createQuestionSql)

      } else {
        const createQuestionSql = `INSERT into tb_questions (id,contest_id,question,answer,type) VALUES ('${''}','${result.insertId}','${questions}','${asnwers}','${1}')`
        await connection(createQuestionSql)

      }


    }


    // CREATE PRICE

    if (typeof req.body.price !== "string") {
      for (let i = 0; i < req.body.price.length; i++) {

        const createQuestionSql = `INSERT into tb_contest_price (id,contest_id,price,code,url,rank) VALUES ('${''}','${result.insertId}','${req.body.price[i]}','${req.body.code[i]}','${req.body.url[i]}','${req.body.rank[i]}')`
        await connection(createQuestionSql)

      }
    } else {

      const createQuestionSql = `INSERT into tb_contest_price (id,contest_id,price,code,url,rank) VALUES ('${''}','${result.insertId}','${req.body.price}','${req.body.code}','${req.body.url}','${req.body.rank}')`
      await connection(createQuestionSql)
    }


    // CREATE SPONSERS
    console.log("tttt", typeof req.body.sName == "string")
    if (typeof req.body.sName !== "string") {
      console.log('iiiiii')
      for (let i = 0; i < req.body.sName.length; i++) {

        const createQuestionSql = `INSERT into tb_contest_sponsors (id,contest_id,sName,sUrl) VALUES ('${''}','${result.insertId}','${req.body.sName[i]}','${req.body.sUrl[i]}')`
        await connection(createQuestionSql)

      }
    } else {
      console.log('jjjjjjj')
      const createQuestionSql = `INSERT into tb_contest_sponsors (id,contest_id,sName,sUrl) VALUES ('${''}','${result.insertId}','${req.body.sName}','${req.body.sUrl}')`
      await connection(createQuestionSql)
    }

    res.redirect("/contest")

  } catch (error) {
    console.log(error)
  }
}


// CHANGE STATUS OF CONTEST

module.exports.changeStatusContest = async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    const query = `SELECT * FROM tb_contests where id=${id}`
    const result = await connection(query)
    console.log(result)
    if (result[0].status === 1) {
      const updateQuery = `UPDATE tb_contests set status =0 where id = "${id}"`
      await connection(updateQuery)
      res.redirect("/contest")
    } else {
      const updateQuery = `UPDATE tb_contests set status =1 where id = "${id}"`
      await connection(updateQuery)

      res.redirect("/contest")

    }
  } catch (error) {
    console.log(error)
  }

}


// EDIT CONTEST

module.exports.editContest = async (req, res) => {

  try {
    const sql = `SELECT * FROM tb_contests where id = '${req.params.id}'`
    const result = await connection(sql)
    //  console.log(result)
    const priceSql = `SELECT * FROM tb_contest_price where contest_id = '${req.params.id}'`
    const priceData = await connection(priceSql)
    const sponserSql = `SELECT * FROM tb_contest_sponsors where contest_id = '${req.params.id}'`
    const sponserData = await connection(sponserSql)
    const categorySql = `SELECT * FROM tb_category`
    const categoryData = await connection(categorySql)

    res.render("edit-contest.ejs", { contestDetails: result[0], priceData, sponserData, categoryData })
  } catch (error) {
    console.log(error)
  }
}



module.exports.editContestSubmit = async (req, res) => {

  try {
    console.log(req.body)
    const category = req.body.category
    const name = req.body.name
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const endTime = req.body.endTime
    const description = req.body.description
    var questions = req.body["questions"]
    const id = req.params.id


    // UPDATE CONTEST 

    const sql = `UPDATE tb_contests set category ='${category}', name = '${name}',description = '${description}',startDate = '${startDate}',endDate = '${endDate}',endTime = '${endTime}' where id= '${id}'`
    const result = await connection(sql)



    // UPDATE QUESTIONS

    const findQuestionSql = `SELECT * FROM tb_questions where contest_id ='${id}'`
    const findQuestion = await connection(findQuestionSql)
    //  console.log("questions",findQuestion)



    if (typeof questions !== "string") {
      if (findQuestion.length === questions.length) {
        console.log("ifff")
        for (let i = 0; i < questions.length; i++) {
          const question = questions[i]

          const options = 'schoolcontact' + i;
          const asnwers = req.body["answers"]
          var allAptions = req.body[options]
          console.log("allAptions", allAptions)
          if (typeof allAptions === "string") {
            allAptions = [allAptions]
          }

          console.log("allAptions", allAptions)

          if (req.body.questionsType[i] === "0") {
            const createQuestionSql = `UPDATE tb_questions set question = '${question}',option1 = '${allAptions[0]}',option2 = '${allAptions[1]}',option3 = '${allAptions[2]}',option4 = '${allAptions[3]}',option5 = '${allAptions[4]}',option6 = '${allAptions[5]}',option7 = '${allAptions[6]}',type = '${0}' where id = '${findQuestion[i].id}'`
            await connection(createQuestionSql)

          } else {
            const createQuestionSql = `UPDATE tb_questions set question = '${question}', option1 = '${null}', option2 = '${null}', option3 = '${null}', option4 = '${null}', option5 = '${null}', option6 = '${null}', option7 = '${null}',type = '${1}' where id = '${findQuestion[i].id}'`
            await connection(createQuestionSql)

          }

        }
      }
      else if (findQuestion.length > questions.length) {
        console.log("else iiiiiffffff", questions.length)

        for (let i = 0; i < findQuestion.length; i++) {
          const question = questions[i]
          console.log("questionss", question)
          const options = 'schoolcontact' + i;
          const asnwers = req.body["answers"]
          var allAptions = req.body[options]
          console.log("allAptions", allAptions)
          if (typeof allAptions === "string") {
            allAptions = [allAptions]
          }

          console.log("allAptions", allAptions)

          if (i + 1 <= questions.length) {

            if (req.body.questionsType[i] === "0") {
              console.log("type 0")
              const createQuestionSql = `UPDATE tb_questions set question = '${question}',option1 = '${allAptions[0]}',option2 = '${allAptions[1]}',option3 = '${allAptions[2]}',option4 = '${allAptions[3]}',option5 = '${allAptions[4]}',option6 = '${allAptions[5]}',option7 = '${allAptions[6]}',type = '${0}' where id = '${findQuestion[i].id}'`
              await connection(createQuestionSql)

            } else {
              console.log("type 1")
              const createQuestionSql = `UPDATE tb_questions set question = '${question}', option1 = '${null}', option2 = '${null}', option3 = '${null}', option4 = '${null}', option5 = '${null}', option6 = '${null}', option7 = '${null}',answer = '${asnwers[i]}',type = '${1}' where id = '${findQuestion[i].id}'`
              await connection(createQuestionSql)

            }
          } else {
            console.log("type delete", i)
            const deleteQuestionSql = `DELETE FROM tb_questions where id = '${findQuestion[i].id}'`
            const deletrQuestion = await connection(deleteQuestionSql)
          }


        }
      }
      else if (findQuestion.length < questions.length) {
        console.log("else iiiiiffffff", questions.length)

        for (let i = 0; i < questions.length; i++) {
          const question = questions[i]
          console.log("questionss", question)
          const options = 'schoolcontact' + i;
          const asnwers = req.body["answers"]
          var allAptions = req.body[options]
          console.log("allAptions", allAptions)
          if (typeof allAptions === "string") {
            allAptions = [allAptions]
          }

          console.log("allAptions", allAptions)
          if (i + 1 <= findQuestion.length) {


            if (req.body.questionsType[i] === "0") {
              console.log("type 0")
              const createQuestionSql = `UPDATE tb_questions set question = '${question}',option1 = '${allAptions[0]}',option2 = '${allAptions[1]}',option3 = '${allAptions[2]}',option4 = '${allAptions[3]}',option5 = '${allAptions[4]}',option6 = '${allAptions[5]}',option7 = '${allAptions[6]}',type = '${0}' where id = '${findQuestion[i].id}'`
              await connection(createQuestionSql)

            } else {
              console.log("type 1")
              const createQuestionSql = `UPDATE tb_questions set question = '${question}', option1 = '${null}', option2 = '${null}', option3 = '${null}', option4 = '${null}', option5 = '${null}', option6 = '${null}', option7 = '${null}',answer = '${asnwers[i]}',type = '${1}' where id = '${findQuestion[i].id}'`
              await connection(createQuestionSql)

            }
          } else {
            if (req.body.questionsType[i] === "0") {
              const createQuestionSql = `INSERT into tb_questions (id,contest_id,question,option1,option2,option3,option4,option5,option6,option7,answer,type) VALUES ('${''}','${id}','${question}','${allAptions[0]}','${allAptions[1]}','${allAptions[2]}','${allAptions[3]}','${allAptions[4]}','${allAptions[5]}','${allAptions[6]}','${asnwers[i]}','${0}')`
              await connection(createQuestionSql)

            } else {
              const createQuestionSql = `INSERT into tb_questions (id,contest_id,question,answer,type) VALUES ('${''}','${id}','${question}','${asnwers[i]}','${1}')`
              await connection(createQuestionSql)

            }
          }


        }
      }

    } else {
      const options = 'schoolcontact0';
      const asnwers = req.body["answers"]
      var allAptions = req.body[options]
      if (questions.length < 1) {
        if (req.body.questionsType === "0") {
          const createQuestionSql = `INSERT into tb_questions (id,contest_id,question,option1,option2,option3,option4,option5,option6,option7,answer,type) VALUES ('${''}','${id}','${questions}','${allAptions[0]}','${allAptions[1]}','${allAptions[2]}','${allAptions[3]}','${allAptions[4]}','${allAptions[5]}','${allAptions[6]}','${asnwers}','${0}')`
          await connection(createQuestionSql)

        } else {
          const createQuestionSql = `INSERT into tb_questions (id,contest_id,question,answer,type) VALUES ('${''}','${id}','${questions}','${asnwers}','${1}')`
          await connection(createQuestionSql)

        }
      } else {

        if (typeof req.body.questions === "string") {
          questions = [questions]
        }

        if (findQuestion.length === questions.length) {
          if (req.body.questionsType === "0") {
            console.log("type 0")
            const createQuestionSql = `UPDATE tb_questions set question = '${questions[0]}',option1 = '${allAptions[0]}',option2 = '${allAptions[1]}',option3 = '${allAptions[2]}',option4 = '${allAptions[3]}',option5 = '${allAptions[4]}',option6 = '${allAptions[5]}',option7 = '${allAptions[6]}',type = '${0}' where id = '${findQuestion[0].id}'`
            await connection(createQuestionSql)

          } else {
            console.log("type 1")
            const createQuestionSql = `UPDATE tb_questions set question = '${questions[0]}', option1 = '${null}', option2 = '${null}', option3 = '${null}', option4 = '${null}', option5 = '${null}', option6 = '${null}', option7 = '${null}',answer = '${asnwers}',type = '${1}' where id = '${findQuestion[0].id}'`
            await connection(createQuestionSql)

          }
        } else if (findQuestion.length > questions.length) {
          for (let i = 0; i < findQuestion.length; i++) {
            if (i + 1 <= questions.length) {
              if (req.body.questionsType === "0") {
                console.log("type 0")
                const createQuestionSql = `UPDATE tb_questions set question = '${questions[0]}',option1 = '${allAptions[0]}',option2 = '${allAptions[1]}',option3 = '${allAptions[2]}',option4 = '${allAptions[3]}',option5 = '${allAptions[4]}',option6 = '${allAptions[5]}',option7 = '${allAptions[6]}',type = '${0}' where id = '${findQuestion[i].id}'`
                await connection(createQuestionSql)

              } else {
                console.log("type 1")
                const createQuestionSql = `UPDATE tb_questions set question = '${questions[0]}', option1 = '${null}', option2 = '${null}', option3 = '${null}', option4 = '${null}', option5 = '${null}', option6 = '${null}', option7 = '${null}',answer = '${asnwers}',type = '${1}' where id = '${findQuestion[i].id}'`
                await connection(createQuestionSql)

              }
            } else {
              const deleteQuestionSql = `DELETE FROM tb_questions where id = '${findQuestion[i].id}'`
              const deletrQuestion = await connection(deleteQuestionSql)
            }


          }
        }

      }


    }





    // UPDATE PRICE
    var price = req.body["price"]

    const findPriceSql = `SELECT * FROM tb_contest_price where contest_id ='${id}'`
    const findPriceData = await connection(findPriceSql)

    console.log("findPriceData", findPriceData)

    if (typeof req.body.price !== "string") {
      if (findPriceData.length === req.body.price.length) {
        console.log("equel condition")
        for (let i = 0; i < findPriceData.length; i++) {
          console.log("iiiiiiiiiiiiii", i)
          const createQuestionSql = `UPDATE tb_contest_price set price = '${req.body.price[i]}',code = '${req.body.code[i]}',url = '${req.body.url[i]}',rank = '${req.body.rank[i]}' where id = '${findPriceData[i].id}'`
          await connection(createQuestionSql)

        }
      }
      else if (findPriceData.length > req.body.price.length) {
        for (let i = 0; i < findPriceData.length; i++) {
          if (i + 1 <= req.body.price.length) {
            const createQuestionSql = `UPDATE tb_contest_price set price = '${req.body.price[i]}',code = '${req.body.code[i]}',url = '${req.body.url[i]}',rank = '${req.body.rank[i]}' where id = '${findPriceData[i].id}'`
            await connection(createQuestionSql)
          } else {
            const deletePriceSql = `DELETE FROM tb_contest_price where id ='${findPriceData[i].id}'`
            const deletrPrice = await connection(deletePriceSql)
          }


        }
      }
      else if (findPriceData.length < req.body.price.length) {
        for (let i = 0; i < req.body.price.length; i++) {
          if (i + 1 <= findPriceData.length) {
            const updatePriceSql = `UPDATE tb_contest_price set price = '${req.body.price[i]}',code = '${req.body.code[i]}',url = '${req.body.url[i]}',rank = '${req.body.rank[i]}' where id = '${findPriceData[i].id}'`
            await connection(updatePriceSql)
          } else {
            const insertPriceSql = `INSERT into tb_contest_price (id,contest_id,price,code,url,rank) VALUES ('${''}','${id}','${req.body.price[i]}','${req.body.code[i]}','${req.body.url[i]}','${req.body.rank[i]}')`
            await connection(insertPriceSql)
          }


        }
      }

    }
    else {
      if (findPriceData.length < 1) {
        const createQuestionSql = `INSERT into tb_contest_price (id,contest_id,price,code,url,rank) VALUES ('${''}','${id}','${req.body.price}','${req.body.code}','${req.body.url}','${req.body.rank}')`
        await connection(createQuestionSql)
      } else {

        if (typeof req.body.price === "string") {
          price = [price]
        }

        if (findPriceData.length === price.length) {
          const createQuestionSql = `UPDATE tb_contest_price set price = '${req.body.price}',code = '${req.body.code}',url = '${req.body.url}',rank = '${req.body.rank}' where id = '${findPriceData[0].id}'`
          await connection(createQuestionSql)
        } else if (findPriceData.length > price.length) {
          for (let i = 0; i < findPriceData.length; i++) {
            if (i + 1 <= price.length) {
              const updatePriceSql = `UPDATE tb_contest_price set price = '${req.body.price}',code = '${req.body.code}',url = '${req.body.url}',rank = '${req.body.rank}' where id = '${findPriceData[i].id}'`
              await connection(updatePriceSql)
            } else {
              const deletePriceSql = `DELETE FROM tb_contest_price where id ='${findPriceData[i].id}'`
              const deletrPrice = await connection(deletePriceSql)
            }


          }
        }

      }


    }




    // UPDATE SPONSERS

    var sName = req.body["sName"]
    const findSponserSql = `SELECT * FROM tb_contest_sponsors where contest_id ='${id}'`
    const findSponserData = await connection(findSponserSql)

    console.log("findSponserData", findSponserData)

    if (typeof req.body.sName !== "string") {
      if (findSponserData.length === req.body.sName.length) {
        console.log("equel condition")
        for (let i = 0; i < findSponserData.length; i++) {
          console.log("iiiiiiiiiiiiii", i)
          const createQuestionSql = `UPDATE tb_contest_sponsors set sName = '${req.body.sName[i]}',sUrl = '${req.body.sUrl[i]}' where id = '${findSponserData[i].id}'`
          await connection(createQuestionSql)

        }
      }
      else if (findSponserData.length > req.body.sName.length) {
        for (let i = 0; i < findSponserData.length; i++) {
          if (i + 1 <= req.body.sName.length) {
            const createQuestionSql = `UPDATE tb_contest_sponsors set sName = '${req.body.sName[i]}',sUrl = '${req.body.sUrl[i]}' where id = '${findSponserData[i].id}'`
            await connection(createQuestionSql)
          } else {
            const deleteSponserSql = `DELETE FROM tb_contest_sponsors where id ='${findSponserData[i].id}'`
            const deletrSponser = await connection(deleteSponserSql)
          }


        }
      }
      else if (findSponserData.length < req.body.sName.length) {
        for (let i = 0; i < req.body.sName.length; i++) {
          if (i + 1 <= findSponserData.length) {
            const updateSponserSql = `UPDATE tb_contest_sponsors set sName = '${req.body.sName[i]}',sUrl = '${req.body.sUrl[i]}' where id = '${findSponserData[i].id}'`
            await connection(updateSponserSql)
          } else {
            const insertSponserSql = `INSERT into tb_contest_sponsors (id,contest_id,sName,sUrl) VALUES ('${''}','${id}','${req.body.sName[i]}','${req.body.sUrl[i]}')`
            await connection(insertSponserSql)
          }


        }
      }

    } else {
      if (findSponserData.length < 1) {
        const createSponserSql = `INSERT into tb_contest_sponsors (id,contest_id,sName,sUrl) VALUES ('${''}','${id}','${req.body.sName}','${req.body.sUrl}')`
        await connection(createSponserSql)
      } else {

        if (typeof req.body.sName === "string") {
          sName = [sName]
        }

        if (findSponserData.length === sName.length) {
          const editS = `UPDATE tb_contest_sponsors set sName = '${req.body.sName}',sUrl = '${req.body.sUrl}' where id = '${findSponserData[0].id}'`
          await connection(editS)
        } else if (findSponserData.length > sName.length) {
          for (let i = 0; i < findSponserData.length; i++) {
            if (i + 1 <= price.length) {
              const editS = `UPDATE tb_contest_sponsors set sName = '${req.body.sName}',sUrl = '${req.body.sUrl}' where id = '${findSponserData[i].id}'`
              await connection(editS)
            } else {
              const deleteSponserSql = `DELETE FROM tb_contest_sponsors where id ='${findSponserData[i].id}'`
              const deletrSponser = await connection(deleteSponserSql)
            }


          }
        }

      }


    }


    res.redirect("/contest")

  } catch (error) {
    console.log(error)
  }
}



// GET  CONTEST DETAILS

module.exports.getContest = async (req, res) => {

  try {
    const sql = `SELECT * FROM tb_contests where id = '${req.params.id}'`
    const result = await connection(sql)
    const priceSql = `SELECT * FROM tb_contest_price where contest_id = '${req.params.id}'`
    const priceData = await connection(priceSql)
    const sponserSql = `SELECT * FROM tb_contest_sponsors where contest_id = '${req.params.id}'`
    const sponserData = await connection(sponserSql)
    const questionSql = `SELECT * FROM tb_questions where contest_id = '${req.params.id}'`
    const questionData = await connection(questionSql)
    //  console.log(questionData)
    res.status(200).json({
      contestDetails: result[0],
      priceData: priceData,
      sponserData: sponserData,
      questionData: questionData
    })

  } catch (error) {
    console.log(error)
  }
}


// DELETE CONTEST

module.exports.deleteContest = async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM tb_contests where id=${id}`
    await connection(query)
    res.redirect("/contest")

  } catch (error) {
    console.log(error)
  }

}



//  TIMEZONE

module.exports.timezone = async (req, res) => {

  try {


    const sql = `SELECT * FROM timezone_list`
    const timezones = await connection(sql)
    const sql2 = `SELECT * FROM tb_timezone`
    const currentTimezone = await connection(sql2)
    console.log(currentTimezone)

    res.render("timezone.ejs", { timezones, currentTimezone })
  } catch (error) {
    console.log(error)
  }
}



// UPDATE TIMEZONE

module.exports.timezoneedit = async (req, res) => {

  try {
    const name = req.body.timezone

    const sql = `UPDATE TB_timezone set name = '${name}' where id = '${1}'`
    const timezones = await connection(sql)
    res.redirect("/timezone")
  } catch (error) {
    console.log(error)
  }
}

//  USER REPORT

module.exports.userReport = async (req, res) => {

  try {
    res.render("user-report.ejs")
  } catch (error) {
    console.log(error)
  }
}


//  UPDATE ANSWER

module.exports.editAnswer = async (req, res) => {

  try {
    const id = req.params.id
    // console.log(id)
    const findContestSql = `SELECT * FROM tb_contests where id = '${id}'`
    const contestData = await connection(findContestSql)
    const findQuestionSql = `SELECT * FROM tb_questions where contest_id = '${id}'`
    const questionData = await connection(findQuestionSql)
    // console.log("contestData",contestData)
    // console.log("questionData",questionData)
    res.render("edit-answer.ejs", { questionData, contestData })
  } catch (error) {
    console.log(error)
  }
}


//  UPDATE ANSWER SUBMIT


module.exports.editAnswerSubmit = async (req, res) => {

  try {
    const id = req.params.id
    const newAnswer = req.body.answers
    console.log("req.body", req.body)

    const findQuestionSql = `SELECT * FROM tb_questions where contest_id = '${id}'`
    const questionData = await connection(findQuestionSql)

    if (typeof newAnswer !== 'string') {
      for (let i = 0; i < questionData.length; i++) {
        const element = questionData[i];
        const updateAnswerSql = `UPDATE tb_questions SET answer = '${newAnswer[i]}' where id = '${element.id}'`
        const updateAnswer = await connection(updateAnswerSql)
      }
      const updateIscompleteStatusSql = `UPDATE tb_contests SET isComplete = '1' where id = '${id}'`
      const updateIsCompleteStatus = await connection(updateIscompleteStatusSql)
      console.log("questionData", questionData)
      res.redirect("/contest")
    } else {

      const element = questionData[0];
      const updateAnswerSql = `UPDATE tb_questions SET answer = '${newAnswer}' where id = '${element.id}'`
      const updateAnswer = await connection(updateAnswerSql)
      const updateIscompleteStatusSql = `UPDATE tb_contests SET isComplete = '1' where id = '${id}'`
      const updateIsCompleteStatus = await connection(updateIscompleteStatusSql)
      console.log("questionData", questionData)
      res.redirect("/contest")
    }


  } catch (error) {
    console.log(error)
  }
}



//  USER REPORT

module.exports.contestReport = async (req, res) => {

  try {
    res.render("contest-report.ejs")
  } catch (error) {
    console.log(error)
  }
}


//  GENERAL SETTING

module.exports.generalSetting = async (req, res) => {

  try {
    const fetchAllDetailsSql = `SELECT * FROM tb_seo`
    const allDetails = await connection(fetchAllDetailsSql)
   // console.log(allDetails)
    res.render("general-setting.ejs", {allDetails:allDetails[0]})
  } catch (error) {
    console.log(error)
  }
}



module.exports.generalSettingSubmit = async (req, res) => {

  try {
    console.log(req.body)
   //// console.log("file",req.files)
    const fetchAllDetailsSql = `SELECT * FROM tb_seo`
    const allDetails = await connection(fetchAllDetailsSql)
    if(req.files.logo || req.files.icon || req.files.sinupBanner || req.files.resultBanner || req.files.contactBanner ||req.files.resetPassword){
      let logoImage =  allDetails[0].logo
      let iconImage =  allDetails[0].icon
      let sinupBannerImage =  allDetails[0].sinupBanner
      let resultBannerImage =   allDetails[0].resultBanner
      let contactBannerImage = allDetails[0].contactBanner
      let resetPasswordImage =   allDetails[0].resetPassword
  
      if(req.files.logo){
        logoImage =req.files.logo[0].filename 
      }
      if(req.files.icon){
        iconImage = req.files.icon[0].filename
       
      }
      if(req.files.sinupBanner){
        sinupBannerImage = req.files.sinupBanner[0].filename
       
      }
      if(req.files.resultBanner){
        resultBannerImage = req.files.resultBanner[0].filename
      
      }
      if(req.files.contactBanner){
        contactBannerImage = req.files.contactBanner[0].filename
        
      }
      if(req.files.resetPassword){
        resetPasswordImage = req.files.resetPassword[0].filename
       
      }
  
      // console.log("logoImage",logoImage)
      // console.log("iconImage",iconImage)
      // console.log("sinupBannerImage",sinupBannerImage)
      // console.log("resultBannerImage",resultBannerImage)
      // console.log("contactBannerImage",contactBannerImage)
      // console.log("resetPasswordImage",resetPasswordImage)

        const sql = `UPDATE tb_seo set busiName = '${req.body.busiName}', phoneNo = '${req.body.phoneNo}', faxNo = '${req.body.faxNo}' , email = '${req.body.email}' , website = '${req.body.website}' , logo = '${logoImage}' , icon = '${iconImage}' , sinupBanner = '${sinupBannerImage}', resultBanner = '${resultBannerImage}', contactBanner ='${contactBannerImage}', resetPassword = '${resetPasswordImage}', facebook = '${req.body.facebook}' , twitter = '${req.body.twitter}' , instagram = '${req.body.instagram}' , linkedin = '${req.body.linkedin}' , pintrest = '${req.body.pintrest}', gplus = '${req.body.gplus}' where id = ${allDetails[0].id} `
        await connection(sql)
        res.redirect("/generalSetting")
    }else{
      const sql = `UPDATE tb_seo set busiName = '${req.body.busiName}', phoneNo = '${req.body.phoneNo}', faxNo = '${req.body.faxNo}' , email = '${req.body.email}' , website = '${req.body.website}', facebook = '${req.body.facebook}' , twitter = '${req.body.twitter}' , instagram = '${req.body.instagram}' , linkedin = '${req.body.linkedin}' , pintrest = '${req.body.pintrest}', gplus = '${req.body.gplus}' where id = ${allDetails[0].id} `
      await connection(sql)
      res.redirect("/generalSetting")
    }
   

//const sql = `INSERT INTO tb_seo (id , busiName , phoneNo , faxNo , email , website , logo , icon , sinupBanner , resultBanner , contactBanner , resetPassword , facebook , twitter  , instagram , linkedin , pintrest , gplus) VALUES ('${''}','${res.body.busiName}','${res.body.phoneNo}','${res.body.faxNo}','${req.body.email}','${req.body.website}','${req.files.logo.filename}','${req.files.icon.filename}','${req.files.sinupBanner.filename}','${req.files.resultBanner.filename}','${req.files.contactBanner.filename}','${req.files.resetPassword.filename}','${req.body.facebook}','${req.body.twitter}','${req.body.instagram}','${req.body.linkedin}','${req.body.pintrest}','${req.body.gplus}')`

  } catch (error) {
    console.log(error)
  }
}


//  MANAGE STATIC PAGE

module.exports.manageStaticPage = async (req, res) => {

  try {
    const fetchAllDetailsSql = `SELECT * FROM tb_qhse`
    const allDetails = await connection(fetchAllDetailsSql)
   // console.log(allDetails)
    res.render("manage-static-page.ejs", {allDetails:allDetails})
  } catch (error) {
    console.log(error)
  }
}


//  MANAGE STATIC PAGE

module.exports.editStaticPage = async (req, res) => {

  try {
    const id = req.params.id
    const fetchAllDetailsSql = `SELECT * FROM tb_qhse where id = '${id}'`
    const allDetails = await connection(fetchAllDetailsSql)
   // console.log(allDetails)
    res.render("edit-static-page.ejs",{allDetails:allDetails[0]})
  } catch (error) {
    console.log(error)
  }
}


module.exports.editStaticPageSubmit = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    console.log(req.body.dec)
    console.log(req.files)
    if(req.files.image){
      const updateSql = `UPDATE tb_qhse set title = '${req.body.title}' ,description = '${req.body.dec}', photo = '${req.files.image[0].filename}' where id = '${id}' `
      const allDetails = await connection(updateSql)
      res.redirect("/manageStaticPage")
    }else{
     const updateSql = `UPDATE tb_qhse set title = '${req.body.title}', description = '${req.body.dec}' where id = ${id}`
     const allDetails = await connection(updateSql)
     res.redirect("/manageStaticPage")
    }
   
   // console.log(allDetails)
 
  } catch (error) {
    console.log(error)
  }
}
