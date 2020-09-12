'use strict';
const express = require('express');
const router = express.Router();
const incomeController = require('./income.controller');

router.route('/income')
    .get(incomeController.getAllIncome)
    //.post(incomeController.addIncomeSingle)
    .post(incomeController.addIncome)

router.route('/income/:id')
    .put(incomeController.updateIncome)
    .delete(incomeController.deleteIncome)


module.exports = router;