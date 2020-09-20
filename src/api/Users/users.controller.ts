"use strict";

import { Request, Response } from "express";
import { User } from "../../model";
import { ObjectID } from "mongodb";
import bcrypt from "bcryptjs";
const saltRounds = 10;

export default class UserController {
  public async getUsers(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const query = req.query;

      const user = userId
        ? await User.find({ userId: new ObjectID(userId), ...query })
        : await User.find(query);

      res.status(200).send({
        status: "success",
        message: "Users retrieved successfully",
        data: user,
      });
    } catch (error) {
      res.status(400).send({
        status: "Error",
        message: error,
      });
    }
  }

  public async authAccess(req: Request, res: Response) {
    try {
      const data = req.body;
      const email = data["email"];
      const password = data["password"];
      if (email && password) {
        const user = await User.findOne({
          email: email,
        });

        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            res.json({
              user: user,
              status: 200,
            });
          } else {
            res.json({
              message: "Incorrect email or password.",
              status: 200,
            });
          }
        } else {
          res.json({
            message: "No user found.",
            status: 200,
          });
        }
      } else {
        res.status(200).json({
          message: "Incomplete field.",
          status: 200,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error,
        status: 400,
      });
    }
  }

  public async addUser(req: Request, res: Response) {
    const data = req.body;
    const password = await bcrypt.hash(data.password, saltRounds);
    data["password"] = password;
    const users = new User(data);
    users
      .save()
      .then((result: any) => {
        console.log(result);
        if (result["errors"]) {
          //   res.json({
          //     status: "error",
          //     message: err,
          //   });
        } else {
          res.json({
            status: "success",
            message: "User Created",
            data: result,
          });
        }
      })
      .catch(
        (
          error: any //temporary any
        ) => {
          res.json({
            status: "error",
            message: error,
          });
        }
      );
  }

  public async updateUser(req: Request, res: Response) {
    User.findByIdAndUpdate(req.params.id, req.body, (err: any, users: any) => {
      if (err) {
        res.status(400).json({
          status: "error",
          message: err,
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "User Created",
          data: users,
        });
      }
    });
  }

  public async deleteUser(req: Request, res: Response) {
    User.findByIdAndDelete(req.params.id, (err: any, success: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log(success);
        res.send(success);
      }
    });
  }
}
