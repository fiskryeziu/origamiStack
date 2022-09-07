import nodemailer from 'nodemailer'

export const sendResetMail = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_EMAIL,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      text: text,
    })
    console.log('email sent')
  } catch (error) {
    console.log('email not sent!')
    console.log(error)
    return error
  }
}
