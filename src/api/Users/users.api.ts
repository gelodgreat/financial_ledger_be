"use strict";
import { Router } from "express";
import UserController from "./users.controller";

const userController = new UserController();
const user: Router = Router();

user.route("/users").get(userController.getUsers).post(userController.addUser);

user
  .route("/users/:id")
  .get(userController.getUsers)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

user.route("/auth").post(userController.authAccess);

export default user;
