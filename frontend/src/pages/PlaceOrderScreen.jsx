import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { createOrder } from '../reducers/orderSlice'
import CheckoutSteps from '../components/CheckoutSteps'
import CustomTitle from '../components/CustomTitle'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  // calculate prices
  const itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  const shippingPrice = addDecimals(itemsPrice > 100 ? 50 : 50)

  const taxPrice = addDecimals(Number((0.001 * itemsPrice).toFixed(2)))

  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    } else {
    }
  }, [navigate, success, order])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    )
  }

  return (
    <>
      <CustomTitle title="Origami-Handmade | PlaceOrder" />

      <NavBar />
      <div className="flex flex-col h-screen">
        <div className="relative flex flex-1 flex-col items-center justify-center my-2">
          <CheckoutSteps step1 step2 step3 step4 />
        </div>
        <div className="flex flex-col md:flex-row my-10">
          <div className="w-full md:w-3/4 flex flex-col m-2">
            <div className="flex flex-col m-2">
              <h2 className="text-2xl text-gray-600 my-2">Shipping</h2>
              <p>
                <strong className="text-gray-700">Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </div>
            <div className="flex flex-col m-2 border-t-2 border-b-2 py-2">
              <h2 className="text-2xl text-gray-600 my-2">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </div>
            {cart.cartItems.length === 0 ? (
              <div className="max-w-lg p-10">
                <Alert color="bg-blue-500">Your cart is empty</Alert>
              </div>
            ) : (
              <>
                {cart.cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="flex flex-col items-center py-2 md:flex-row ml-2 md:ml-20 space-x-10"
                  >
                    <div className="w-1/2 md:w-12 flex items-center justify-center">
                      <img
                        src={item.image}
                        className="rounded"
                        alt={item.name}
                      />
                    </div>
                    <div className="w-1/2 flex flex-col items-center md:justify-between md:flex-row">
                      <Link
                        to={`/product-details/${item.product}`}
                        className="hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p>
                        {item.qty} x {item.price}€ = {item.qty * item.price}€
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="w-full my-10 flex flex-col border md:w-1/4 md:my-0 ">
            <div className="w-full border-b-2">
              <h1 className="text-2xl p-2 text-gray-700">ORDER SUMMARY</h1>
              <div className="flex justify-between m-2 border-t-2 p-2">
                <p>Items</p>
                <p>{itemsPrice}€</p>
              </div>
              <div className="flex justify-between m-2 border-t-2 p-2">
                <p>Shipping</p>
                <p>{shippingPrice}€</p>
              </div>
              <div className="flex justify-between m-2 border-t-2 p-2">
                <p>Tax</p>
                <p>{taxPrice}€</p>
              </div>
              <div className="flex justify-between m-2 border-t-2 p-2">
                <p>Total</p>
                <p>{totalPrice}€</p>
              </div>
            </div>
            {error && <Alert color="bg-red-500">{error}</Alert>}
            <button
              className="bg-gray-900 text-white mx-2 my-auto p-2 text-[14px]"
              type="button"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default PlaceOrderScreen
