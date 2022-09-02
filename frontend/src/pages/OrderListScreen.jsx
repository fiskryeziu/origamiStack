import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Alert from '../components/Alert'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Spinner from '../components/Spinner'
import { listOrders } from '../reducers/orderListSlice'

const OrderListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])
  return (
    <>
      <NavBar />
      <div className="flex flex-col h-auto md:h-screen">
        <h1 className="text-3xl text-gray-600 m-2 text-center">Orders</h1>
        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert color="bg-red-500">{error}</Alert>
        ) : (
          <div className="overflow-x-auto my-10">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    USER
                  </th>
                  <th scope="col" className="py-3 px-6">
                    DATE
                  </th>
                  <th scope="col" className="py-3 px-6">
                    TOTAL
                  </th>
                  <th scope="col" className="py-3 px-6">
                    PAID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    DELIVERED
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="bg-white border-b ">
                    <td className="py-4 px-6">{order._id}</td>
                    <td className="py-4 px-6">
                      {order.user && order.user.name}
                    </td>
                    <td className="py-4 px-6">
                      {moment(order.createdAt).format('L')}
                    </td>
                    <td className="py-4 px-6">{order.totalPrice}€</td>

                    <td className="py-4 px-6">
                      {order.isPaid ? (
                        <>{moment(order.paidAt).format('L')}</>
                      ) : (
                        <i className="fas fa-times" color="red"></i>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {order.isDelivered ? (
                        <>{moment(order.deliveredAt).format('L')}</>
                      ) : (
                        <i className="fas fa-times" color="red"></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <button className="btn-active px-5 py-2 rounded text-white">
                          Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Footer />
      </div>
    </>
  )
}

export default OrderListScreen
