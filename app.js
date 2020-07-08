const express = require('express');
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

// route
const routeIndex = require('./routes/index')

const app = express()

// app.use('/public',
//   express.static(
//     path.join(__dirname, 'static'))
// );

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/', routeIndex);
app.use('/users', require('./routes/users'));

module.exports = app;

