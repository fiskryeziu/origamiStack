import { transporter } from '../server.js'
const sendEmail = (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const message = req.body.messageHtml

  var mail = {
    from: name,
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

  var mail = {
    from: name,
    to: email,
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

export { sendEmail, clientSendMail }
