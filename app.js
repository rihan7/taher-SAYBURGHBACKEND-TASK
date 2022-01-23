const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const passport = require('passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const commentRouter = require('./routes/comment');

const app = express();

mongoose.connect(process.env.DATABASE_URL,
   { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('Database Connected'))
   .catch(error => console.log(error));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog', blogRouter);
app.use('/blog', commentRouter);

module.exports = app;
