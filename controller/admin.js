const app = require("../app")
const connection = app.query
console.log(connection)
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const httpMsgs = require("http-msgs");
const multer = require("multer");
const otpGenerator = require("otp-generator");





// MULTER SETUP

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    //  console.log("file", file)
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

    res.render("dashboard.ejs")
  } catch (error) {
    console.log(error)
  }
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


// MANU LIST


module.exports.menuList = async (req, res) => {
  try {
    const sql = `SELECT * FROM menu_list`
    const result = await connection(sql)
  // res.json({message:result})
    res.render("menuList.ejs", { result: result.reverse() })
  } catch (error) {
    console.log(error)
  }
}




// ADD  MANU


module.exports.addMenu = async (req, res) => {
  try {
    const findMenuList = `SELECT * FROM menu_list`
    const result = await connection(findMenuList)
    res.render("addMenu.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}


// ADD  MANU SUBMIT


module.exports.addMenuSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const category = req.body.category
    const name = req.body.name
    const url = req.body.url
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // CREATE SLUG

    let slug = name.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    const findSlugSql = `SELECT * FROM menu_list where name = '${name}'`
    const findSlug = await connection(findSlugSql)
    if (findSlug.length > 0) {
      let rendom = Math.floor(1000 + Math.random() * 9000);
      slug = slug + "-" + rendom;
    }

    if (category == 'null') {
      const sql = `INSERT INTO menu_list (id ,generateId , category , name , url , level , status , slug ) VALUES ('','${generateId}','${category}','${name}','${url}','0','1', '${slug}')`
      await connection(sql)
      res.redirect("/menuList")
    } else {
      const findLevelSql = `SELECT * FROM menu_list where id = '${category}'`
      const result = await connection(findLevelSql)
      console.log(result)
      const sql = `INSERT INTO menu_list (id ,generateId, category , name , url , level , status ,slug ) VALUES ('','${generateId}','${category}','${name}','${url}','${result[0].level + 1}','1' , '${slug}')`
      await connection(sql)
      res.redirect("/menuList")
    }

  } catch (error) {
    console.log(error)
  }
}


// EDIT MENU LIST


module.exports.editMenuList = async (req, res) => {
  try {
    const id = req.params.id
    const sql = `SELECT * FROM menu_list`
    const result = await connection(sql)
    const findMenuByIdSql = `SELECT * FROM menu_list where generateId = '${id}'`
    const menuById = await connection(findMenuByIdSql)
    //  console.log(result.reverse())
    res.render("editMenu.ejs", { result: result.reverse(), menuById: menuById[0] })

     
  } catch (error) {
    console.log(error)
  }
}

// EDIT MENU SUBMIT


module.exports.editMenuListSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const name = req.body.name
    const url = req.body.url
    const category = req.body.category
    console.log(req.body, id)

    // CREATE SLUG

    let slug = name.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    console.log("slug", slug)
    const findSlugSql = `SELECT * FROM menu_list where slug = '${slug}'`
    const findSlug = await connection(findSlugSql)

    if (findSlug.length > 0) {
      if (findSlug[0].generateId == id) {

      } else {
        let rendom = Math.floor(1000 + Math.random() * 9000);
        slug = slug + "-" + rendom;
      }

    }

    const sql = `UPDATE menu_list set name = '${name}', url = '${url}' , slug = '${slug}'  where generateId = '${id}'`
    const result = await connection(sql)
    res.redirect("/menuList")



  } catch (error) {
    console.log(error)
  }
}

// EDIT MENU SUBMIT


module.exports.changeStatusMenu = async (req, res) => {
  try {
    const id = req.params.id
    const findMenuByIdSql = `SELECT * FROM menu_list where id = '${id}'`
    const menuById = await connection(findMenuByIdSql)
    if (menuById[0].status == 0) {
      const sql = `UPDATE menu_list set  status = '${1}'  where id = '${id}'`
      const result = await connection(sql)
      res.redirect("/menuList")
    } else {
      const sql = `UPDATE menu_list set  status = '${0}'  where id = '${id}'`
      const result = await connection(sql)
      res.redirect("/menuList")
    }

  } catch (error) {
    console.log(error)
  }
}

// DELETE MENU

module.exports.deleteMenu = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM menu_list where id="${id}"`
    const result = await connection(query)
    res.redirect("/menuList")

  } catch (error) {
    console.log(error)
  }
}



// FOOTER  TITLE


module.exports.footerTitle = async (req, res) => {
  try {
    const findMenuList = `SELECT * FROM footer_title`
    const result = await connection(findMenuList)
    res.render("footerTitle.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}



// EDIT FOOTER  TITLE


module.exports.editFooterTitle = async (req, res) => {
  try {
    const id = req.params.id
    const findMenuList = `SELECT * FROM footer_title where id = '${id}'`
    const result = await connection(findMenuList)
    res.render("editFooterTitle.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT FOOTER TITLE SUBMIT


module.exports.editFooterTitleSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const name = req.body.name
    const findMenuList = `UPDATE footer_title set title = '${name}'  where id = '${id}'`
    const result = await connection(findMenuList)
    res.redirect("/footerTitle")
  } catch (error) {
    console.log(error)
  }
}




// FOOTER LINKS LIST


module.exports.footerLinkList = async (req, res) => {
  try {
    const sql = `SELECT * FROM footer_links`
    const result = await connection(sql)
    console.log(result)
    res.render("footerLinkList.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}


// ADD  FOOTER LINK


module.exports.addFooterLink = async (req, res) => {
  try {
    const sql = `SELECT * FROM footer_title`
    const result = await connection(sql)
    console.log(result)
    res.render("addFooterLink.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}


// ADD  FOOTER LINK SUBMIT


module.exports.addFooterLinkSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const name = req.body.name
    const category = req.body.category
    const url = req.body.url
    // CREATE SLUG

    let slug = name.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    const findSlugSql = `SELECT * FROM footer_links where name = '${name}'`
    const findSlug = await connection(findSlugSql)
    if (findSlug.length > 0) {
      let rendom = Math.floor(1000 + Math.random() * 9000);
      slug = slug + "-" + rendom;
    }
    const sql = `INSERT INTO footer_links (id , category , name , url , status , slug ) VALUES ('','${category}','${name}','${url}','1' , '${slug}')`
    await connection(sql)
    res.redirect("/footerLinkList")

  } catch (error) {
    console.log(error)
  }
}



// FOOTER LINKS EDIT


module.exports.editFooterLink = async (req, res) => {
  try {
    const titleSql = `SELECT * FROM footer_title`
    const titles = await connection(titleSql)
    console.log("title", titles)
    const id = req.params.id
    const sql = `SELECT * FROM footer_links where id = '${id}'`
    const result = await connection(sql)
    console.log("result", result)
    res.render("editFooterLink.ejs", { result: result[0], titles: titles })
  } catch (error) {
    console.log(error)
  }
}


// FOOTER LINKS EDIT SUBMIT


module.exports.editFooterLinkSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const name = req.body.name
    const url = req.body.url
    console.log(id)
    // CREATE SLUG

    let slug = name.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    console.log("slug", slug)
    const findSlugSql = `SELECT * FROM footer_links where slug = '${slug}'`
    const findSlug = await connection(findSlugSql)

    if (findSlug.length > 0) {
      if (findSlug[0].id == id) {

      } else {
        let rendom = Math.floor(1000 + Math.random() * 9000);
        slug = slug + "-" + rendom;
      }

    }
    const sql = `UPDATE footer_links set name = '${name}', url = '${url}' , slug = '${slug}'  where id = '${id}'`
    const result = await connection(sql)
    res.redirect("/footerLinkList")

  } catch (error) {
    console.log(error)
  }
}


// FOOTER LINKS DELETE


module.exports.editFooterLinkSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const name = req.body.name
    const url = req.body.url
    console.log(id)
    const sql = `UPDATE footer_links set name = '${name}', url = '${url}'  where id = '${id}'`
    const result = await connection(sql)
    res.redirect("/footerLinkList")

  } catch (error) {
    console.log(error)
  }
}


// DELETE FOOTER LINK

module.exports.deleteFooterLink = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM footer_links where id="${id}"`
    const result = await connection(query)
    res.redirect("/footerLinkList")

  } catch (error) {
    console.log(error)
  }
}


// OUR CLIENTS


module.exports.ourClients = async (req, res) => {

  try {
   
    const findOurClientTitleSql = `SELECT * FROM our_client_title`
    const findOurClientTitle = await connection(findOurClientTitleSql)
    const sql = `SELECT * FROM our_clients`
    const result = await connection(sql)
    // console.log(result)
    res.render("ourClients.ejs", { result: result, findOurClientTitle: findOurClientTitle[0] })
  } catch (error) {
    console.log(error)
  }
}

// ADD CLIENT

module.exports.addClient = async (req, res) => {
  try {
    res.render("addClient.ejs")
  } catch (error) {
    console.log(error)
  }
}

// ADD CLIENT SUBMIT

module.exports.addClientSubmit = async (req, res) => {
  try {
    const description = req.body.description
    const frountLogo = req.files.frountLogo[0].filename
    const backLogo = req.files.backLogo[0].filename
    const backgroundImage = req.files.backgroundImage[0].filename
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
  //  console.log(generateId)
    const sql = `INSERT INTO our_clients ( id , generateId, frountLogo , backLogo , backgroundImage , description , status) VALUES ('${''}','${generateId}','${frountLogo}','${backLogo}','${backgroundImage}','${description}','${'1'}')`
    const result = await connection(sql)
    res.redirect("/ourClients")
    // console.log("body",req.body)
    // console.log("files",req.files)
  } catch (error) {
    console.log(error)
  }
}

// EDIT CLIENT

