'use strict'
import { Request, Response } from 'express';
import { loginEmail, createUserWithEmailAndPassword } from '../../common/firebaseAuth';

export default class AuthenticationController {
    public async loginEmailFirebase(req: Request, res: Response) {
       try{
        const body = req.body
        const data = {
          email: body['email'],
          password: body['password']
        }
     const signInInfo = await loginEmail(data.email, data.password);
      res.status(200).send({
        status: "success",
        message: "Successfully logged in.",
        data: signInInfo
    });
       }catch (err) {
        res.status(400).send({
          status: "Error",
          message: err.message,
        });
      }
  }


  public async createEmailAndPasswordFirebase(req: Request, res: Response) {
    try{
     const body = req.body
     const data = {
       email: body['email'],
       password: body['password']
     }
  const signInInfo = await createUserWithEmailAndPassword(data.email, data.password);
  res.status(201).send({
    status: "success",
    message: "Account successfully created.",
    data: signInInfo
});
    }catch (err) {
     res.status(400).send({
       status: "Error",
       message: err.message,
     });
   }
}






}