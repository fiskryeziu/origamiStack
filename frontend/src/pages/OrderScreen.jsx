import React, { useEffect } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Spinner from '../components/Spinner'
import { getOrderDetails } from '../reducers/orderDetailsSlice'
import moment from 'moment'
import { orderPayReset, payOrder } from '../reducers/orderPaySlice'

const OrderScreen = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const orderId = params.id

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  //getting env file with routes from node
  // const getPayPalClientId = async () => {
  //   const { data: clientId } = await axios.get('/config/paypal')

  //   return clientId
  // }

  useEffect(() => {
    if (!order || successPay) {
      dispatch(orderPayReset())
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, orderId, successPay, order])

  const successPaymentHandler = (paymentResult) => {
    const dataOrder = {
      orderId,
      paymentResult,
    }
    dispatch(payOrder(dataOrder))
  }
  //date formater
  return (
    <>
      <NavBar />
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert>{error}</Alert>
      ) : (
        <div className="flex flex-col h-screen">
          <div className="flex flex-col md:flex-row my-10">
            <div className="w-full md:w-3/4 flex flex-col m-2">
              <h1 className="text-3xl m-2 text-gray-800">Order {order._id}</h1>
              <div className="flex flex-col m-2">
                <h2 className="text-2xl text-gray-600 my-2">Shipping</h2>
                <div>
                  <p>
                    <strong className="text-gray-700">Name: </strong>
                    {order.user.name}
                  </p>
                </div>
                <p>
                  <strong className="text-gray-700">Email: </strong>
                  <a href={`mailto:${order.user.email}`} className="underline">
                    {order.user.email}
                  </a>
                </p>
                <p>
                  <strong className="text-gray-700">Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <div className="w-full">
                    <Alert color="bg-green-500">
                      Pain on {order.deliveredAt}
                    </Alert>
                  </div>
                ) : (
                  <div className="w-full">
                    <Alert color="bg-red-500">Not Delivered</Alert>
                  </div>
                )}
              </div>
              <div className="flex flex-col m-2 border-t-2 border-b-2 py-2">
                <h2 className="text-2xl text-gray-600 my-2">Payment Method</h2>
                <p>
                  <strong className="text-gray-700">Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <div className="w-full">
                    <Alert color="bg-green-500">
                      Pain on
                      {moment(order.paidAt).format('MMMM Do YYYY, h:mm:ss a')}
                    </Alert>
                  </div>
                ) : (
                  <div className="w-full">
                    <Alert color="bg-red-500">Not Paid</Alert>
                  </div>
                )}
              </div>
              {order.orderItems.length === 0 ? (
                <div className="max-w-lg p-10">
                  <Alert color="bg-blue-500">Your cart is empty</Alert>
                </div>
              ) : (
                <>
                  {order.orderItems.map((item) => (
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
            <div className="w-full my-10 flex flex-col md:w-1/4 md:my-0 ">
              <div className="w-full border-b-2">
                <h1 className="text-2xl p-2 text-gray-700">ORDER SUMMARY</h1>
                <div className="flex justify-between m-2 border-t-2 p-2">
                  <p>Items</p>
                  <p>{order.itemsPrice}€</p>
                </div>
                <div className="flex justify-between m-2 border-t-2 p-2">
                  <p>Shipping</p>
                  <p>{order.shippingPrice}€</p>
                </div>
                <div className="flex justify-between m-2 border-t-2 p-2">
                  <p>Tax</p>
                  <p>{order.taxPrice}€</p>
                </div>
                <div className="flex justify-between m-2 border-t-2 p-2">
                  <p>Total</p>
                  <p>{order.totalPrice}€</p>
                </div>
              </div>
              {/* paypal button here */}
              {!order.isPaid && (
                <div>
                  {loadingPay && <Spinner />}
                  <PayPalScriptProvider
                    options={{
                      'client-id': `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
                      currency: 'EUR',
                    }}
                  >
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: order.totalPrice,
                              },
                            },
                          ],
                        })
                      }}
                      onApprove={successPaymentHandler}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
              {/* <button
              className="bg-gray-900 text-white mx-2 my-auto p-2 text-[14px]"
              type="button"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              PLACE ORDER
            </button> */}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  )
}

export default OrderScreen
