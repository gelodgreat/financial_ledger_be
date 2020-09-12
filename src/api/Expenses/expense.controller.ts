'use strict'
import { Request, Response } from 'express'
import { Expense } from '../../model'

export default class ExpenseController {
  public async getAllExpenses (req: Request, res: Response) {
    Expense.find((err, income) => {
      if (err) {
        res.send({
          status: 'error',
          message: err
        })
      }
      res.send({
        status: 'success',
        message: 'Contacts retrieved successfully',
        data: income
      })
    })
  }
}
