module.exports.checkLogin = async (req, res, next) => {
    if (req.cookies.adminToken === undefined) {
      res.redirect("/");
    } else {
      next();
    }
  };