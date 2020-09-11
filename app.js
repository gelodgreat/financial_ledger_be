const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const db_connection = require('./common/db_connection');
const DataModels = require('./model/DataModels');

const user_api = require('./api/user_api');

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

app.use('/', user_api);

app.listen(8110, () => {
    console.log("Server Running @ 8110");
})
module.exports = app;