'use strict'
import { Router } from 'express'
import ExpenseController from './expense.controller'

const controller = new ExpenseController()
const expense: Router = Router()
expense.route('/expense').get(controller.getAllExpenses)

export default expense
