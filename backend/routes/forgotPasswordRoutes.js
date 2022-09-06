import express from 'express'
import { forgotPassword } from '../controllers/forgotPasswordController.js'

const route = express.Router()

route.post('/', forgotPassword)

export default route
