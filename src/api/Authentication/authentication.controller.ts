'use strict'
import { Router, Request, Response } from 'express';
import { loginEmail } from '../../common/firebaseAuth';

export default class AuthenticationController {
    public async loginEmailFirebase (req: Request, res: Response) {
       try{
        const body = req.body
        const data = {
          email: body['email'],
          password: body['password']
        }
     await loginEmail(data.email,data.password);

       }catch (err) {
        res.status(400).send({
          status: "Error",
          message: err.message,
        });
      }
}
}