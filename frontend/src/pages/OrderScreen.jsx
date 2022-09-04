import React, { useEffect } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Spinner from '../components/Spinner'
import ClientEmail from '../email/ClientEmail'
import OwnerEmail from '../email/OwnerEmail'
import DeliverEmail from '../email/DeliverEmail'
import { getOrderDetails } from '../reducers/orderDetailsSlice'
import moment from 'moment'
import { orderPayReset, payOrder } from '../reducers/orderPaySlice'
import { deliverOrder, orderDeliverReset } from '../reducers/orderDeliverSlice'
import CustomTitle from '../components/CustomTitle'
import { renderEmail } from 'react-html-email'
import axios from 'axios'
import { orderCreateReset } from '../reducers/orderSlice'

const OrderScreen = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orderId = params.id

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate('/sign-in')
    }

    if (!order || successPay || order._id !== orderId || successDeliver) {
      dispatch(orderPayReset())
      dispatch(orderDeliverReset())
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, orderId, successPay, order, successDeliver, navigate, userInfo])

  const name = order?.user.name
  const email = order?.user.email
  const sendClientMail = async () => {
    const messageHtml = renderEmail(<ClientEmail order={order} />)
    const response = await axios.post('/send', { name, email, messageHtml })
    if (response.data.msg === 'success') {
      alert('Email sent, awesome!')
    } else if (response.data.msg === 'fail') {
      alert('Oops, something went wrong. Try again')
    }
  }
  const sendOwnerMail = async () => {
    const email = 'fisnik.crz7@gmail.com'
    const messageHtml = renderEmail(<OwnerEmail order={order} />)
    const response = await axios.post('/send', { name, email, messageHtml })
    if (response.data.msg === 'success') {
      console.log('Email sent, awesome!')
    } else if (response.data.msg === 'fail') {
      console.error('Oops, something went wrong. Try again')
    }
  }

  const sendDeliverMail = async () => {
    const messageHtml = renderEmail(<DeliverEmail order={order} />)
    const response = await axios.post('/send', { name, email, messageHtml })
    if (response.data.msg === 'success') {
      console.log('Email sent, awesome!')
    } else if (response.data.msg === 'fail') {
      console.error('Oops, something went wrong. Try again')
    }
  }

  const successPaymentHandler = (paymentResult) => {
    const dataOrder = {
      orderId,
      paymentResult,
    }
    dispatch(payOrder(dataOrder))
    dispatch(orderCreateReset())

    sendClientMail()

    sendOwnerMail()
  }
  const deliverHandler = () => {
    dispatch(deliverOrder(order))
    sendDeliverMail()
  }
  return (
    <>
      <CustomTitle title="Origami-Handmade | Order" />

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
                      Paid on{' '}
                      {moment(order.deliveredAt).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
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
                      Paid on:{' '}
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
              {userInfo && !userInfo.isAdmin && !order.isPaid && (
                <div>
                  {loadingPay && <Spinner />}
                  {order.paymentMethod === 'withCash' ? (
                    <button
                      type="submit"
                      className="btn my-2 w-full"
                      onClick={() => successPaymentHandler()}
                    >
                      Place Order
                    </button>
                  ) : (
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
                  )}
                </div>
              )}
              {loadingDeliver && <Spinner />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <button
                    className="bg-gray-900 text-white mx-2 my-auto p-2 text-[14px]"
                    type="button"
                    onClick={deliverHandler}
                  >
                    Mark as Delivered
                  </button>
                )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  )
}

export default OrderScreen
