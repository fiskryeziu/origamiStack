import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { savePaymentMethod } from '../reducers/cartSlice'
import CheckoutSteps from './CheckoutSteps'
const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!shippingAddress) {
    navigate('/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/place-order')
  }
  return (
    <>
      <NavBar />
      <div className="flex flex-col h-screen">
        <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16 mx-2">
          <CheckoutSteps step1 step2 step3 />
          <h1 className="text-2xl text-gray-800">Payment</h1>
          <form className="w-full max-w-sm" onSubmit={submitHandler}>
            <div className="mb-6">
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Payment Method
              </label>
              <div className="flex space-x-3">
                <input
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  required
                  value={paymentMethod}
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label>PayPayl</label>
              </div>
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

export default PaymentScreen
