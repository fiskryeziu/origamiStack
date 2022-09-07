// import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import API from '../api'
import Alert from '../components/Alert'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await API.post('/forgot-password', { email })

      setMessage(data.message)
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  return (
    <div className="bg-slate-900 absolute w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-2xl text-white mb-5">Forgot password</h1>
      {message && <Alert color="bg-green-500">{message}</Alert>}
      {error && <Alert color="bg-red-500">{error}</Alert>}
      <form onSubmit={submitHandler} className="flex flex-col">
        <label htmlFor="email" className="text-white">
          Email
        </label>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Enter email"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-sm p-2"
        />
        <button className="btn-active my-5 text-white rounded-full py-2">
          Submit email
        </button>
      </form>
    </div>
  )
}

export default ForgotPasswordScreen
