import express from 'express'
import {
  postResetPassword,
  resetPassword,
} from '../controllers/resetPasswordController.js'

const route = express.Router()

route.get('/:id/:token', resetPassword).post('/:id/:token', postResetPassword)

export default route
