import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { logout } from '../reducers/userSlice'

const MyAccountScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate('/sign-in')
    }
  }, [userInfo, navigate])

  const signOutHandler = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <>
      {userInfo && (
        <>
          <NavBar />
          <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[60vh] relative bg-myaccount bg-cover bg-center bg-no-repeat">
            <div className="z-10 flex items-center h-[200px]">
              <h1 className="text-white z-10 text-center text-4xl">
                {userInfo.isAdmin
                  ? 'Welcome Admin'
                  : `Welcome ${userInfo.name}`}
              </h1>
            </div>
            <div className="bg-black opacity-70 absolute w-full h-full top-0"></div>
          </div>
          {/* icons  */}
          <div className="flex flex-wrap flex-col m-5 justify-center items-center space-y-3 md:flex-row  md:space-x-3 md:space-y-2">
            {userInfo && userInfo.isAdmin && (
              <>
                <div className="bg-gray-200 w-full md:w-60 h-40 flex justify-center items-center rounded-t-lg">
                  <Link
                    to="/admin/userList"
                    className="flex flex-col items-center"
                  >
                    <i className="fa fa-shopping-cart text-gray-700 text-7xl" />
                    <p className="text-2xl font-thin">Users</p>
                  </Link>
                </div>
                <div className="bg-gray-200 w-full md:w-60 h-40 flex justify-center items-center rounded-t-lg">
                  <Link
                    to="/admin/products"
                    className="flex flex-col items-center"
                  >
                    <i className="fa fa-shopping-cart text-gray-700 text-7xl" />
                    <p className="text-2xl font-thin">Products</p>
                  </Link>
                </div>
                <div className="bg-gray-200 w-full md:w-60 h-40 flex justify-center items-center rounded-t-lg">
                  <Link
                    to="/admin/orders"
                    className="flex flex-col items-center"
                  >
                    <i className="fa fa-shopping-cart text-gray-700 text-7xl" />
                    <p className="text-2xl font-thin">Orders</p>
                  </Link>
                </div>
              </>
            )}
            {userInfo && !userInfo.isAdmin && (
              <div className="bg-gray-200 w-full md:w-60 h-40 flex justify-center items-center rounded-t-lg">
                <Link to="/my-orders" className="flex flex-col items-center">
                  <i className="fa fa-shopping-cart text-gray-700 text-7xl" />
                  <p className="text-2xl font-thin">My Orders</p>
                </Link>
              </div>
            )}
            <div className="bg-gray-200 w-full md:w-60 h-40 flex justify-center items-center  rounded-t-lg">
              <Link to="/account-info" className="flex flex-col items-center">
                <i className="fa fa-info-circle text-gray-700 text-7xl" />
                <p className="text-2xl font-thin">Account Info</p>
              </Link>
            </div>
            <div className="bg-gray-200 w-full md:w-60 h-40 flex justify-center items-center  rounded-t-lg">
              <div
                className="flex flex-col items-center"
                onClick={signOutHandler}
              >
                <i className="fa fa-sign-out-alt text-gray-700 text-7xl" />
                <p className="text-2xl font-thin">Sign Out</p>
              </div>
            </div>
          </div>
          {/* text info  */}
          <div className="flex w-full space-y-10 justify-center my-10 px-2">
            <div className="w-[45rem] flex flex-col">
              <p className="text-gray-700">Hello {userInfo.name}</p>
              <p className="text-gray-700">
                From your account dashboard you can view your recent orders,
                manage your shipping and billing addresses, and edit your
                password and account details.
              </p>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}

export default MyAccountScreen
