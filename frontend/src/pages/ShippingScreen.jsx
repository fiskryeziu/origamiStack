import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { saveShippingAdress } from '../reducers/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'
import CustomTitle from '../components/CustomTitle'

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [formData, setFormData] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
    phoneNumber: shippingAddress.phoneNumber,
  })
  const { address, city, postalCode, country, phoneNumber } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      saveShippingAdress({ address, city, postalCode, country, phoneNumber })
    )
    navigate('/payment')
  }

  return (
    <>
      <CustomTitle title="Origami-Handmade | Shipping" />
      <NavBar />
      <div className="flex flex-col h-screen">
        <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16 mx-2">
          <CheckoutSteps step1 step2 />
          <h1 className="text-2xl text-gray-800">Shipping</h1>
          <form className="w-full max-w-sm" onSubmit={submitHandler}>
            <div className="mb-6">
              <label
                htmlFor="address"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                required
                value={address}
                placeholder="Address"
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                required
                value={phoneNumber}
                placeholder="Phone number"
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="city"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                required
                value={city}
                placeholder="City"
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="postalCode"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                required
                value={postalCode}
                placeholder="postal code"
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="country"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                required
                value={country}
                placeholder="Country"
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              className="inline-flex justify-center  rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-20"
            >
              Continue
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default ShippingScreen
