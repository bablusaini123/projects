const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getAllBlog = async (req, res) => {
 
  try {
    const findBlogTitleSql = `SELECT * FROM blog_title`
    const findBlogTitle = await connection(findBlogTitleSql)
    const findBlogSql = `SELECT * FROM blogs`
    const findBlog = await connection(findBlogSql)
    res.status(200).json({ 
        blogTitle:findBlogTitle,
        blogs:findBlog

        
     })
  } catch (error) {
    res.status(200).json({error:error})
  }
}
