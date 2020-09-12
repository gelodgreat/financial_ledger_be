const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { PORT } = process.env;
//Connections
const connection = require('./src/common/connection');
const DataModels = require('./src/model');
//Models
const Users = require('./src/api/Users');
const Expense = require('./src/api/Expenses')
const Income = require('./src/api/Income');

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
// app.use('/', Expense)
// app.use('/', Income);

app.listen(PORT, () => {
    console.log(`Server Running @ ${PORT}`);
})
module.exports = app;