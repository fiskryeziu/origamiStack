import express from 'express'
import {
  clientSendMail,
  sendEmailHtml,
} from '../controllers/emailController.js'

const router = express.Router()

router.route('/').post(sendEmailHtml)
router.route('/contact').post(clientSendMail)

export default router
