'use strict'
import { Router } from 'express'
import AuthenticationController from './authentication.controller'

const controller = new AuthenticationController()
const authentication: Router = Router()

authentication
  .route('/auth/login/email')
  .post(controller.loginEmailFirebase)


export default authentication
