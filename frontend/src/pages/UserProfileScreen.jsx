import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import CustomTitle from '../components/CustomTitle'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Spinner from '../components/Spinner'
import { getUserDetails } from '../reducers/userDetailsSlice'
import { registerActions } from '../reducers/userSlice'
import {
  updateUserProfile,
  userUpdateProfileReset,
} from '../reducers/userUpdateProfileSlice'

const UserProfileScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  })
  const [message, setMessage] = useState(null)
  const { name, email, password, confirmpassword } = formData

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      if (!user || !user.name || success) {
        dispatch(userUpdateProfileReset())
        dispatch(getUserDetails('profile'))
      } else {
        setFormData((prevState) => ({
          ...prevState,
          name: user.name,
          email: user.email,
        }))
      }
    }
  }, [dispatch, navigate, userInfo, user, success])

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const userData = {
      id: user._id,
      name,
      email,
      password,
    }

    if (password !== confirmpassword) {
      setMessage('Passwords do not match')
    } else {
      //dispatch  updateUserProfile
      dispatch(updateUserProfile(userData))
    }
  }
  return (
    <>
      <CustomTitle title="Origami-Handmade | UserProfile" />

      <NavBar />
      <div className="flex flex-col h-screen">
        <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16 mx-2">
          <h1 className="text-3xl text-gray-800">User Profile</h1>
          {message && <Alert color="bg-red-500">{message}</Alert>}
          {error && <Alert color="bg-red-500">{error}</Alert>}
          {loading && <Spinner />}
          <form className="w-full max-w-sm" onSubmit={submitHandler}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                value={name}
                placeholder="Name"
                onChange={onChange}
              />
            </div>
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
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
                value={password}
                placeholder="Password"
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmpassword"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                value={confirmpassword}
                placeholder="Confirm password"
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
            >
              <span>Update</span>
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default UserProfileScreen
