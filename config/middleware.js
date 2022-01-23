const Blog = require("../model/blog")


module.exports = {
   checkUserBlog: async (req, res, next) => {
      try {
         let blog = await Blog.findById(req.params.id).exec();
         if (blog.author.equals(req.user._id)) {
            req.blog = blog;
            next();
         } else {
            return res.status(401).json({ message: 'You are not the author of this blog' })
         }

      } catch (error) {
         return res.status(400).json({ error, message: 'Page not found' })
      }
   }
}