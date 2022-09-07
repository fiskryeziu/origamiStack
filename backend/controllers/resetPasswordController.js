import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params

  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(401)
    throw new Error('Invalid id...')
  }
  const secret = process.env.JWT_SECRET
  try {
    const payload = jwt.verify(token, secret)
    res.status(200).json({ message: 'Valid Url' })
  } catch (error) {
    res.status(404)
    throw new Error('error')
  }
})

const postResetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body
  const token = req.params.token

  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(401)
    throw new Error('Invalid id...')
  }
  const secret = process.env.JWT_SECRET
  try {
    jwt.verify(token, secret)

    user.password = password

    await user.save()

    res.status(200).json({ message: 'Password reset successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})
export { resetPassword, postResetPassword }
