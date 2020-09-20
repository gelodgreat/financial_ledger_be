'use strict';
import { Router } from 'express';
import IncomeController from './income.controller';

const controller = new IncomeController()
const income: Router = Router()

income
    .route('/income')
    .get(controller.getAllIncome)
    .post(controller.addIncome)

income
    .route('/income/:id')
    .put(controller.updateIncome)
    .delete(controller.deleteIncome)

export default income