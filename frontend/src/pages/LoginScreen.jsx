import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { loginActions } from '../reducers/userSlice'
import { useEffect } from 'react'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //nese useri eshte i kyqyr
  useEffect(() => {
    if (userInfo) {
      navigate('/my-account')
    }
  }, [navigate, userInfo])

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
    console.log(formData)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }
    //dispatch login user
    dispatch(loginActions(userData))
  }
  return (
    <>
      <NavBar />
      <div className="flex flex-col h-screen">
        <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16 mx-2">
          <h1 className="text-3xl text-gray-800">Login</h1>
          {error && <Alert color="bg-red-500">{error}</Alert>}
          {loading && <Spinner />}
          <form className="w-full max-w-sm" onSubmit={submitHandler}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                required=""
                value={email}
                placeholder="Email"
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                required=""
                value={password}
                placeholder="password"
                onChange={onChange}
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
            >
              <span>Sign in to account</span>
            </button>
            <p className="mt-8 text-center">
              <Link to="/register" className="text-sm hover:underline">
                Create Account.
              </Link>
            </p>
          </form>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default LoginScreen
