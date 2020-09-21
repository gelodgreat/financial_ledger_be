'use strict'
import { Router } from 'express';
import AuthenticationController from './authentication.controller';

const controller = new AuthenticationController()
const authentication: Router = Router()

authentication
  .route('/auth/login/emailGoogle')
  .post(controller.loginEmailFirebase)

authentication
  .route("/signup/emailAndPasswordGoogle")
  .post(controller.createEmailAndPasswordFirebase)

  export default authentication;