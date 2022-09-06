import jwt from 'jsonwebtoken'

const generateResetPasswordToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15min' })
}

export default generateResetPasswordToken
