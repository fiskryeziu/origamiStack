import React from 'react'
import { Link } from 'react-router-dom'
import { Steps } from 'react-daisyui'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Steps>
      <Steps.Step color={step1 ? 'success' : ''}>
        {step1 ? <Link to="/sign-in">Sign in</Link> : <p>Sign in</p>}
      </Steps.Step>
      <Steps.Step color={step2 ? 'success' : ''}>
        {step2 ? <Link to="/shipping">Shipping</Link> : <p>Shipping</p>}
      </Steps.Step>
      <Steps.Step color={step3 ? 'success' : ''}>
        {step3 ? <Link to="/payment">Payment</Link> : <p>Payment</p>}
      </Steps.Step>
      <Steps.Step color={step4 ? 'success' : ''}>
        {step4 ? (
          <Link to="/place-order">Place order</Link>
        ) : (
          <p>Place order</p>
        )}
      </Steps.Step>
    </Steps>
  )
}

export default CheckoutSteps
