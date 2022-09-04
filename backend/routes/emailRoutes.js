import express from 'express'
import { clientSendMail, sendEmail } from '../controllers/emailController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(sendEmail)
router.route('/contact').post(clientSendMail)

export default router
