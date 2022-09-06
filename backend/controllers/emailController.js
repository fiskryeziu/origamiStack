import { transporter } from '../server.js'
const sendEmailHtml = (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const message = req.body.messageHtml

  const mail = {
    from: email,
    to: email,
    subject: 'Origami Handmade',
    html: message,
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail',
      })
    } else {
      res.json({
        msg: 'success',
      })
    }
  })
}

const clientSendMail = (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const text = req.body.text
  const mail = {
    from: `${name} <${email}>`,
    to: process.env.EMAIL,
    subject: 'Email from Origami Contact form',
    text: text,
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail',
      })
    } else {
      res.json({
        msg: 'success',
      })
    }
  })
}

export { sendEmailHtml, clientSendMail }
