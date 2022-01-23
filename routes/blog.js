const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });

const Blog = require('../model/blog');
const { checkUserBlog } = require('../config/middleware');



router.post('/new', passportJWT, async (req, res, next) => {
   try {
      req.body.author = req.user._id
      req.body.tags = req.body.tags.split(',')
      let blog = new Blog(req.body);
      await blog.save()

      return res.status(200).json(blog)
   } catch (error) {
      return res.status(400).json(error)
   }
});

router.get('/:id', async (req, res, next) => {
   try {
      let blog = await Blog.findById(req.params.id).exec();
      return res.status(200).json(blog)
   } catch (error) {
      return res.status(404).json({ error });
   }
});

router.get('/:id/edit', passportJWT, checkUserBlog, async (req, res, next) => {
   return res.status(200).json({ blog: req.blog })
})

router.put('/:id', passportJWT, checkUserBlog, async (req, res, next) => {
   try {
      let blog = Object.assign(req.blog, req.body)
      await blog.save();
      return res.status(200).json({ message: 'Blog updated successfully' })
   } catch (error) {
      return res.status(400).json({ error, message: 'Blog updated unsuccessfully' })
   }
});

router.delete('/:id', passportJWT, checkUserBlog, async (req, res, nex) => {
   try {
      await req.blog.remove()
      return res.status(200).json({ message: 'Blog deleted successfully' })
   } catch (error) {
      return res.status(400).json({ error, message: 'Blog deleted unsuccessfully' })
   }
})

module.exports = router;