'use strict'
import { Request, Response } from 'express'
import { Expense } from '../../model'
import { ObjectID } from 'mongodb'
import { expenseData } from '../../types';
export default class ExpenseController {
  public async getAllExpenses(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const query = req.query

      const expense = userId
        ? await Expense.find({ userId: new ObjectID(userId), ...query })
        : await Expense.find(query)

      res.status(200).send({
        status: 'success',
        message: 'Expenses retrieved successfully',
        data: expense
      })
    } catch (error) {
      res.status(400).send({
        status: 'Error',
        message: error
      })
    }
  }

  public async addExpense(req: Request, res: Response) {
    try {
      const body = req.body
      const data: expenseData = {
        date: body['date'],
        expense: body['expense'],
        description: body['description'],
        uid: ''
      }

      const expenseData = new Expense(data)
      const expense = await expenseData.save()
      res.status(200).send({
        status: 'success',
        message: 'Expenses added successfully',
        data: expense
      })
    } catch (error) {
      res.status(400).send({
        status: 'Error',
        message: error
      })
    }
  }

  public async updateExpense(req: Request, res: Response) {
    try {
      const expenseId = req.params.id
      const body = req.body
      const data = {
        date: body['date'],
        expense: body['expense'],
        description: body['description'],
        user: ''
      }

      const expenseData = Expense.findOneAndUpdate(
        {
          _id: new ObjectID(expenseId)
        },
        data
      )
      res.status(200).send({
        status: 'success',
        message: 'Expenses updated successfully',
        data: expenseData
      })
    } catch (error) {
      res.status(400).send({
        status: 'Error',
        message: error
      })
    }
  }
}
