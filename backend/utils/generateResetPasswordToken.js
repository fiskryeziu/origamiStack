import jwt from 'jsonwebtoken'

const generateResetPasswordToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10min' })
}

export default generateResetPasswordToken
