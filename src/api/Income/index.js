'use strict';
const express = require('express');
const router = express.Router();
const incomeController = require('./income.controller');

router.route('/income')
    .get(incomeController.getAllIncome)

module.exports = router;