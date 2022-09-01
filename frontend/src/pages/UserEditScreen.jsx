import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Spinner from '../components/Spinner'
import { getUserDetails, userDetailsReset } from '../reducers/userDetailsSlice'
import { userUpdate, userUpdateReset } from '../reducers/userUpdateSlice'

const UserEditScreen = () => {
  const params = useParams()
  const userId = params.id
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    isAdmin: false,
  })
  const { name, email, isAdmin } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userU = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userU

  useEffect(() => {
    if (successUpdate) {
      dispatch(userUpdateReset())
      dispatch(userDetailsReset())

      navigate('/admin/userList')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setFormData({
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        })
      }
    }
  }, [dispatch, userId, user, successUpdate, navigate])

  const onChange = (e) => {
    if (e.target.type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        isAdmin: !isAdmin,
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }
  }
  console.log(isAdmin)
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      userUpdate({
        _id: userId,
        name,
        email,
        isAdmin,
      })
    )
  }
  return (
    <>
      <NavBar />
      <div className="flex flex-col h-screen">
        <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16 mx-2">
          <h1 className="text-3xl text-gray-800">User Update</h1>
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
                name="name"
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
                Email
              </label>
              <input
                type="email"
                name="email"
                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                value={email}
                placeholder="Email"
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Is Admin
              </label>
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                name="isAdmin"
                checked={isAdmin}
                onChange={onChange}
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
            >
              Update
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default UserEditScreen
