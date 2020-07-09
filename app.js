const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')
require('dotenv').config()

// Mongo
const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI

mongoose.connect(uri, {
//    dbname: 'tigernodesandreact',
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function(error) {
    if(error) {
      console.log(
        "Error connecting to mongo [%o]", error);
    }
  }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB atlas connected");
})

// Bodyparser
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Routes
const routeIndex = require('./routes/index')

// app.use('/public',
//   express.static(
//     path.join(__dirname, 'static'))
// );

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/', routeIndex);
app.use('/users', require('./routes/users'));

module.exports = app;

