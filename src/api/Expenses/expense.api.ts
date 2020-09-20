"use strict";
import { Router } from "express";
import ExpenseController from "./expense.controller";

const controller = new ExpenseController();
const expense: Router = Router();

expense
  .route("/expense")
  .get(controller.getAllExpenses)
  .post(controller.addExpense);

expense.route("/expense/u/:userId").get(controller.getAllExpenses);
expense.route("/expense/:expenseId").put(controller.updateExpense);

export default expense;
