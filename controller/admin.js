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
          let userId = result[0].id
           
         //  const token = jwt.sign({ userId }, "zxcvbnm")
         // httpMsgs.send500(req, res, token);
          res.cookie("token", "token")
          res.status(200).json({ message: "successfully login" })

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



// SLIDER


module.exports.slider = async (req, res) => {
  try {

    const sql = `SELECT * FROM slider`
    const result = await connection(sql)
  //  res.json({message:result})
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
    
    const heading = req.body.heading
    const description = req.body.description
    const image = req.files.image[0].filename
   let generateId = Math.floor((Math.random() * 1000000) + 1);
    const sql = `INSERT INTO slider ( id ,generateId, image , heading , description , status) VALUES ('${''}','${generateId}','${image}','${heading}','${description}','${'1'}')`
    const result = await connection(sql)
    res.redirect("/slider")
    
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
    if (req.files.image) {
     const image = req.files.image[0].filename
      const editSliderSql = `UPDATE slider set image = '${image}', heading = '${heading}', description = '${description}' where generateId = '${id}'`
      const editSliderResult = await connection(editSliderSql)
      res.redirect("/slider")
    } else {
      const editSliderSql = `UPDATE slider set heading = '${heading}', description = '${description}'  where generateId = '${id}'`
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
    const query = `DELETE FROM slider where generateId="${id}"`
    const result = await connection(query)
    res.redirect("/slider")

  } catch (error) {
    console.log(error)
  }
}


// Clients


module.exports.clients = async (req, res) => {
  try {

    const sql = `SELECT * FROM technologies_list`
    const result = await connection(sql)
    console.log(result)
  //  res.json({message:result})
    res.render("clients.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}

// ADD TECHNOLOGIES


module.exports.addClients = async (req, res) => {
  try {
    res.render("addClients")
  } catch (error) {
    console.log(error)
  }
}


// ADD Clients


module.exports.addClientsSubmit = async (req, res) => {
  try {
    console.log("body", req.body)
    const title = req.body.title
    const url = req.body.url
    const image = req.files.image[0].filename
    let generateId = Math.floor((Math.random() * 1000000) + 1);

    // CREATE SLUG

    let slug = title.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    const findSlugSql = `SELECT * FROM technologies_list where title = '${title}'`
    const findSlug = await connection(findSlugSql)
    if (findSlug.length > 0) {
      let rendom = Math.floor(1000 + Math.random() * 9000);
      slug = slug + "-" + rendom;
    }
    const sql = `INSERT INTO technologies_list ( id , generateId , image , title  , status , slug ) VALUES ('${''}','${generateId}','${image}','${title}','${'1'}' , '${slug}')`
    const result = await connection(sql)
    res.redirect("/clients")
  } catch (error) {
    console.log(error)
  }
}



// EDIT Clients

module.exports.editClients = async (req, res) => {
  try {
  
    const id = req.params.id
    const sql = `SELECT * FROM technologies_list where generateId = '${id}'`
    const result = await connection(sql)
    //  console.log(result)
    res.render("editClients.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT Clients SUBMIT

module.exports.editClientsSubmit = async (req, res) => {
  try {
    console.log(req.files)
    const id = req.params.id

    const title2 = req.body.title2


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
      const editTechnologiesSql = `UPDATE technologies_list set image = '${image}' , title = '${title2}' , slug = '${slug}'  where generateId = '${id}'`
      const editTechnologies = await connection(editTechnologiesSql)
      res.redirect("/clients")
    } else {
      const editTechnologiesSql = `UPDATE technologies_list set title = '${title2}'  , slug = '${slug}'  where generateId = '${id}'`
      const editTechnologies = await connection(editTechnologiesSql)
      res.redirect("/clients")
    }


  } catch (error) {
    console.log(error)
  }
}

// DELETE Clients

module.exports.deleteClients = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM technologies_list where generateId="${id}"`
    const result = await connection(query)
    res.redirect("/clients")

  } catch (error) {
    console.log(error)
  }
}



//  services


module.exports.services = async (req, res) => {
  try {

    const sql = `SELECT * FROM offering`
    const result = await connection(sql)
    console.log(result)
    //res.json({message:result})
    res.render("services.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}

// ADD services

module.exports.addServices = async (req, res) => {
  try {
    res.render("addServices.ejs")
  } catch (error) {
    console.log(error)
  }
}

// ADD services SUBMIT

module.exports.addServicesSubmit = async (req, res) => {
  try {

    const frountLogo = req.files.frountLogo[0].filename
    const heading = req.body.heading
    const description = req.body.description
    const url = req.body.url
    let generateId = Math.floor((Math.random() * 1000000) + 1);


    // CREATE SLUG

    let slug = heading.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    const findSlugSql = `SELECT * FROM offering where heading = '${heading}'`
    const findSlug = await connection(findSlugSql)
    if (findSlug.length > 0) {
      let rendom = Math.floor(1000 + Math.random() * 9000);
      slug = slug + "-" + rendom;
    }

    const sql = `INSERT INTO offering ( id ,backLogo,generateId , heading , description  ,status , slug) VALUES ('${''}' ,'${frountLogo}','${generateId}','${heading}','${description}','${'1'}' , '${slug}')`
    const result = await connection(sql)
    res.redirect("/services")
    
  } catch (error) {
    console.log(error)
  }
}

// EDIT services

module.exports.editServices = async (req, res) => {
  try {
  
    const id = req.params.id
    const sql = `SELECT * FROM offering where generateId = '${id}'`
    const result = await connection(sql)
    console.log(result)
  //  res.json({message:result})
   res.render("editServices.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT services SUBMIT

module.exports.editServicesSubmit = async (req, res) => {
  try {
    console.log(req.body)
    const id = req.params.id
    const ourOfferingTitleId = req.body.id
    const heading = req.body.heading
    const description = req.body.description
    const url = req.body.url


   


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
     if (req.files.frountLogo) {
     const backLogo = req.files.frountLogo[0].filename
       const editOfferingSql = `UPDATE offering set backLogo = '${backLogo}' ,heading = '${heading}',description = '${description}' , slug = '${slug}'  where generateId = '${id}'`
    const editOffering = await connection(editOfferingSql)
    res.redirect("/services")
    }else{
          const editOfferingSql = `UPDATE offering set heading = '${heading}',description = '${description}' , slug = '${slug}'  where generateId = '${id}'`
    const editOffering = await connection(editOfferingSql)
    res.redirect("/services")
    }

  
  } catch (error) {
    console.log(error)
  }
}


// DETAILS  SOLUTIONS

module.exports.detailsServices = async (req, res) => {
  try {
    const id = req.params.id
    const sql = `SELECT * FROM offering where generateId = '${id}'`
    const result = await connection(sql)
    console.log("resssss",result)
  //  res.json({message:result})
    res.render("detailServices.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}


// DELETE services

module.exports.deleteServices = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM offering where generateId="${id}"`
    const result = await connection(query)
    res.redirect("/services")

  } catch (error) {
    console.log(error)
  }
}







// sectors


module.exports.sectors = async (req, res) => {
  try {
    const sql = `SELECT * FROM current_opning`
    const result = await connection(sql)
    // console.log(result)
  //  res.json({message:result})
    res.render("sectors.ejs", { result: result })
  } catch (error) {
    console.log(error)
  }
}

// ADD sectors


module.exports.addSectors = async (req, res) => {
  try {
    res.render("addSectors.ejs")
  } catch (error) {
    console.log(error)
  }
}

// ADD sectors SUBMIT


module.exports.addSectorsSubmit = async (req, res) => {
  try {

    const image = req.files.image[0].filename
    const title = req.body.title
    const brief = req.body.brief
    let generateId = Math.floor((Math.random() * 1000000) + 1);

    // CREATE SLUG

    let slug = title.toLowerCase();
    slug = slug.replace(/ /gi, "-");
    const findSlugSql = `SELECT * FROM current_opning where title = '${title}'`
    const findSlug = await connection(findSlugSql)
    if (findSlug.length > 0) {
      let rendom = Math.floor(1000 + Math.random() * 9000);
      slug = slug + "-" + rendom;
    }
    const sql = `INSERT INTO current_opning ( id ,generateId, image , title , brief_desc , status , slug) VALUES ('${''}','${generateId}','${image}','${title}','${brief}','${'1'}' ,'${slug}')`
    const result = await connection(sql)
    res.redirect("/sectors")
    
  } catch (error) {
    console.log(error)
  }
}



// EDIT sectors

module.exports.editSectors = async (req, res) => {
  try {
    const id = req.params.id
    const sql = `SELECT * FROM current_opning where generateId = '${id}'`
    const result = await connection(sql)
    console.log(result)
    res.render("editSectors.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT sectors SUBMIT

module.exports.editSectorsSubmit = async (req, res) => {
  try {
    const title = req.body.title


    const brief = req.body.brief

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
      const editCurrentOpningSql = `UPDATE current_opning set image = '${image}' ,title = '${title}', brief_desc = '${brief}' where generateId = '${id}'`
      const editCurrentOpning = await connection(editCurrentOpningSql)
      res.redirect("/sectors")
    } else {
      const editCurrentOpningSql = `UPDATE current_opning set title = '${title}', brief_desc = '${brief}'  where generateId = '${id}'`
      const editCurrentOpning = await connection(editCurrentOpningSql)
      res.redirect("/sectors")
    }


  } catch (error) {
    console.log(error)
  }
}





// DELETE sectors

module.exports.deleteSectors = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM current_opning where generateId="${id}"`
    const result = await connection(query)
    res.redirect("/sectors")

  } catch (error) {
    console.log(error)
  }
}

// SOLUTIONS CATEGORY


module.exports.solutionsCategory = async (req, res) => {
  try {

    const sql = `SELECT * FROM solutionscategory`
    const result = await connection(sql)
  //  res.json({message:result})
    res.render("solutionsCategory.ejs", { result: result.reverse() })
  } catch (error) {
    console.log(error)
  }
}

// ADD  SOLUTIONS CATEGORY


module.exports.addSolutionsCategory = async (req, res) => {
  try {

    res.render("addSolutionsCategory.ejs")
  } catch (error) {
    console.log(error)
  }
}


// ADD SOLUTIONS CATEGORY SUBMIT


module.exports.addSolutionsCategorysSubmit = async (req, res) => {
  console.log("rrrrrrr", req.body,req.files)
  try {
    const image = req.files.image[0].filename
    const backgroundImage = req.files.backgroundImage[0].filename
    const title = req.body.title
     const description = req.body.description
    const sql = `INSERT INTO solutionscategory ( id , title , image ,backgroundImage,short_description) VALUES ('${''}','${title}','${image}' , '${backgroundImage}','${description}')`
    const result = await connection(sql)
    res.redirect("/solutionsCategory")
   
 
  } catch (error) {
    console.log(error)
  }
}


// EDIT SOLUTIONS CATEGORY


module.exports.editSolutionsCategory = async (req, res) => {
  try {
    const id = req.params.id
    const sql = `SELECT * FROM solutionscategory where id = '${id}'`
    const result = await connection(sql)
    res.render("editSolutionsCategory.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT SOLUTIONS CATEGORY SUBMIT


module.exports.editSolutionsCategorySubmit = async (req, res) => {
  try {
    console.log("gggggg",req.body)
    const id = req.params.id
    const title = req.body.title
    const description = req.body.description
     if(req.files.backgroundImage && req.files.image){
       const backgroundImage = req.files.backgroundImage[0].filename
       const image = req.files.image[0].filename
      const editSliderSql = `UPDATE solutionscategory set title = '${title}' , backgroundImage = '${backgroundImage}' , image = '${image}' , short_description = '${description}' where id = '${id}'`
    const editSliderResult = await connection(editSliderSql)
    res.redirect("/solutionsCategory")
        
    }
   else if (req.files.image) {
      const image = req.files.image[0].filename
      const editSliderSql = `UPDATE solutionscategory set title = '${title}' , image = '${image}' , short_description = '${description}'  where id = '${id}'`
    const editSliderResult = await connection(editSliderSql)
    res.redirect("/solutionsCategory")
    }
    else if(req.files.backgroundImage){
       const backgroundImage = req.files.backgroundImage[0].filename
      const editSliderSql = `UPDATE solutionscategory set title = '${title}' , backgroundImage = '${backgroundImage}' , short_description = '${description}'  where id = '${id}'`
    const editSliderResult = await connection(editSliderSql)
    res.redirect("/solutionsCategory")
        
    } 
    
    else {
      const editSliderSql = `UPDATE solutionscategory set title = '${title}' , short_description = '${description}' where id = '${id}'`
      const editSliderResult = await connection(editSliderSql)
      res.redirect("/solutionsCategory")
    }
  



  } catch (error) {
    console.log(error)
  }
}

// DELETE SOLUTIONS CATEGORY SUBMIT

module.exports.deleteSolutionsCategory = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM solutionscategory where id="${id}"`
    const result = await connection(query)
     const query2 = `DELETE FROM solutions where category="${id}"`
    const result2 = await connection(query2)
    res.redirect("/solutionsCategory")

  } catch (error) {
    console.log(error)
  }
}





// SOLUTIONS


module.exports.solutions = async (req, res) => {
  try {

    const sql = `SELECT * FROM solutions`
    const result = await connection(sql)
    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      const findCategorySql = `SELECT * FROM solutionscategory where id = '${element.category}'`
      const findCategory = await connection(findCategorySql)
      result[i].category = findCategory[0]
    }
   // console.log(result)
 //  res.json({message:result})
  
    res.render("solutions.ejs", { result: result.reverse() })
  } catch (error) {
    console.log(error)
  }
}

// ADD  SOLUTIONS


module.exports.addSolutions = async (req, res) => {
  try {
    const sql = `SELECT * FROM solutionscategory`
    const result = await connection(sql)
    res.render("addSolutions.ejs",{result:result})
  } catch (error) {
    console.log(error)
  }
}

// ADD SOLUTIONS SUBMIT

module.exports.addSolutionsSubmit = async (req, res) => {
  try {
  //  console.log(req.body)
  
    const category = req.body.category
    const heading = req.body.heading
    const description = req.body.description
    const image = req.files.image[0].filename
  
    const sql = `INSERT INTO solutions ( id ,category,imager , heading , description  , status) VALUES ('${''}','${category}','${image}','${heading}','${description}','${'1'}')`
    const result = await connection(sql)
    res.redirect("/solutions")
 
  } catch (error) {
    console.log(error)
  }
}



// EDIT SOLUTIONS


module.exports.editSolutions = async (req, res) => {
  try {
    const id = req.params.id
    const solutionSql = `SELECT * FROM solutions where id = '${id}'`
    const solution = await connection(solutionSql)
    const sql = `SELECT * FROM solutionscategory`
    const result = await connection(sql)
    res.render("editSolutions.ejs", { result: result,solutions :solution[0]})
  } catch (error) {
    console.log(error)
  }
}

// EDIT SOLUTIONS


module.exports.editSolutionsSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const category = req.body.category
    const heading = req.body.heading
    const description = req.body.description
    console.log("req",req.body)
  
   
    if (req.files.image) {
      const image = req.files.image[0].filename
      const editSliderSql = `UPDATE solutions set imager = '${image}', heading = '${heading}', description = '${description}' , category = '${category}'  where id = '${id}'`
      const editSliderResult = await connection(editSliderSql)
      res.redirect("/solutions")
    } else {
      const editSliderSql = `UPDATE solutions set heading = '${heading}', description = '${description}' , category = '${category}'  where id = '${id}'`
      const editSliderResult = await connection(editSliderSql)
      res.redirect("/solutions")
    }


  } catch (error) {
    console.log(error)
  }
}


// DETAILS  SOLUTIONS

module.exports.detailsSolutions = async (req, res) => {
  try {
    const id = req.params.id
    const sql = `SELECT * FROM solutions where id = '${id}'`
    const result = await connection(sql)
    console.log("resssss",result)
   // res.json({message:result})
    res.render("detailSolutions.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}

// DELETE SOLUTIONS

module.exports.deleteSolutions = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM solutions where id="${id}"`
    const result = await connection(query)
    res.redirect("/solutions")

  } catch (error) {
    console.log(error)
  }
}

module.exports.contectUs = async (req, res) => {
  try {

    const sql = `SELECT * FROM contectus`
    const result = await connection(sql)
  
    res.render("contectUs.ejs", { result: result.reverse() })
  } catch (error) {
    console.log(error)
  }
}

module.exports.detailsContectUs = async (req, res) => {
  try {
    const id = req.params.id
    const sql = `SELECT * FROM contectus where id = '${id}'`
    const result = await connection(sql)
    console.log("resssss",result)
   // res.json({message:result})
    res.render("detailContectUs.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}

module.exports.applyJob = async (req, res) => {
  try {

  const sql = `SELECT * FROM applyjob`
  const result = await connection(sql)
  res.render("applyJob.ejs", { result: result.reverse() })
  } catch (error) {
    console.log(error)
  }
}


// broshure


module.exports.broshure = async (req, res) => {
  try {

    const sql = `SELECT * FROM broshure`
    const result = await connection(sql)
  //  res.json({message:result})
    res.render("broshure.ejs", { result: result.reverse() })
  } catch (error) {
    console.log(error)
  }
}

// ADD Broshure


module.exports.addBroshure = async (req, res) => {
  try {

    res.render("addBroshure.ejs")
  } catch (error) {
    console.log(error)
  }
}

// ADD Broshure SUBMIT

module.exports.addBroshureSubmit = async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.files)
    const heading = req.body.heading
    const description = req.body.description
    const pdf = req.files.pdf[0].filename
   
    const sql = `INSERT INTO broshure ( id , pdf , heading , description , status) VALUES ('${''}','${pdf}','${heading}','${description}','${'1'}')`
    const result = await connection(sql)
    res.redirect("/broshure")
    // console.log("body",req.body)
    // console.log("files",req.files)
  } catch (error) {
    console.log(error)
  }
}

// EDIT Broshure


module.exports.editBroshure = async (req, res) => {
  try {
    const id = req.params.id
    const sql = `SELECT * FROM broshure where id = '${id}'`
    const result = await connection(sql)
    res.render("editBroshure.ejs", { result: result[0] })
  } catch (error) {
    console.log(error)
  }
}

// EDIT BROSHURE


module.exports.editBroshureSubmit = async (req, res) => {
  try {
    const id = req.params.id
    const heading = req.body.heading
    const description = req.body.description

    if (req.files.pdf) {
      const pdf = req.files.pdf[0].filename
      const editSliderSql = `UPDATE broshure set pdf = '${pdf}', heading = '${heading}', description = '${description}'  where id = '${id}'`
      const editSliderResult = await connection(editSliderSql)
      res.redirect("/broshure")
    } else {
      const editSliderSql = `UPDATE broshure set heading = '${heading}', description = '${description}'  where id = '${id}'`
      const editSliderResult = await connection(editSliderSql)
      res.redirect("/broshure")
    }


  } catch (error) {
    console.log(error)
  }
}

// DELETE Broshure

module.exports.deleteBroshure = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const query = `DELETE FROM broshure where id="${id}"`
    const result = await connection(query)
    res.redirect("/broshure")

  } catch (error) {
    console.log(error)
  }
}



module.exports.getAllBroshure = async (req, res) => {
  try {
 
   const findBroshureSql = `SELECT * FROM broshure`
   const findBroshure = await connection(findBroshureSql)
   res.status(200).json({ 
      
       Broshure:findBroshure

       
    })
  } catch (error) {
   res.status(200).json({error:error})
  }
}







