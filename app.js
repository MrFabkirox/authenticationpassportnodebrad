const express = require('express');
const expressLayouts = require('express-ejs-layouts')

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

