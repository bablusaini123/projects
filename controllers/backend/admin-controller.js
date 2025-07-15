
const Admin = require('../../model/admin') 





module.exports.adminHomePage = async (req, res) => {
  try {
  //  const adminData = await Admin.find()
    res.render("backend/index.ejs")
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



