import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api'
import Alert from '../components/Alert'

const ResetPasswordScreen = () => {
  const params = useParams()
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [validUrl, setValidUrl] = useState(false)
  const url = `/reset-password/${params.id}/${params.token}`
  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await API.get(url)
        setValidUrl(true)
      } catch (error) {
        setValidUrl(false)
      }
    }
    verifyUrl()
  }, [params, url])
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await API.post(url, { password })

      setMessage(data.message)
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <div className="bg-slate-900 absolute w-full h-full flex flex-col justify-center items-center">
      {validUrl ? (
        <>
          <h1 className="text-2xl text-white mb-5">Forgot password</h1>
          {message && <Alert color="bg-green-500">{message}</Alert>}
          {error && <Alert color="bg-red-500">{error}</Alert>}
          <form onSubmit={submitHandler} className="flex flex-col">
            <label htmlFor="email" className="text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-sm p-2"
            />

            <button className="btn-active my-5 text-white rounded-full py-2">
              Reset password
            </button>
          </form>
        </>
      ) : (
        <h1 className="text-3xl text-white">404 not found</h1>
      )}
    </div>
  )
}

export default ResetPasswordScreen