module.exports.editClient = async (req, res) => {
  try {
    const findOurClientTitleSql = `SELECT * FROM our_client_title`
    const findOurClientTitle = await connection(findOurClientTitleSql)
    const id = req.params.id
    const sql = `SELECT * FROM our_clients where generateId = '${id}'`
    const result = await connection(sql)
    console.log(result)
    res.render("editClient.ejs", { result: result[0], findOurClientTitle: findOurClientTitle[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT CLIENT SUBMIT

module.exports.editClientSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const id = req.params.id
    const ourClientTitleId = req.body.id
    const description = req.body.description
    console.log(description)
    const sql = `SELECT * FROM our_clients where generateId = '${id}'`
    const result = await connection(sql)
    var frountLogo = result[0].frountLogo
    var backLogo = result[0].backLogo
    var backgroundImage = result[0].backgroundImage
    if (req.files.frountLogo) {
      frountLogo = req.files.frountLogo[0].filename
    }
    if (req.files.backLogo) {
      backLogo = req.files.backLogo[0].filename
    }
    if (req.files.backgroundImage) {
      backgroundImage = req.files.backgroundImage[0].filename
    }
    const editOurClientTtileSql = `UPDATE our_client_title set title = '${req.body.title}', pounchLine = '${req.body.pounchLine}'  where id = '${ourClientTitleId}'`
    const editClientTitleResult = await connection(editOurClientTtileSql)
    const editClientSql = `UPDATE our_clients set frountLogo = '${frountLogo}', backLogo = '${backLogo}' , backgroundImage = '${backgroundImage}' , description = '${description}'  where generateId = '${id}'`
    const editClientResult = await connection(editClientSql)
    res.redirect("/ourClients")
  } catch (error) {
    console.log(error)
  }
}





// SLIDER


module.exports.slider = async (req, res) => {
  try {
  
    const sql = `SELECT * FROM slider`
    const result = await connection(sql)
    res.render("slider.ejs", { result: result.reverse() })
  } catch (error) {
    console.log(error)
  }
}

// ADD  SLIDER


module.exports.addSlider = async (req, res) => {
  try {

    res.render("addSlider.ejs")
  } catch (error) {
    console.log(error)
  }
}

// ADD SLIDER SUBMIT

module.exports.addSliderSubmit = async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.files)
    const heading = req.body.heading
    const description = req.body.description
    const btnText = req.body.btnText
    const btnUrl = req.body.btnUrl
    const image = req.files.image[0].filename
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const sql = `INSERT INTO slider ( id ,generateId, image , heading , description , btnText ,btnUrl , status) VALUES ('${''}','${generateId}','${image}','${heading}','${description}','${btnText}','${btnUrl}','${'1'}')`
    const result = await connection(sql)
    res.redirect("/slider")
    // console.log("body",req.body)
    // console.log("files",req.files)
  } catch (error) {
    console.log(error)
  }
}

// EDIT SLIDER


module.exports.editSlider = async (req, res) => {
  try {
    const id = req.params.id
    const sql = `SELECT * FROM slider where generateId = '${id}'`
    const result = await connection(sql)
    res.render("editSlider.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT SLIDER


module.exports.editSliderSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const heading = req.body.heading
    const description = req.body.description
    const btnText = req.body.btnText
    const btnUrl = req.body.btnUrl
    if (req.files.image) {
      const image = req.files.image[0].filename
      const editSliderSql = `UPDATE slider set image = '${image}', heading = '${heading}', description = '${description}' , btnText = '${btnText}' , btnUrl = '${btnUrl}'  where id = '${id}'`
      const editSliderResult = await connection(editSliderSql)
      res.redirect("/slider")
    } else {
      const editSliderSql = `UPDATE slider set heading = '${heading}', description = '${description}' , btnText = '${btnText}' , btnUrl = '${btnUrl}'  where generateId = '${id}'`
      const editSliderResult = await connection(editSliderSql)
      res.redirect("/slider")
    }


  } catch (error) {
    console.log(error)
  }
}

// DELETE SLIDER

module.exports.deleteSlider = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM slider where id="${id}"`
    const result = await connection(query)
    res.redirect("/slider")

  } catch (error) {
    console.log(error)
  }
}


// TECHNOLOGIES


module.exports.technologies = async (req, res) => {
  try {
    const findTechnologiesTitleSql = `SELECT * FROM technologies`
    const findTechnologiesTitle = await connection(findTechnologiesTitleSql)
    const sql = `SELECT * FROM technologies_list`
    const result = await connection(sql)
    console.log(result)
    res.render("technologies.ejs", { result: result, findTechnologiesTitle: findTechnologiesTitle[0] })
  } catch (error) {
    console.log(error)
  }
}

// ADD TECHNOLOGIES


module.exports.addTechnologies = async (req, res) => {
  try {
    res.render("addTechnologies")
  } catch (error) {
    console.log(error)
  }
}


// ADD TECHNOLOGIES


module.exports.addTechnologiesSubmit = async (req, res) => {
  try {
    console.log("body", req.body)
    const title = req.body.title
    const url = req.body.url
    const image = req.files.image[0].filename
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    // CREATE SLUG

    let slug = title.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    const findSlugSql = `SELECT * FROM technologies_list where title = '${title}'`
    const findSlug = await connection(findSlugSql)
    if (findSlug.length > 0) {
      let rendom = Math.floor(1000 + Math.random() * 9000);
      slug = slug + "-" + rendom;
    }
    const sql = `INSERT INTO technologies_list ( id , generateId , image , title , url , status , slug ) VALUES ('${''}','${generateId}','${image}','${title}','${url}','${'1'}' , '${slug}')`
    const result = await connection(sql)
    res.redirect("/technologies")
  } catch (error) {
    console.log(error)
  }
}



// EDIT TECHNOLOGIES

module.exports.editTechnologies = async (req, res) => {
  try {
    const findTechnologiesTitleSql = `SELECT * FROM technologies`
    const findTechnologiesTitle = await connection(findTechnologiesTitleSql)
    const id = req.params.id
    const sql = `SELECT * FROM technologies_list where generateId = '${id}'`
    const result = await connection(sql)
    //  console.log(result)
    res.render("editTechnologies.ejs", { result: result[0], findTechnologiesTitle: findTechnologiesTitle[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT TECHNOLOGIES SUBMIT

module.exports.editTechnologiesSubmit = async (req, res) => {
  try {
    console.log(req.files)
    const id = req.params.id
    const technologiesId = req.body.id
    const title = req.body.title
    const title2 = req.body.title2
    const pounchLine = req.body.pounchLine
    const url = req.body.url

    console.log("req.body", req.body)

    // CREATE SLUG

    let slug = title2.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    console.log("slug", slug)
    const findSlugSql = `SELECT * FROM technologies_list where slug = '${slug}'`
    const findSlug = await connection(findSlugSql)
    console.log("findSlug", findSlug)
    if (findSlug.length > 0) {
      if (findSlug[0].generateId == id) {

      } else {
        let rendom = Math.floor(1000 + Math.random() * 9000);
        slug = slug + "-" + rendom;
      }

    }

    if (req.files.image) {
      const image = req.files.image[0].filename
      const editTechnologiestileSql = `UPDATE technologies set title = '${title}', pounchLine = '${pounchLine}'  where id = '${technologiesId}'`
      const editTechnologiestile = await connection(editTechnologiestileSql)
      const editTechnologiesSql = `UPDATE technologies_list set image = '${image}' , title = '${title2}', url = '${url}' , slug = '${slug}'  where generateId = '${id}'`
      const editTechnologies = await connection(editTechnologiesSql)
      res.redirect("/technologies")
    } else {
      const editTechnologiestileSql = `UPDATE technologies set title = '${req.body.title}', pounchLine = '${req.body.pounchLine}'  where id = '${technologiesId}'`
      const editTechnologiestile = await connection(editTechnologiestileSql)
      const editTechnologiesSql = `UPDATE technologies_list set title = '${title2}', url = '${url}' , slug = '${slug}'  where generateId = '${id}'`
      const editTechnologies = await connection(editTechnologiesSql)
      res.redirect("/technologies")
    }


  } catch (error) {
    console.log(error)
  }
}

// DELETE TECHNOLOGIES

module.exports.deleteTechnologies = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM technologies_list where id="${id}"`
    const result = await connection(query)
    res.redirect("/technologies")

  } catch (error) {
    console.log(error)
  }
}



// AWARDS


module.exports.awards = async (req, res) => {
  try {
    const findAwardTitleSql = `SELECT * FROM awards_title`
    const findAwardTitle = await connection(findAwardTitleSql)
    const sql = `SELECT * FROM awards`
    const result = await connection(sql)
    console.log(result)
    res.render("awards.ejs", { result: result, findAwardTitle: findAwardTitle[0] })
  } catch (error) {
    console.log(error)
  }
}

// ADD AWARDS


module.exports.addAwards = async (req, res) => {
  try {
    res.render("addAwards")
  } catch (error) {
    console.log(error)
  }
}


// ADD AWARDS


module.exports.addAwardsSubmit = async (req, res) => {
  try {

    const image = req.files.image[0].filename
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const sql = `INSERT INTO awards ( id, generateId, image , status ) VALUES ('${''}','${generateId}','${image}','${'1'}')`
    const result = await connection(sql)
    res.redirect("/awards")
  } catch (error) {
    console.log(error)
  }
}



// EDIT AWARDS

