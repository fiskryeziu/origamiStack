import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <ul className="flex space-x-2 md:space-x-10 flex-wrap">
      <li>
        {step1 ? (
          <Link to="/sign-in" className="text-green-500">
            <p className="text-green">Sign in </p>
          </Link>
        ) : (
          <p className="text-gray-400">Sign in</p>
        )}
      </li>
      <li>
        {step2 ? (
          <Link to="/shipping" className="text-green-500">
            Shipping
          </Link>
        ) : (
          <p className="text-gray-400">Shipping</p>
        )}
      </li>
      <li>
        {step3 ? (
          <Link to="/payment" className="text-green-500">
            <p>Payment</p>
          </Link>
        ) : (
          <p className="text-gray-400">Payment</p>
        )}
      </li>
      <li>
        {step4 ? (
          <Link to="/place-order" className="text-green-500">
            <p>Place Order</p>
          </Link>
        ) : (
          <p className="text-gray-400">Place Order</p>
        )}
      </li>
    </ul>
  )
}

export default CheckoutSteps
