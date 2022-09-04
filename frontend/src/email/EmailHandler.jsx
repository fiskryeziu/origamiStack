import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import ClientEmail from './ClientEmail'
import { renderEmail } from 'react-html-email'

const EmailHandler = () => {
  const [name, setName] = useState('fisnik')
  const [email, setEmail] = useState('fiskryeziu@gmail.com')
  const [feedback, setFeedback] = useState('qkemi')

  function handleSubmit(event) {
    event.preventDefault()
    const sendMail = async () => {
      const messageHtml = renderEmail(<ClientEmail />)
      const response = await axios.post('/send', { name, email, messageHtml })
      if (response.data.msg === 'success') {
        alert('Email sent, awesome!')
      } else if (response.data.msg === 'fail') {
        alert('Oops, something went wrong. Try again')
      }
    }
    sendMail()
    //     axios({
    //       method: 'POST',
    //       url: 'http://localhost:5000/send',
    //       data: {
    //         name: name,
    //         email: email,
    //         messageHtml: messageHtml,
    //       },
    //     }).then((response) => {
    //       if (response.data.msg === 'success') {
    //         alert('Email sent, awesome!')
    //       } else if (response.data.msg === 'fail') {
    //         alert('Oops, something went wrong. Try again')
    //       }
    //     })
  }
  return (
    <button type="submit" onClick={handleSubmit}>
      Send
    </button>
    //nrregulll a vazhdojm me dizajn t projektit tash
    // <ClientEmail name={name} email={email} />
  )
}

export default EmailHandler
