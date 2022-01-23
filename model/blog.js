const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
   title: String,
   body: String,
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   tags: [String],
   createAt: { type: Date, default: Date.now },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Comment'
      }
   ]
})

module.exports = mongoose.model("Blog", blogSchema)