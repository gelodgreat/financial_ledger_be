"use strict";
import { Request, Response } from "express";
import { Income } from "../../model";
import { ObjectID } from "mongodb";

export default class IncomeController {
  public async getAllIncome(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const query = req.query;

      const income = userId
        ? await Income.find({ userId: new ObjectID(userId), ...query })
        : await Income.find(query);

      res.status(200).send({
        status: "success",
        message: "Income retrieved successfully",
        data: income,
      });
    } catch (error) {
      res.status(400).send({
        status: "Error",
        message: error,
      });
    }
  }

  public async addIncome(req: Request, res: Response) {
    try {
      const body = req.body;
      const savedIncomePayload = await Income.insertMany(body);
      res.status(201).send({
        status: "success",
        message: "Successfully added income.",
        data: savedIncomePayload,
        uid: ''
      });
    } catch (err) {
      res.status(400).send({
        status: "Error",
        message: err.message,
      });
    }
  }

  public async updateIncome(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const body = req.body;

      const data = {
        date: body["date"],
        income: body["income"],
        description: body["description"],
        uid: ''
      };

      const updatetIncomePayload = await Income.findOneAndUpdate(
        { _id: new ObjectID(id) },
        data,
        { new: true }
      );

      if (updatetIncomePayload == null) {
        throw "Income does not exist.";
      } else {
        res.status(200).send({
          status: "success",
          message: "Successfully updated income.",
          updatedData: updatetIncomePayload,
        });
      }
    } catch (Exception) {
      if (Exception.message !== undefined) {
        if (
          Exception.message.includes(
            "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters"
          )
        ) {
          res.status(422).send({
            type: "ValidationError",
            message: "Income does not exist.",
          });
        }
      } else {
        res.status(422).send({ type: "ValidationError", message: Exception });
      }
    }
  }

  public async deleteIncome(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const body = req.body;
      const data = {
        date: body["date"],
        income: body["income"],
        description: body["description"],
        uid:''
      };
      const deletedIncomePayload = await Income.findOneAndDelete({
        _id: new ObjectID(id),
      });

      if (deletedIncomePayload == null) {
        throw "Income does not exist.";
      } else {
        res.status(200).send({
          status: "success",
          message: "Successfully deleted income.",
          deletedData: deletedIncomePayload,

        });
      }
    } catch (Exception) {
      if (Exception.message !== undefined) {
        if (
          Exception.message.includes(
            "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters"
          )
        ) {
          res.status(422).send({
            type: "ValidationError",
            message: "Income does not exist.",
          });
        }
      } else {
        res.status(422).send({ type: "ValidationError", message: Exception });
      }
    }
  }
}
