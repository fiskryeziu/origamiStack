import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateResetPasswordToken from '../utils/generateResetPasswordToken.js'
import { sendResetMail } from '../utils/sendEmail.js'

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  } else {
    const token = generateResetPasswordToken(user._id)

    const link = `http://localhost:5000/reset-password/${user._id}/${token}`
    await sendResetMail(user.email, 'Password Reset', link)
    res.send('Password reset link has been sent to your email')
  }

  //   res.send({ message: 'success', email })
})

export { forgotPassword }
