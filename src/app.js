const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { PORT } = process.env;

//Connections
const connection = require('./common/connection');
const DataModels = require('./model');

//Models
const Users = require('./api/Users');
const Income = require('./api/Income');
const Expense = require('./api/Expenses');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use('/', Users);
app.use('/', Income);
// app.use('/', Expense)

app.listen(PORT, () => {
    console.log(`Server Running @ ${PORT}`);
})
module.exports = app;