module.exports.editAwards = async (req, res) => {
  try {
    const findAwardsTitleSql = `SELECT * FROM awards_title`
    const findAwardsTitle = await connection(findAwardsTitleSql)
    const id = req.params.id
    const sql = `SELECT * FROM awards where generateId = '${id}'`
    const result = await connection(sql)
    console.log(result)
    res.render("editAwards.ejs", { result: result[0], findAwardsTitle: findAwardsTitle[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT AWARDS SUBMIT

module.exports.editAwardsSubmit = async (req, res) => {
  try {
    console.log(req.files)
    const id = req.params.id
    const awardsId = req.body.id
    const title = req.body.title
    const pounchLine = req.body.pounchLine
    

    if (req.files.image) {
      const image = req.files.image[0].filename
      const editAwardstileSql = `UPDATE awards_title set title = '${title}', pounchLine = '${pounchLine}'  where id = '${awardsId}'`
      const editAwardstile = await connection(editAwardstileSql)
      const editAwardssSql = `UPDATE awards set image = '${image}' where generateId = '${id}'`
      const editAwardss = await connection(editAwardssSql)
      res.redirect("/awards")
    } else {

      const editAwardstileSql = `UPDATE awards_title set title = '${title}', pounchLine = '${pounchLine}'  where id = '${awardsId}'`
      const editAwardstile = await connection(editAwardstileSql)
      res.redirect("/awards")
    }


  } catch (error) {
    console.log(error)
  }
}

// DELETE AWARDS

module.exports.deleteAwards = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM awards where id="${id}"`
    const result = await connection(query)
    res.redirect("/awards")

  } catch (error) {
    console.log(error)
  }
}


// OUR OFFERING


module.exports.offering = async (req, res) => {
  try {
    const findOffringTitleSql = `SELECT * FROM offring_title`
    const findOffringTitle = await connection(findOffringTitleSql)
    const sql = `SELECT * FROM offering`
    const result = await connection(sql)
    console.log(result)
    res.render("offring.ejs", { result: result, findOurClientTitle: findOffringTitle[0] })
  } catch (error) {
    console.log(error)
  }
}

// ADD OFFERING

module.exports.addOffering = async (req, res) => {
  try {
    res.render("addOffering.ejs")
  } catch (error) {
    console.log(error)
  }
}

// ADD OFFERING SUBMIT

module.exports.addOfferingSubmit = async (req, res) => {
  try {

    const frountLogo = req.files.frountLogo[0].filename
    const backLogo = req.files.backLogo[0].filename
    const heading = req.body.heading
    const description = req.body.description
    const url = req.body.url
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // CREATE SLUG

    let slug = heading.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    const findSlugSql = `SELECT * FROM offering where heading = '${heading}'`
    const findSlug = await connection(findSlugSql)
    if (findSlug.length > 0) {
      let rendom = Math.floor(1000 + Math.random() * 9000);
      slug = slug + "-" + rendom;
    }

    const sql = `INSERT INTO offering ( id ,generateId, frountLogo , backLogo , heading , description , url ,status , slug) VALUES ('${''}','${generateId}','${frountLogo}','${backLogo}','${heading}','${description}','${url}','${'1'}' , '${slug}')`
    const result = await connection(sql)
    res.redirect("/offering")
    // console.log("body",req.body)
    // console.log("files",req.files)
  } catch (error) {
    console.log(error)
  }
}

// EDIT OFFERING

module.exports.editOffering = async (req, res) => {
  try {
    const findOfferingTitleSql = `SELECT * FROM offring_title`
    const findOfferingTitle = await connection(findOfferingTitleSql)
    const id = req.params.id
    const sql = `SELECT * FROM offering where generateId = '${id}'`
    const result = await connection(sql)
    console.log(result)
    res.render("editOffering.ejs", { result: result[0], findOfferingTitle: findOfferingTitle[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT OFFERING SUBMIT

module.exports.editOfferingSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const id = req.params.id
    const ourOfferingTitleId = req.body.id
    const heading = req.body.heading
    const description = req.body.description
    const url = req.body.url

    const sql = `SELECT * FROM offering where generateId = '${id}'`
    const result = await connection(sql)
    var frountLogo = result[0].frountLogo
    var backLogo = result[0].backLogo

    if (req.files.frountLogo) {
      frountLogo = req.files.frountLogo[0].filename
    }
    if (req.files.backLogo) {
      backLogo = req.files.backLogo[0].filename
    }

    // CREATE SLUG

    let slug = heading.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    console.log("slug", slug)
    const findSlugSql = `SELECT * FROM offering where slug = '${slug}'`
    const findSlug = await connection(findSlugSql)

    if (findSlug.length > 0) {
      if (findSlug[0].generateId == id) {

      } else {
        let rendom = Math.floor(1000 + Math.random() * 9000);
        slug = slug + "-" + rendom;
      }

    }

    const editOfferingTtileSql = `UPDATE offring_title set title = '${req.body.title}', pounchLine = '${req.body.pounchLine}'  where id = '${ourOfferingTitleId}'`
    const editOfferingTtile = await connection(editOfferingTtileSql)
    const editOfferingSql = `UPDATE offering set frountLogo = '${frountLogo}', backLogo = '${backLogo}' ,heading = '${heading}',description = '${description}' , url = '${url}' , slug = '${slug}'  where generateId = '${id}'`
    const editOffering = await connection(editOfferingSql)
    res.redirect("/offering")
  } catch (error) {
    console.log(error)
  }
}


// DELETE OFFERING

module.exports.deleteOffering = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM offering where id="${id}"`
    const result = await connection(query)
    res.redirect("/offering")

  } catch (error) {
    console.log(error)
  }
}







// OUR INDUSTRIES


module.exports.industries = async (req, res) => {
  try {
    const findIndustriesTitleSql = `SELECT * FROM industries_title`
    const findIndustriesTitle = await connection(findIndustriesTitleSql)
    const sql = `SELECT * FROM industries`
    const result = await connection(sql)
    // console.log(result)
    res.render("industries.ejs", { result: result, findIndustriesTitle: findIndustriesTitle[0] })
  } catch (error) {
    console.log(error)
  }
}

// ADD INDUSTRIES

module.exports.addIndustries = async (req, res) => {
  try {
    res.render("addIndustries.ejs")
  } catch (error) {
    console.log(error)
  }
}

// ADD INDUSTRIES SUBMIT

module.exports.addIndustriesSubmit = async (req, res) => {
  try {

    const frountLogo = req.files.frountLogo[0].filename
    const heading = req.body.heading
    const description = req.body.description
    const url = req.body.url
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    // CREATE SLUG

    let slug = heading.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    const findSlugSql = `SELECT * FROM industries where heading = '${heading}'`
    const findSlug = await connection(findSlugSql)
    if (findSlug.length > 0) {
      let rendom = Math.floor(1000 + Math.random() * 9000);
      slug = slug + "-" + rendom;
    }
    const sql = `INSERT INTO industries ( id,generateId , frountLogo , heading , description , url ,status , slug) VALUES ('${''}','${generateId}','${frountLogo}','${heading}','${description}','${url}','${'1'}' , '${slug}')`
    const result = await connection(sql)
    res.redirect("/industries")
    // console.log("body",req.body)
    // console.log("files",req.files)
  } catch (error) {
    console.log(error)
  }
}

// EDIT INDUSTRIES

module.exports.editIndustries = async (req, res) => {
  try {
    const findIndustriesTitleSql = `SELECT * FROM industries_title`
    const findIndustriesTitle = await connection(findIndustriesTitleSql)
    const id = req.params.id
    const sql = `SELECT * FROM industries where generateId = '${id}'`
    const result = await connection(sql)
    console.log(result)
    res.render("editIndustries.ejs", { result: result[0], findIndustriesTitle: findIndustriesTitle[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT INDUSTRIES SUBMIT

module.exports.editIndustriesSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const id = req.params.id
    const industriesTitleId = req.body.id
    const heading = req.body.heading
    const description = req.body.description
    const url = req.body.url

    // CREATE SLUG

    let slug = heading.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    console.log("slug", slug)
    const findSlugSql = `SELECT * FROM industries where slug = '${slug}'`
    const findSlug = await connection(findSlugSql)

    if (findSlug.length > 0) {
      if (findSlug[0].generateId == id) {

      } else {
        let rendom = Math.floor(1000 + Math.random() * 9000);
        slug = slug + "-" + rendom;
      }

    }

    if (req.files.frountLogo) {
      const frountLogo = req.files.frountLogo[0].filename
      const editIndustriesTitleSql = `UPDATE industries_title set title = '${req.body.title}', pounchLine = '${req.body.pounchLine}'  where id = '${industriesTitleId}'`
      const editIndustriesTitle = await connection(editIndustriesTitleSql)
      const editIndustriesSql = `UPDATE industries set frountLogo = '${frountLogo}' ,heading = '${heading}',description = '${description}' , url = '${url}' , slug = '${slug}'  where generateId = '${id}'`
      const editIndustries = await connection(editIndustriesSql)
      res.redirect("/industries")
    } else {
      const editIndustriesTitleSql = `UPDATE industries_title set title = '${req.body.title}', pounchLine = '${req.body.pounchLine}'  where id = '${industriesTitleId}'`
      const editIndustriesTitle = await connection(editIndustriesTitleSql)
      const editIndustriesSql = `UPDATE industries set heading = '${heading}',description = '${description}' , url = '${url}', slug = '${slug}'  where generateId = '${id}'`
      const editIndustries = await connection(editIndustriesSql)
      res.redirect("/industries")
    }


  } catch (error) {
    console.log(error)
  }
}


// DELETE INDUSTRIES

module.exports.deleteIndustries = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM industries where id="${id}"`
    const result = await connection(query)
    res.redirect("/industries")

  } catch (error) {
    console.log(error)
  }
}



// SUCCESS STORIES


module.exports.successStories = async (req, res) => {
  try {

    const sql = `SELECT * FROM success_strories`
    const result = await connection(sql)
    // console.log(result)
    res.render("successStories.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}

// ADD SUCCESS STORIES

module.exports.addSuccessStories = async (req, res) => {
  try {
    res.render("addSuccessStories.ejs")
  } catch (error) {
    console.log(error)
  }
}



// ADD SUCCESS STORIES SUBMIT

module.exports.addSuccessStoriesSubmit = async (req, res) => {
  try {

    const image = req.files.image[0].filename
    const section = req.body.section
    const title = req.body.title
    const subTitle = req.body.subTitle
    const description = req.body.description
    const btnText = req.body.btnText
    const btnUrl = req.body.btnUrl
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const sql = `INSERT INTO success_strories ( id,generateId ,section, image , title ,sub_title , description , btnText ,btnUrl ,status ) VALUES ('${''}','${generateId}','${section}','${image}','${title}','${subTitle}','${description}','${btnText}','${btnUrl}','${'1'}')`
    const result = await connection(sql)
    res.redirect("/successStories")
    // console.log("body",req.body)
    // console.log("files",req.files)
  } catch (error) {
    console.log(error)
  }
}

// EDIT SUCCESS STORIES

module.exports.editSuccessStories = async (req, res) => {
  try {

    const id = req.params.id
    const sql = `SELECT * FROM success_strories where generateId = '${id}'`
    const result = await connection(sql)
    console.log(result)
    res.render("editSuccessStories.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}


// EDIT SUCCESS STORIES SUBMIT

module.exports.editSuccessStoriesSubmit = async (req, res) => {
  try {

    const section = req.body.section
    const title = req.body.title
    const subTitle = req.body.subTitle
    const description = req.body.description
    const btnText = req.body.btnText
    const btnUrl = req.body.btnUrl
    const id = req.params.id


    if (req.files.image) {
      const image = req.files.image[0].filename
      const editIndustriesSql = `UPDATE success_strories set section = '${section}' ,title = '${title}',sub_title = '${subTitle}' ,description = '${description}',image = '${image}',btnText = '${btnText}', btnUrl = '${btnUrl}'  where generateId = '${id}'`
      const editIndustries = await connection(editIndustriesSql)
      res.redirect("/successStories")
    } else {
      const editIndustriesSql = `UPDATE success_strories set section = '${section}' ,title = '${title}',sub_title = '${subTitle}' ,description = '${description}',btnText = '${btnText}', btnUrl = '${btnUrl}'  where generateId = '${id}'`
      const editIndustries = await connection(editIndustriesSql)
      res.redirect("/successStories")
    }


  } catch (error) {
    console.log(error)
  }
}


// DELETE SUCCESS STORIES

module.exports.deleteSuccessStories = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM success_strories where id="${id}"`
    const result = await connection(query)
    res.redirect("/successStories")

  } catch (error) {
    console.log(error)
  }
}


// CARRERS


module.exports.carrers = async (req, res) => {
  try {

    const sql = `SELECT * FROM carrers`
    const result = await connection(sql)
    // console.log(result)
    res.render("carrers.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}



// EDIT CARRERS

module.exports.editCarrers = async (req, res) => {
  try {

    const id = req.params.id
    const sql = `SELECT * FROM carrers where id = '${id}'`
    const result = await connection(sql)
    console.log(result)
    res.render("editCarrers.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}


// EDIT CARRERS SUBMIT

module.exports.editCarrersSubmit = async (req, res) => {
  try {

    const section = req.body.section
    const title = req.body.title
    const description = req.body.description
    const btnText = req.body.btnText
    const btnUrl = req.body.btnUrl
    const id = req.params.id


    if (req.files.image) {
      const image = req.files.image[0].filename
      const editCarrersSql = `UPDATE carrers set section = '${section}' ,title = '${title}' ,description = '${description}',image = '${image}',btnText = '${btnText}', btnUrl = '${btnUrl}'  where id = '${id}'`
      const editCarrers = await connection(editCarrersSql)
      res.redirect("/carrers")
    } else {
      const editCarrersSql = `UPDATE carrers set section = '${section}' ,title = '${title}' ,description = '${description}',btnText = '${btnText}', btnUrl = '${btnUrl}'  where id = '${id}'`
      const editCarrers = await connection(editCarrersSql)
      res.redirect("/carrers")
    }


  } catch (error) {
    console.log(error)
  }
}








// BLOGS


module.exports.blogs = async (req, res) => {
  try {
    const findBlogTitleSql = `SELECT * FROM blog_title`
    const findBlogTitle = await connection(findBlogTitleSql)
    const sql = `SELECT * FROM blogs`
    const result = await connection(sql)
    // console.log(result)
    res.render("blogs.ejs", { findBlogTitle: findBlogTitle[0], result: result })
  } catch (error) {
    console.log(error)
  }
}

// ADD BLOGS


module.exports.addBlogs = async (req, res) => {
  try {
    res.render("addBlogs.ejs")
  } catch (error) {
    console.log(error)
  }
}


// ADD BLOGS SUBMIT


module.exports.addBlogsSubmit = async (req, res) => {
  try {

    console.log(req.body)

    const title = req.body.title
    const btnText = req.body.btnText
    const btnUrl = req.body.btnUrl
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // CREATE SLUG

    let slug = title.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    const findSlugSql = `SELECT * FROM blogs where title = '${title}'`
    const findSlug = await connection(findSlugSql)
    if (findSlug.length > 0) {
      let rendom = Math.floor(1000 + Math.random() * 9000);
      slug = slug + "-" + rendom;
    }
    const sql = `INSERT INTO blogs ( id,generateId  , title , btn_text , btn_url , status , slug ) VALUES ('${''}','${generateId}','${title}','${btnText}','${btnUrl}','${'1'}' , '${slug}')`
    const result = await connection(sql)
    res.redirect("/blogs")
  } catch (error) {
    console.log(error)
  }
}



// EDIT BLOGS

module.exports.editBlogs = async (req, res) => {
  try {
    const findBlogsTitleSql = `SELECT * FROM blog_title`
    const findBlogsTitle = await connection(findBlogsTitleSql)
    const id = req.params.id
    const sql = `SELECT * FROM blogs where generateId = '${id}'`
    const result = await connection(sql)
    console.log(result)
    res.render("editBlogs.ejs", { result: result[0], findBlogsTitle: findBlogsTitle[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT BLOGS SUBMIT

module.exports.editBlogsSubmit = async (req, res) => {
  try {
    console.log(req.files)
    const id = req.params.id
    const blogTitleId = req.body.id
    const title = req.body.title
    const pounchLine = req.body.pounchLine
    const title2 = req.body.title2
    const btnText = req.body.btnText
    const btnUrl = req.body.btnUrl

    // CREATE SLUG

    let slug = title2.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    console.log("slug", slug)
    const findSlugSql = `SELECT * FROM blogs where slug = '${slug}'`
    const findSlug = await connection(findSlugSql)

    if (findSlug.length > 0) {
      if (findSlug[0].generateId == id) {

      } else {
        let rendom = Math.floor(1000 + Math.random() * 9000);
        slug = slug + "-" + rendom;
      }

    }

    if (req.files.image) {
      const image = req.files.image[0].filename
      const editBlogstileSql = `UPDATE blog_title set title = '${title}', pounchLine = '${pounchLine}' ,  image = '${image}'  where id = '${blogTitleId}'`
      const editBlogstile = await connection(editBlogstileSql)
      const editBlogsSql = `UPDATE blogs set title = '${title2}', btn_text = '${btnText}', btn_url = '${btnUrl}'  , slug = '${slug}'  where generateId = '${id}'`
      const editBlogs = await connection(editBlogsSql)
      res.redirect("/blogs")
    } else {
      const editBlogstileSql = `UPDATE blog_title set title = '${title}', pounchLine = '${pounchLine}'  where id = '${blogTitleId}'`
      const editBlogstile = await connection(editBlogstileSql)
      const editBlogsSql = `UPDATE blogs set title = '${title2}', btn_text = '${btnText}', btn_url = '${btnUrl}'  , slug = '${slug}'  where generateId = '${id}'`
      const editBlogs = await connection(editBlogsSql)
      res.redirect("/blogs")
    }


  } catch (error) {
    console.log(error)
  }
}

// DELETE BLOGS

module.exports.deleteBlogs = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM blogs where id="${id}"`
    const result = await connection(query)
    res.redirect("/blogs")

  } catch (error) {
    console.log(error)
  }
}



// CURRENT OPNING


module.exports.currentOpning = async (req, res) => {
  try {
    const sql = `SELECT * FROM current_opning`
    const result = await connection(sql)
    // console.log(result)
    res.render("currentOpning.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}

// ADD CURRENT OPNING


module.exports.addCurrentOpning = async (req, res) => {
  try {
    res.render("addCurrentOpning.ejs")
  } catch (error) {
    console.log(error)
  }
}

// ADD CURRENT OPNING SUBMIT


module.exports.addCurrentOpningSubmit = async (req, res) => {
  try {

    const image = req.files.image[0].filename
    const title = req.body.title
    const exp = req.body.exp
    const location = req.body.location
    const brief = req.body.brief
    const responsbility = req.body.responsbility
    const skills = req.body.skills
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    // CREATE SLUG

    let slug = title.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    const findSlugSql = `SELECT * FROM current_opning where title = '${title}'`
    const findSlug = await connection(findSlugSql)
    if (findSlug.length > 0) {
      let rendom = Math.floor(1000 + Math.random() * 9000);
      slug = slug + "-" + rendom;
    }
    const sql = `INSERT INTO current_opning ( id ,generateId, image , title , exp , location ,brief_desc , responsbility ,skills , status , slug) VALUES ('${''}','${generateId}','${image}','${title}','${exp}','${location}','${brief}','${responsbility}','${skills}','${'1'}' , '${slug}')`
    const result = await connection(sql)
    res.redirect("/currentOpning")
    // console.log("body",req.body)
    // console.log("files",req.files)
  } catch (error) {
    console.log(error)
  }
}



// EDIT CURRENT OPNING

module.exports.editCurrentOpning = async (req, res) => {
  try {
    const id = req.params.id
    const sql = `SELECT * FROM current_opning where generateId = '${id}'`
    const result = await connection(sql)
    console.log(result)
    res.render("editCurrentOpning.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT INDUSTRIES SUBMIT

module.exports.editCurrentOpningSubmit = async (req, res) => {
  try {
    const title = req.body.title
    const exp = req.body.exp
    const location = req.body.location
    const brief = req.body.brief
    const responsbility = req.body.responsbility
    const skills = req.body.skills
    const id = req.params.id


    // CREATE SLUG

    let slug = title.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    console.log("slug", slug)
    const findSlugSql = `SELECT * FROM current_opning where slug = '${slug}'`
    const findSlug = await connection(findSlugSql)

    if (findSlug.length > 0) {
      if (findSlug[0].generateId == id) {

      } else {
        let rendom = Math.floor(1000 + Math.random() * 9000);
        slug = slug + "-" + rendom;
      }

    }

    if (req.files.image) {
      const image = req.files.image[0].filename
      const editCurrentOpningSql = `UPDATE current_opning set image = '${image}' ,title = '${title}',exp = '${exp}' , location = '${location}' , brief_desc = '${brief}' , responsbility = '${responsbility}' , skills = '${skills}' where generateId = '${id}'`
      const editCurrentOpning = await connection(editCurrentOpningSql)
      res.redirect("/currentOpning")
    } else {
      const editCurrentOpningSql = `UPDATE current_opning set title = '${title}',exp = '${exp}' , location = '${location}' , brief_desc = '${brief}' , responsbility = '${responsbility}' , skills = '${skills}' where generateId = '${id}'`
      const editCurrentOpning = await connection(editCurrentOpningSql)
      res.redirect("/currentOpning")
    }


  } catch (error) {
    console.log(error)
  }
}


// DETAILS CURRENT OPNING

module.exports.detailCurrentOpning = async (req, res) => {
  try {
    const id = req.params.id
    const sql = `SELECT * FROM current_opning where generateId = '${id}'`
    const result = await connection(sql)
    console.log(result)
    res.render("detailsCurrentOpning.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}


// DELETE CURRENT OPNING

module.exports.deleteCurrentOpning = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM current_opning where generateId="${id}"`
    const result = await connection(query)
    res.redirect("/currentOpning")

  } catch (error) {
    console.log(error)
  }
}




// CAREER PAGE TITLE


module.exports.careerPageTitle = async (req, res) => {
  try {

    const sql = `SELECT * FROM careers_page_title`
    const result = await connection(sql)
    // console.log(result)
    res.render("careersPage.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}



// EDIT CAREER PAGE TITLE

module.exports.editCareerPageTitle = async (req, res) => {
  try {

    const id = req.params.id
    const sql = `SELECT * FROM careers_page_title where id = '${id}'`
    const result = await connection(sql)
    console.log(result)
    res.render("editCareerPageTitle.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}


// EDIT CAREER PAGE TITLE SUBMIT

module.exports.editCareerPageTitleSubmit = async (req, res) => {
  try {

    const mainTitle = req.body.mainTitle
    const mainDesc = req.body.mainDesc
    const middleTitle = req.body.middleTitle
    const bottomTitle = req.body.bottomTitle
    const bottomDesc = req.body.bottomDesc
    const id = req.params.id

    console.log(req.body)
    if (req.files.image) {
      const image = req.files.image[0].filename
      const editCareerPageTitleSql = `UPDATE careers_page_title set main_title = '${mainTitle}' ,main_desc = '${mainDesc}' ,middle_title = '${middleTitle}',bottom_title = '${bottomTitle}',bottom_desc = '${bottomDesc}', image = '${image}'  where id = '${id}'`
      const editCareerPageTitle = await connection(editCareerPageTitleSql)
      res.redirect("/careersPageTitle")
    } else {
      const editCareerPageTitleSql = `UPDATE careers_page_title set main_title = '${mainTitle}' ,main_desc = '${mainDesc}' ,middle_title = '${middleTitle}',bottom_title = '${bottomTitle}',bottom_desc = '${bottomDesc}'  where id = '${id}'`
      const editCareerPageTitle = await connection(editCareerPageTitleSql)
      res.redirect("/careersPageTitle")
    }


  } catch (error) {
    console.log(error)
  }
}



// MASTER PAGE


module.exports.masterPage = async (req, res) => {
  try {
    const sql = `SELECT * FROM master_page`
    const result = await connection(sql)
    res.render("masterPage.ejs", { result: result.reverse() })
  } catch (error) {
    console.log(error)
  }
}




// ADD MASTER PAGE


module.exports.addMasterPage = async (req, res) => {
  try {
    const findMenuList = `SELECT * FROM menu_list`
    const result = await connection(findMenuList)
    res.render("addMasterPage.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}


// ADD  MANU SUBMIT


module.exports.addMasterPageSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const category = req.body.category
    const name = req.body.pageName
    const url = req.body.url

    // CREATE SLUG

    let slug = name.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    const findSlugSql = `SELECT * FROM master_page where page_name = '${name}'`
    const findSlug = await connection(findSlugSql)
    if (findSlug.length > 0) {
      let rendom = Math.floor(1000 + Math.random() * 9000);
      slug = slug + "-" + rendom;
    }

    const sql = `INSERT INTO master_page (id , page_name , p_category , url  , status , slug ) VALUES ('','${name}','${category}','${url}','1', '${slug}')`
    await connection(sql)
    res.redirect("/masterPage")


  } catch (error) {
    console.log(error)
  }
}


// CHANGE STATUS MASTER PAGE


module.exports.changeStatusMasterPage = async (req, res) => {
  try {
    const id = req.params.id
    const findMasterPageByIdSql = `SELECT * FROM master_page where id = '${id}'`
    const masterPageById = await connection(findMasterPageByIdSql)
    if (masterPageById[0].status == 0) {
      const sql = `UPDATE master_page set  status = '${1}'  where id = '${id}'`
      const result = await connection(sql)
      res.redirect("/masterPage")
    } else {
      const sql = `UPDATE master_page set  status = '${0}'  where id = '${id}'`
      const result = await connection(sql)
      res.redirect("/masterPage")
    }

  } catch (error) {
    console.log(error)
  }
}



module.exports.technologiesMaster = async (req, res) => {
  try {
    const findMenuList = `SELECT * FROM technologies_master`
    var result = await connection(findMenuList)
    var technologiesArray = []
    for (let i = 0; i < result.length; i++) {
      const element = result[i].technologies;
        console.log(element)
      var arr = element.split(",");
       console.log("arr",arr)

      for (let j = 0; j < arr.length; j++) {
        const element2 = arr[j];
        console.log("element2",element2)
        const findtechnologiesDataSql = `SELECT * FROM technologies_list where generateId ='${element2}'`
        const findtechnologiesData = await connection(findtechnologiesDataSql)
        //  console.log("data", findtechnologiesData)
        technologiesArray.push(findtechnologiesData[0])
        //   console.log("find",technologiesArray)

      };
      result[i].technologies = technologiesArray
      technologiesArray = []
    }
  //  console.log(result)
    res.render("technologiesMaster.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}




module.exports.addTechnologiesMaster = async (req, res) => {
  try {
    const technologisSql = `SELECT * FROM technologies_list where status = 1`
    const technologis = await connection(technologisSql)
    res.render("addTechnologiesMaster.ejs", { result: technologis })
  } catch (error) {
    console.log(error)
  }
}


module.exports.addTechnologiesMasterSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const title = req.body.title
    const technologies = req.body.technologies
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const technologisMasterSql = `INSERT INTO technologies_master (id ,generateId,title ,technologies ,status ,type) VALUES ('${''}','${generateId}', '${title}' , '${technologies}','${'1'}','${'master'}')`
    const technologisMaster = await connection(technologisMasterSql)
    res.redirect("/technologiesMaster")
  } catch (error) {
    console.log(error)
  }
}


module.exports.editTechnologiesMaster = async (req, res) => {
  try {
    const technologisSql = `SELECT * FROM technologies_list where status = 1`
    const technologis = await connection(technologisSql)
    const technologisMasterSql = `SELECT * FROM technologies_master where generateId = '${req.params.id}'`
    var technologisMaster = await connection(technologisMasterSql)
    var arr = technologisMaster[0].technologies.split(",");
    technologisMaster[0].technologies = arr
    console.log(arr)
    res.render("editTechnologiesMaster.ejs", { result: technologisMaster[0], technologis: technologis })
  } catch (error) {
    console.log(error)
  }
}


module.exports.editTechnologiesMasterSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const title = req.body.title
    const technologies = req.body.technologies
    const sql = `UPDATE technologies_master set  title = '${title}' , technologies = '${technologies}'  where id = '${id}'`
    const result = await connection(sql)
    res.redirect("/technologiesMaster")
  } catch (error) {
    console.log(error)
  }
}













module.exports.slaiderMaster = async (req, res) => {
  try {
    const sliderMasterSql = `SELECT * FROM slaider_master`
    var result = await connection(sliderMasterSql)
    var slidersArray = []
    for (let i = 0; i < result.length; i++) {
      const element = result[i].slaiders;
      //  console.log(element)
      var arr = element.split(",")
      console.log("arr",arr)

      for (let j = 0; j < arr.length; j++) {
        const element2 = arr[j];
        const findSliderDataSql = `SELECT * FROM slider where generateId = '${element2}'`
        const findSliderData = await connection(findSliderDataSql)
          console.log("data", findSliderData)
        slidersArray.push(findSliderData[0])
        //   console.log("find",technologiesArray)

      };
      result[i].slaiders = slidersArray
      slidersArray = []
    }
    res.render("slidersMaster.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}




module.exports.addSlaiderMaster = async (req, res) => {
  try {
    const sliderSql = `SELECT * FROM slider where status = 1`
    const slider = await connection(sliderSql)
    res.render("addSlaiderMaster.ejs", { result: slider })
  } catch (error) {
    console.log(error)
  }
}


module.exports.addSlaiderMasterSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const title = req.body.title
    const sliders = req.body.sliders
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const slidersMasterSql = `INSERT INTO slaider_master (id ,generateId,title ,slaiders ,status ,type) VALUES ('${''}','${generateId}' ,'${title}' , '${sliders}','${'1'}','${'master'}')`
    const slidersMaster = await connection(slidersMasterSql)
    res.redirect("/slaiderMaster")
  } catch (error) {
    console.log(error)
  }
}


module.exports.editSlaiderMaster = async (req, res) => {
  try {
    const sliderSql = `SELECT * FROM slider where status = 1`
    const slider = await connection(sliderSql)
    const slidersMasterSql = `SELECT * FROM slaider_master where generateId = '${req.params.id}'`
    var slidersMaster = await connection(slidersMasterSql)
    var arr = slidersMaster[0].slaiders.split(",");
    slidersMaster[0].slaiders = arr
    console.log(arr)
    res.render("editSlidersMaster.ejs", { result: slidersMaster[0], sliders: slider })
  } catch (error) {
    console.log(error)
  }
}


module.exports.editSlaiderMasterSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const title = req.body.title
    const sliders = req.body.sliders
    const sql = `UPDATE slaider_master set  title = '${title}' , slaiders = '${sliders}'  where generateId = '${id}'`
    const result = await connection(sql)
    res.redirect("/slaiderMaster")
  } catch (error) {
    console.log(error)
  }
}






module.exports.clientsMaster = async (req, res) => {
  try {
    const clientsMasterSql = `SELECT * FROM clients_master`
    var result = await connection(clientsMasterSql)
    var clientsArray = []
    for (let i = 0; i < result.length; i++) {
      const element = result[i].clients;
      //  console.log(element)
      var arr = element.split(",")
      // console.log("arr",arr)

      for (let j = 0; j < arr.length; j++) {
        const element2 = arr[j];
        const findClientsDataSql = `SELECT * FROM our_clients where generateId ='${element2}'`
        const findClientsData = await connection(findClientsDataSql)
        //  console.log("data", findtechnologiesData)
        clientsArray.push(findClientsData[0])
        //   console.log("find",technologiesArray)

      };
      result[i].clients = clientsArray
      clientsArray = []
    }
    res.render("clientsMaster.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}




module.exports.addClientsMaster = async (req, res) => {
  try {
    const clientsSql = `SELECT * FROM our_clients where status = 1`
    const clients = await connection(clientsSql)
    res.render("addClientsMaster.ejs", { result: clients })
  } catch (error) {
    console.log(error)
  }
}


module.exports.addClientsMasterSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const title = req.body.title
    const clients = req.body.clients
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const clientsMasterSql = `INSERT INTO clients_master (id ,generateId,title ,clients ,status ,type) VALUES ('${''}','${generateId}', '${title}' , '${clients}','${'1'}','${'master'}')`
    const clientsMaster = await connection(clientsMasterSql)
    res.redirect("/clientsMaster")
  } catch (error) {
    console.log(error)
  }
}


module.exports.editClientsMaster = async (req, res) => {
  try {
    const clientsSql = `SELECT * FROM our_clients where status = 1`
    const clients = await connection(clientsSql)
    const clientsMasterSql = `SELECT * FROM clients_master where generateId = '${req.params.id}'`
    var clientsMaster = await connection(clientsMasterSql)
    var arr = clientsMaster[0].clients.split(",")
    clientsMaster[0].clients = arr
    console.log(arr)
    res.render("editClientsMaster.ejs", { result: clientsMaster[0], clients: clients })
  } catch (error) {
    console.log(error)
  }
}


module.exports.editClientsMasterSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const title = req.body.title
    const clients = req.body.clients
    const sql = `UPDATE clients_master set  title = '${title}' , clients = '${clients}'  where generateId = '${id}'`
    const result = await connection(sql)
    res.redirect("/clientsMaster")
  } catch (error) {
    console.log(error)
  }
}









module.exports.successStoryMaster = async (req, res) => {
  try {
    const successStoryMasterSql = `SELECT * FROM successstory_master`
    var result = await connection(successStoryMasterSql)
    var successStoryArray = []
    for (let i = 0; i < result.length; i++) {
      const element = result[i].successStory;
      //  console.log(element)
      var arr = element.split(",")
      // console.log("arr",arr)

      for (let j = 0; j < arr.length; j++) {
        const element2 = arr[j];
        const findSuccessStoryDataSql = `SELECT * FROM success_strories where generateId ='${element2}'`
        const findSuccessStoryData = await connection(findSuccessStoryDataSql)
        //  console.log("data", findtechnologiesData)
        successStoryArray.push(findSuccessStoryData[0])
        //   console.log("find",technologiesArray)

      };
      result[i].successStory = successStoryArray
      successStoryArray = []
    }
    res.render("successStoryMaster.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}




module.exports.addSuccessStoryMaster = async (req, res) => {
  try {
    const successStorySql = `SELECT * FROM success_strories where status = 1`
    const successStory = await connection(successStorySql)
    res.render("addSuccessStoryMaster.ejs", { result: successStory })
  } catch (error) {
    console.log(error)
  }
}


module.exports.addSuccessStoryMasterSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const title = req.body.title
    const successStory = req.body.successStory
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const successStoryMasterSql = `INSERT INTO successstory_master (id ,generateId,title ,successStory ,status ,type) VALUES ('${''}', '${generateId}','${title}' , '${successStory}','${'1'}','${'master'}')`
    const successStoryMaster = await connection(successStoryMasterSql)
    res.redirect("/successStoryMaster")
  } catch (error) {
    console.log(error)
  }
}


module.exports.editSuccessStoryMaster = async (req, res) => {
  try {
    const successStorySql = `SELECT * FROM success_strories where status = 1`
    const successStory = await connection(successStorySql)
    const successStoryMasterSql = `SELECT * FROM successstory_master where generateId = '${req.params.id}'`
    var successStoryMaster = await connection(successStoryMasterSql)
    var arr = successStoryMaster[0].successStory.split(",")
    successStoryMaster[0].successStory = arr
    console.log(arr)
    res.render("editSuccessStoryMaster.ejs", { result: successStoryMaster[0], successStory: successStory })
  } catch (error) {
    console.log(error)
  }
}


module.exports.editSuccessStoryMasterSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const title = req.body.title
    const successStory = req.body.successStory
    const sql = `UPDATE successstory_master set  title = '${title}' , successStory = '${successStory}'  where generateId = '${id}'`
    const result = await connection(sql)
    res.redirect("/successStoryMaster")
  } catch (error) {
    console.log(error)
  }
}









module.exports.offeringMaster = async (req, res) => {
  try {
    const offeringMasterSql = `SELECT * FROM offering_master`
    var result = await connection(offeringMasterSql)
    var offeringMasterArray = []
    for (let i = 0; i < result.length; i++) {
      const element = result[i].offering;
      console.log(element)
      var arr = element.split(",")
       console.log("arr",arr)

      for (let j = 0; j < arr.length; j++) {
        const element2 = arr[j];
        const findOfferingDataSql = `SELECT * FROM offering where generateId ='${element2}'`
        const findOfferingData = await connection(findOfferingDataSql)
        //  console.log("data", findtechnologiesData)
        offeringMasterArray.push(findOfferingData[0])
        //   console.log("find",technologiesArray)

      };
      result[i].offering = offeringMasterArray
      offeringMasterArray = []
    }
    res.render("offeringMaster.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}




module.exports.addOfferingMaster = async (req, res) => {
  try {
    const offeringSql = `SELECT * FROM offering where status = 1`
    const offering = await connection(offeringSql)
    res.render("addOfferingMaster.ejs", { result: offering })
  } catch (error) {
    console.log(error)
  }
}


module.exports.addOfferingMasterSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const title = req.body.title
    const offering = req.body.offering
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const offeringMasterSql = `INSERT INTO offering_master (id ,generateId,title ,offering ,status ,type) VALUES ('${''}','${generateId}', '${title}' , '${offering}','${'1'}','${'master'}')`
    const offeringMaster = await connection(offeringMasterSql)
    res.redirect("/offeringMaster")
  } catch (error) {
    console.log(error)
  }
}


module.exports.editOfferingMaster = async (req, res) => {
  try {
    const offeringSql = `SELECT * FROM offering where status = 1`
    const offering = await connection(offeringSql)
    const offeringMasterSql = `SELECT * FROM offering_master where generateId = '${req.params.id}'`
    var offeringMaster = await connection(offeringMasterSql)
    var arr = offeringMaster[0].offering.split(",")
    offeringMaster[0].offering = arr
    console.log(arr)
    res.render("editOfferingMaster.ejs", { result: offeringMaster[0], offering: offering })
  } catch (error) {
    console.log(error)
  }
}


module.exports.editOfferingMasterSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const title = req.body.title
    const offering = req.body.offering
    const sql = `UPDATE offering_master set  title = '${title}' , offering = '${offering}'  where generateId = '${id}'`
    const result = await connection(sql)
    res.redirect("/offeringMaster")
  } catch (error) {
    console.log(error)
  }
}






module.exports.industriesMaster = async (req, res) => {
  try {
    const industriesMasterSql = `SELECT * FROM industries_master`
    var result = await connection(industriesMasterSql)
    var industriesMasterArray = []
    for (let i = 0; i < result.length; i++) {
      const element = result[i].industries;
      //  console.log(element)
      var arr = element.split(",")
      // console.log("arr",arr)

      for (let j = 0; j < arr.length; j++) {
        const element2 = arr[j];
        const findIndustriesDataSql = `SELECT * FROM industries where generateId ='${element2}'`
        const findIndustriesData = await connection(findIndustriesDataSql)
        //  console.log("data", findtechnologiesData)
        industriesMasterArray.push(findIndustriesData[0])
        //   console.log("find",technologiesArray)

      };
      result[i].industries = industriesMasterArray
      industriesMasterArray = []
    }
    res.render("industriesMaster.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}




module.exports.addIndustriesMaster = async (req, res) => {
  try {
    const industriesSql = `SELECT * FROM industries where status = 1`
    const industries = await connection(industriesSql)
    res.render("addIndustriesMaster.ejs", { result: industries })
  } catch (error) {
    console.log(error)
  }
}


module.exports.addIndustriesMasterSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const title = req.body.title
    const industries = req.body.industries
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const offeringMasterSql = `INSERT INTO industries_master (id ,generateId,title ,industries ,status ,type) VALUES ('${''}', '${generateId}','${title}' , '${industries}','${'1'}','${'master'}')`
    const offeringMaster = await connection(offeringMasterSql)
    res.redirect("/industriesMaster")
  } catch (error) {
    console.log(error)
  }
}


module.exports.editIndustriesMaster = async (req, res) => {
  try {
    const industriesSql = `SELECT * FROM industries where status = 1`
    const industries = await connection(industriesSql)
    const industriesMasterSql = `SELECT * FROM industries_master where generateId = '${req.params.id}'`
    var industriesMaster = await connection(industriesMasterSql)
    var arr = industriesMaster[0].industries.split(",")
    industriesMaster[0].industries = arr
    console.log(arr)
    res.render("editIndustriesMaster.ejs", { result: industriesMaster[0], industries: industries })
  } catch (error) {
    console.log(error)
  }
}


module.exports.editIndustriesMasterSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const title = req.body.title
    const industries = req.body.industries
    const sql = `UPDATE industries_master set  title = '${title}' , industries = '${industries}'  where generateId = '${id}'`
    const result = await connection(sql)
    res.redirect("/industriesMaster")
  } catch (error) {
    console.log(error)
  }
}








module.exports.awardsMaster = async (req, res) => {
  try {

    const awardsMasterSql = `SELECT * FROM awards_master`
    var result = await connection(awardsMasterSql)
    var awardsMasterArray = []
    for (let i = 0; i < result.length; i++) {
      const element = result[i].awards;
      //  console.log(element)
      var arr = element.split(",")
      // console.log("arr",arr)

      for (let j = 0; j < arr.length; j++) {
        const element2 = arr[j];
        const findAwardsDataSql = `SELECT * FROM awards where generateId ='${element2}'`
        const findAwardsData = await connection(findAwardsDataSql)
        //  console.log("data", findtechnologiesData)
        awardsMasterArray.push(findAwardsData[0])
        //   console.log("find",technologiesArray)

      };
      result[i].awards = awardsMasterArray
      awardsMasterArray = []
    }
    res.render("awardsMaster.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}




module.exports.addAwardsMaster = async (req, res) => {
  try {
    const awardsSql = `SELECT * FROM awards where status = 1`
    const awards = await connection(awardsSql)
    res.render("addAwardsMaster.ejs", { result: awards })
  } catch (error) {
    console.log(error)
  }
}


module.exports.addAwardsMasterSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const title = req.body.title
    const awards = req.body.awards
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const awardsMasterSql = `INSERT INTO awards_master (id ,generateId,title ,awards ,status ,type) VALUES ('${''}','${generateId}', '${title}' , '${awards}','${'1'}','${'master'}')`
    const awardsMaster = await connection(awardsMasterSql)
    res.redirect("/awardsMaster")
  } catch (error) {
    console.log(error)
  }
}


module.exports.editAwardsMaster = async (req, res) => {
  try {
    const awardsSql = `SELECT * FROM awards where status = 1`
    const awards = await connection(awardsSql)
    const awardsMasterSql = `SELECT * FROM awards_master where generateId = '${req.params.id}'`
    var awardsMaster = await connection(awardsMasterSql)
    var arr = awardsMaster[0].awards.split(",")
    awardsMaster[0].awards = arr
    console.log(arr)
    res.render("editAwardsMaster.ejs", { result: awardsMaster[0], awards: awards })
  } catch (error) {
    console.log(error)
  }
}


module.exports.editAwardsMasterSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const title = req.body.title
    const awards = req.body.awards
    const sql = `UPDATE awards_master set  title = '${title}' , awards = '${awards}'  where generateId = '${id}'`
    const result = await connection(sql)
    res.redirect("/awardsMaster")
  } catch (error) {
    console.log(error)
  }
}






module.exports.blogMaster = async (req, res) => {
  try {

    const blogMasterSql = `SELECT * FROM blogs_master`
    var result = await connection(blogMasterSql)
    var blogMasterArray = []
    for (let i = 0; i < result.length; i++) {
      const element = result[i].blogs;
      //  console.log(element)
      var arr = element.split(",")
      // console.log("arr",arr)

      for (let j = 0; j < arr.length; j++) {
        const element2 = arr[j];
        const blogDataSql = `SELECT * FROM blogs where generateId ='${element2}'`
        const blogData = await connection(blogDataSql)
        //  console.log("data", findtechnologiesData)
        blogMasterArray.push(blogData[0])
        //   console.log("find",technologiesArray)

      };
      result[i].blogs = blogMasterArray
      blogMasterArray = []
    }
    res.render("blogMaster.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}




module.exports.addBlogMaster = async (req, res) => {
  try {
    const blogsSql = `SELECT * FROM blogs where status = 1`
    const blogs = await connection(blogsSql)
    res.render("addBlogMaster.ejs", { result: blogs })
  } catch (error) {
    console.log(error)
  }
}


module.exports.addBlogMasterSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const title = req.body.title
    const blogs = req.body.blogs
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const awardsBlogSql = `INSERT INTO blogs_master (id ,generateId,title ,blogs ,status ,type) VALUES ('${''}', '${generateId}','${title}' , '${blogs}','${'1'}','${'master'}')`
    const awardsBlog = await connection(awardsBlogSql)
    res.redirect("/blogMaster")
  } catch (error) {
    console.log(error)
  }
}


module.exports.editBlogMaster = async (req, res) => {
  try {
    const blogsSql = `SELECT * FROM blogs where status = 1`
    const blogs = await connection(blogsSql)
    const blogMasterSql = `SELECT * FROM blogs_master where generateId = '${req.params.id}'`
    var blogMaster = await connection(blogMasterSql)
    var arr = blogMaster[0].blogs.split(",")
    blogMaster[0].blogs = arr
    console.log(arr)
    res.render("editBlogMaster.ejs", { result: blogMaster[0], blogs: blogs })
  } catch (error) {
    console.log(error)
  }
}


module.exports.editBlogMasterSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const title = req.body.title
    const blogs = req.body.blogs
    const sql = `UPDATE blogs_master set  title = '${title}' , blogs = '${blogs}'  where generateId = '${id}'`
    const result = await connection(sql)
    res.redirect("/blogMaster")
  } catch (error) {
    console.log(error)
  }
}





module.exports.logoMaster = async (req, res) => {
  try {

    const logoMasterSql = `SELECT * FROM logo_master`
    const logoMaster = await connection(logoMasterSql)
    res.render("logoMaster.ejs", { result: logoMaster })
  } catch (error) {
    console.log(error)
  }
}


module.exports.addLogoMaster = async (req, res) => {
  try {
    res.render("addLogoMaster.ejs")
  } catch (error) {
    console.log(error)
  }
}


module.exports.addLogoMasterSubmit = async (req, res) => {
  try {
    console.log(req.body, req.files)
    const title = req.body.title
    const tooltip = req.body.tooltip
    const logo = req.files.logo[0].filename
    const inverseLogo = req.files.inverseLogo[0].filename
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const awardsBlogSql = `INSERT INTO logo_master (id ,generateId,title ,logo, inverseLogo , tooltip ,status) VALUES ('${''}','${generateId}', '${title}' , '${logo}','${inverseLogo}','${tooltip}','${'1'}')`
    const awardsBlog = await connection(awardsBlogSql)
    res.redirect("/logoMaster")
  } catch (error) {
    console.log(error)
  }
}


module.exports.editLogoMaster = async (req, res) => {
  try {

    const logoMasterSql = `SELECT * FROM logo_master where generateId = '${req.params.id}'`
    var logoMaster = await connection(logoMasterSql)
    res.render("editLogoMaster.ejs", { result: logoMaster[0] })
  } catch (error) {
    console.log(error)
  }
}


module.exports.editLogoMasterSubmit = async (req, res) => {
  try {

    const id = req.params.id
    const title = req.body.title
    const tooltip = req.body.tooltip
    const sql = `SELECT * FROM logo_master where generateId = '${id}'`
    const result = await connection(sql)
    console.log(result)
    var logo = result[0].logo
    var inverseLogo = result[0].inverseLogo
    if (req.files.logo) {
      logo = req.files.logo[0].filename
    }
    if (req.files.backLogo) {
      inverseLogo = req.files.inverseLogo[0].filename
    }
    if (req.files.backgroundImage) {
      backgroundImage = req.files.backgroundImage[0].filename
    }
    const editLogoMasterSql = `UPDATE logo_master set title = '${title}', logo = '${logo}', inverseLogo = '${inverseLogo}', tooltip = '${tooltip}'  where generateId = '${id}'`
    const editLogoMaster = await connection(editLogoMasterSql)
    res.redirect("/logoMaster")
  } catch (error) {
    console.log(error)
  }
}




module.exports.menuMaster = async (req, res) => {
  try {

    const menuMasterSql = `SELECT * FROM menu_master`
    var result = await connection(menuMasterSql)
    var menuMasterArray = []
    for (let i = 0; i < result.length; i++) {
      const element = result[i].menu;
      //  console.log(element)
      var arr = element.split(",")
      // console.log("arr",arr)

      for (let j = 0; j < arr.length; j++) {
        const element2 = arr[j];
        const menuDataSql = `SELECT * FROM menu_list where generateId ='${element2}'`
        const menuData = await connection(menuDataSql)
        //  console.log("data", findtechnologiesData)
        menuMasterArray.push(menuData[0])
        //   console.log("find",technologiesArray)

      };
      result[i].menu = menuMasterArray
      menuMasterArray = []
    }
    res.render("menuMaster.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}




module.exports.addMenuMaster = async (req, res) => {
  try {
    const menuMasterSql = `SELECT * FROM menu_list where status = 1 and level = '0'`
    const menuMaster = await connection(menuMasterSql)
    res.render("addMenuMaster.ejs", { result: menuMaster })
  } catch (error) {
    console.log(error)
  }
}


module.exports.addMenuMasterSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const title = req.body.title
    const menu = req.body.menu
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const menuMasterSql = `INSERT INTO menu_master (id ,generateId,title ,menu ,status ,type) VALUES ('${''}','${generateId}', '${title}' , '${menu}','${'1'}','${'master'}')`
    const menuMaster = await connection(menuMasterSql)
    res.redirect("/menuMaster")
  } catch (error) {
    console.log(error)
  }
}


module.exports.editMenuMaster = async (req, res) => {
  try {
    const menuSql = `SELECT * FROM menu_list where status = 1 and level = '0'`
    const menu = await connection(menuSql)
    const menuMasterSql = `SELECT * FROM menu_master where generateId = '${req.params.id}'`
    var menuMaster = await connection(menuMasterSql)
    var arr = menuMaster[0].menu.split(",")
    menuMaster[0].menu = arr
    console.log(arr)
    res.render("editMenuMaster.ejs", { result: menuMaster[0], menu: menu })
  } catch (error) {
    console.log(error)
  }
}


module.exports.editMenuMasterSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const title = req.body.title
    const menu = req.body.menu
    const sql = `UPDATE menu_master set  title = '${title}' , menu = '${menu}'  where generateId = '${id}'`
    const result = await connection(sql)
    res.redirect("/menuMaster")
  } catch (error) {
    console.log(error)
  }
}



module.exports.headerMaster = async (req, res) => {
  try {

    const headerMasterSql = `SELECT * FROM header_master`
    var headerMaster = await connection(headerMasterSql)
    var logoSectionArray = []
    var menuSectionArray = []
    for (let i = 0; i < headerMaster.length; i++) {
      const logoSectionId = headerMaster[i].logoSection;
      const menuSectionId = headerMaster[i].menuSection;
        const logoDataSql = `SELECT * FROM logo_master where generateId ='${logoSectionId}'`
        const logoData = await connection(logoDataSql)
        const menuDataSql = `SELECT * FROM menu_master where generateId ='${menuSectionId}'`
        const menuData = await connection(menuDataSql)
        logoSectionArray.push(logoData[0])
        menuSectionArray.push(menuData[0])

        headerMaster[i].logoSection = logoSectionArray
        headerMaster[i].menuSection = menuSectionArray
       logoSectionArray = []
       menuSectionArray = []
    }

    res.render("headerMaster.ejs",{result:headerMaster})
  } catch (error) {
    console.log(error)
  }
}




module.exports.addHeaderMaster = async (req, res) => {
  try {
    const menuMasterSql = `SELECT * FROM menu_master where status = 1`
    const menuMaster = await connection(menuMasterSql)
    const logoMasterSql = `SELECT * FROM logo_master where status = 1`
    const logoMaster = await connection(logoMasterSql)
    res.render("addHeaderMaster.ejs", { menus: menuMaster, logos: logoMaster })
  } catch (error) {
    console.log(error)
  }
}


module.exports.addHeaderMasterSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const title = req.body.title
    const menuSection = req.body.menuSection
    const logoSection = req.body.logoSection
    let generateId = otpGenerator.generate(10, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const headerMasterSql = `INSERT INTO header_master (id ,generateId,title ,menuSection , logoSection ,status ,type) VALUES ('${''}','${generateId}', '${title}' , '${menuSection}','${logoSection}','${'1'}','${'master'}')`
    const headerMaster = await connection(headerMasterSql)
    res.redirect("/headerMaster")
  } catch (error) {
    console.log(error)
  }
}


module.exports.editHeaderMaster = async (req, res) => {
  try {
    const menuMasterSql = `SELECT * FROM menu_master where status = 1`
    const menuMaster = await connection(menuMasterSql)
    const logoMasterSql = `SELECT * FROM logo_master where status = 1`
    const logoMaster = await connection(logoMasterSql)
    const headerMasterSql = `SELECT * FROM header_master where generateId = '${req.params.id}'`
    var headerMaster = await connection(headerMasterSql)
   
    res.render("editHeaderMaster.ejs", { headerMaster: headerMaster[0], menuMaster: menuMaster,logoMaster:logoMaster })
  } catch (error) {
    console.log(error)
  }
}


module.exports.editHeaderMasterSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const title = req.body.title
    const menuSection = req.body.menuSection
    const logoSection = req.body.logoSection
    const sql = `UPDATE header_master set  title = '${title}' , menuSection = '${menuSection}', logoSection = '${logoSection}'  where generateId = '${id}'`
    const result = await connection(sql)
    res.redirect("/headerMaster")
  } catch (error) {
    console.log(error)
  }
}





module.exports.createPageMaster = async (req, res) => {
  try {

    const createPageSql = `SELECT * FROM createpage_master`
    const createPage = await connection(createPageSql)
  
    for (let i = 0; i < createPage.length; i++) {
      const element = createPage[i];
      
      const headerMasterSql = `SELECT * FROM header_master where generateId = '${element.header}'`
      const headerMaster = await connection(headerMasterSql)
      element.header = headerMaster

      const sliderMasterSql = `SELECT * FROM slaider_master where generateId = '${element.slider}'`
      const sliderMaster = await connection(sliderMasterSql)
      element.slider = sliderMaster

      const clientsMasterSql = `SELECT * FROM clients_master where generateId = '${element.client}'`
      const clientsMaster = await connection(clientsMasterSql)
      element.client = clientsMaster

      const successStoryMasterSql = `SELECT * FROM successStory_master where generateId = '${element.successStories}'`
      const successStoryMaster = await connection(successStoryMasterSql)
      element.successStory = successStoryMaster

      const technologisMasterSql = `SELECT * FROM technologies_master where generateId = '${element.technologies}'`
      const technologisMaster = await connection(technologisMasterSql)
      element.technologies = technologisMaster

      const offeringMasterSql = `SELECT * FROM offering_master where generateId  = '${element.offering}'`
      const offeringMaster = await connection(offeringMasterSql)
      element.offering = offeringMaster

      const industriesMasterSql = `SELECT * FROM industries_master where generateId = '${element.industries}'`
      const industriesMaster = await connection(industriesMasterSql)
      element.industries = industriesMaster


      const awardsMasterSql = `SELECT * FROM awards_master where generateId = '${element.awards}'`
      const awardsMaster = await connection(awardsMasterSql)
      element.award = awardsMaster


      const blogsMasterSql = `SELECT * FROM blogs_master where generateId = '${element.blog}'`
      const blogsMaster = await connection(blogsMasterSql)
      element.blog = blogsMaster
    }
   // console.log(createPage)
  
    res.render("createPageMaster.ejs",{createPage:createPage})
 
  } catch (error) {
    console.log(error)
  }
}




module.exports.detailsCreatePageMaster = async (req, res) => {
  try {

    const createPageSql = `SELECT * FROM createpage_master where id = '${req.params.id}'`
    const createPage = await connection(createPageSql)
  
    for (let i = 0; i < createPage.length; i++) {
      const element = createPage[i];
      
      const headerMasterSql = `SELECT * FROM header_master where generateId = '${element.header}'`
      const headerMaster = await connection(headerMasterSql)
      element.header = headerMaster

      const sliderMasterSql = `SELECT * FROM slaider_master where generateId = '${element.slider}'`
      const sliderMaster = await connection(sliderMasterSql)
      element.slider = sliderMaster

      const clientsMasterSql = `SELECT * FROM clients_master where generateId = '${element.client}'`
      const clientsMaster = await connection(clientsMasterSql)
      element.client = clientsMaster

      const successStoryMasterSql = `SELECT * FROM successStory_master where generateId = '${element.successStory}'`
      const successStoryMaster = await connection(successStoryMasterSql)
      element.successStory = successStoryMaster

      const technologisMasterSql = `SELECT * FROM technologies_master where generateId = '${element.technologies}'`
      const technologisMaster = await connection(technologisMasterSql)
      element.technologies = technologisMaster

      const offeringMasterSql = `SELECT * FROM offering_master where generateId = '${element.offering}'`
      const offeringMaster = await connection(offeringMasterSql)
      element.offering = offeringMaster

      const industriesMasterSql = `SELECT * FROM industries_master where generateId = '${element.industries}'`
      const industriesMaster = await connection(industriesMasterSql)
      element.industries = industriesMaster


      const awardsMasterSql = `SELECT * FROM awards_master where generateId = '${element.award}'`
      const awardsMaster = await connection(awardsMasterSql)
      element.award = awardsMaster


      const blogsMasterSql = `SELECT * FROM blogs_master where generateId = '${element.blog}'`
      const blogsMaster = await connection(blogsMasterSql)
      element.blog = blogsMaster
    }
    console.log(createPage)
  
    res.render("detailsCreatePageMaster.ejs",{createPage:createPage[0]})
 
  } catch (error) {
    console.log(error)
  }
}




module.exports.addCreatePageMaster = async (req, res) => {
  try {
    const menuSql = `SELECT * FROM menu_list where page_isComplete = 0`
    const menu = await connection(menuSql)
    const headerMasterSql = `SELECT * FROM header_master where status = 1`
    const headerMaster = await connection(headerMasterSql)
    const sliderMasterSql = `SELECT * FROM slaider_master where status = 1`
    const sliderMaster = await connection(sliderMasterSql)
    const clientsMasterSql = `SELECT * FROM clients_master where status = 1`
    const clientsMaster = await connection(clientsMasterSql)
    const successStoryMasterSql = `SELECT * FROM successStory_master where status = 1`
    const successStoryMaster = await connection(successStoryMasterSql)
    const technologisMasterSql = `SELECT * FROM technologies_master where status = 1`
    const technologisMaster = await connection(technologisMasterSql)
    const offeringMasterSql = `SELECT * FROM offering_master where status = 1`
    const offeringMaster = await connection(offeringMasterSql)
    const industriesMasterSql = `SELECT * FROM industries_master where status = 1`
    const industriesMaster = await connection(industriesMasterSql)
    const awardsMasterSql = `SELECT * FROM awards_master where status = 1`
    const awardsMaster = await connection(awardsMasterSql)
    const blogsMasterSql = `SELECT * FROM blogs_master where status = 1`
    const blogsMaster = await connection(blogsMasterSql)
   // console.log(headerMaster)
    res.render("addCreatePageMaster.ejs",{
      menu:menu,
      header: headerMaster , 
      slider:sliderMaster , 
      clients:clientsMaster ,
      successStory:successStoryMaster ,
      technologies:technologisMaster , 
      offering:offeringMaster , 
      industries:industriesMaster , 
      awards:awardsMaster , 
      blogs:blogsMaster
    })
  } catch (error) {
    console.log(error)
  }
}


module.exports.addCreatePageMasterSubmit = async (req, res) => {
  try {
    console.log(req.body)
    // const title = req.body.title
    const title = req.body.title
    const headerSr = req.body.headerSr
    const header = req.body.header
    const sliderSr = req.body.sliderSr
    const slider = req.body.slider
    const clientsSr = req.body.clientsSr
    const clients = req.body.clients
    const successStorySr = req.body.successStorySr
    const successStory = req.body.successStory
    const technologiesSr = req.body.technologiesSr
    const technologies = req.body.technologies
    const offeringSr = req.body.offeringSr
    const offering = req.body.offering
    const industriesSr = req.body.industriesSr
    const industries = req.body.industries
    const awardsSr = req.body.awardsSr
    const awards = req.body.awards
    const blogSr = req.body.blogSr
    const blogs = req.body.blogs
    const menuLink = req.body.menu
    
    const sql = `UPDATE menu_list set  page_isComplete = '${'1'}' where slug = '${menuLink}'`
    const result = await connection(sql)

    const createPageMasterSql = `INSERT INTO createpage_master (id ,header ,slider ,client ,successStory , technologies ,offering , industries ,award , blog , title ,headerSr ,sliderSr ,clientSr,successStorySr,technologiesSr,offeringSr,industriesSr,awardsSr,blogSr , type ,status , menuLink) VALUES ('${''}', '${header}' , '${slider}','${clients}','${successStory}','${technologies}','${offering}','${industries}','${awards}','${blogs}','${title}','${headerSr}','${sliderSr}','${clientsSr}','${successStorySr}','${technologiesSr}','${offeringSr}','${industriesSr}','${awardsSr}','${blogSr}','${'master'}','${'1'}' , '${menuLink}')`
    const createPageMaster = await connection(createPageMasterSql)
     res.redirect("/createPageMaster")
  } catch (error) {
    console.log(error)
  }
}


module.exports.editCreatePageMaster = async (req, res) => {

  try {

    const createPageSql = `SELECT * FROM createpage_master where id = '${req.params.id}'`
    const createPage = await connection(createPageSql)
    console.log("createPage",createPage)
    const menuSql = `SELECT * FROM menu_list where page_isComplete = 0`
    const menu = await connection(menuSql)
    const headerMasterSql = `SELECT * FROM header_master where status = 1`
    const headerMaster = await connection(headerMasterSql)
    const sliderMasterSql = `SELECT * FROM slaider_master where status = 1`
    const sliderMaster = await connection(sliderMasterSql)
    const clientsMasterSql = `SELECT * FROM clients_master where status = 1`
    const clientsMaster = await connection(clientsMasterSql)
    const successStoryMasterSql = `SELECT * FROM successStory_master where status = 1`
    const successStoryMaster = await connection(successStoryMasterSql)
    const technologisMasterSql = `SELECT * FROM technologies_master where status = 1`
    const technologisMaster = await connection(technologisMasterSql)
    const offeringMasterSql = `SELECT * FROM offering_master where status = 1`
    const offeringMaster = await connection(offeringMasterSql)
    const industriesMasterSql = `SELECT * FROM industries_master where status = 1`
    const industriesMaster = await connection(industriesMasterSql)
    const awardsMasterSql = `SELECT * FROM awards_master where status = 1`
    const awardsMaster = await connection(awardsMasterSql)
    const blogsMasterSql = `SELECT * FROM blogs_master where status = 1`
    const blogsMaster = await connection(blogsMasterSql)
    const options = [
      {"option":1},
      {"option":2},
      {"option":3},
      {"option":4},
      {"option":5},
      {"option":6},
      {"option":7},
      {"option":8},
      {"option":9},
      {"option":10},

      
    ]
   // console.log(headerMaster)
    res.render("editCreatePageMaster.ejs",{
      menu:menu,
      header: headerMaster , 
      slider:sliderMaster , 
      clients:clientsMaster ,
      successStory:successStoryMaster ,
      technologies:technologisMaster , 
      offering:offeringMaster , 
      industries:industriesMaster , 
      awards:awardsMaster , 
      blogs:blogsMaster,
      options:options,
      createPage:createPage[0]
    })
  } catch (error) {
    console.log(error)
  }
}


module.exports.editCreatePageMasterSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const title = req.body.title
    const headerSr = req.body.headerSr
    const header = req.body.header
    const sliderSr = req.body.sliderSr
    const slider = req.body.slider
    const clientsSr = req.body.clientsSr
    const clients = req.body.clients
    const successStorySr = req.body.successStorySr
    const successStory = req.body.successStory
    const technologiesSr = req.body.technologiesSr
    const technologies = req.body.technologies
    const offeringSr = req.body.offeringSr
    const offering = req.body.offering
    const industriesSr = req.body.industriesSr
    const industries = req.body.industries
    const awardsSr = req.body.awardsSr
    const awards = req.body.awards
    const blogSr = req.body.blogSr
    const blogs = req.body.blogs
    const createPageMasterSql = `UPDATE createpage_master set header = '${header}', slider ='${slider}', client ='${clients}', successStory = '${successStory}' , technologies = '${technologies}', offering = '${offering}' , industries = '${industries}' ,award = '${awards}' , blog = '${blogs}' , title = '${title}' ,headerSr = '${headerSr}' ,sliderSr = '${sliderSr}' ,clientSr = '${clientsSr}',successStorySr = '${successStorySr}',technologiesSr = '${technologiesSr}',offeringSr = '${offeringSr}',industriesSr = '${industriesSr}',awardsSr = '${awardsSr}',blogSr = '${blogSr}' where id = '${id}'`
    const createPageMaster = await connection(createPageMasterSql)
     res.redirect("/createPageMaster")
  } catch (error) {
    console.log(error)
  }
}


module.exports.AllQuerys = async (req, res) => {
  try {
    const contectUsSql = `SELECT * FROM contect`
    const contectUs = await connection(contectUsSql)
    res.render("contectUs.ejs", { result:contectUs })
  } catch (error) {
    console.log(error)
  }
}

module.exports.QuerysDetails = async (req, res) => {
  try {
  const id =  req.params.id
    const contectUsDetailsSql = `SELECT * FROM contect where id = '${id}'`
    const contectUsDetails = await connection(contectUsDetailsSql)
    res.render("detailsContectUs.ejs", { result:contectUsDetails[0] })
  } catch (error) {
    console.log(error)
  }
}




