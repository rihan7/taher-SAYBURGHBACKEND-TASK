const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });

const Blog = require('../model/blog');
const Comment = require('../model/comment');


router.post('/:id/comment', passportJWT, async (req, res, next) => {
   try {
      let blog = await Blog.findById(req.params.id);
      let comment = new Comment(req.body);
      comment.author.id = req.user._id;
      comment.author.name = req.user.name;
      await comment.save();

      blog.comments.push(comment)
      await blog.save()

      return res.status(200).json(blog)
   } catch (error) {
      return res.status(400).json({ error, message: 'Comment not posted' })
   }
});


module.exports = router;