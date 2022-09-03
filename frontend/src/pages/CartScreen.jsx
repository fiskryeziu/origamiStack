import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { addToCart, removeFromCart } from '../reducers/cartSlice'
import Alert from '../components/Alert'
import CustomTitle from '../components/CustomTitle'

const CartScreen = () => {
  const params = useParams()
  const productId = params.id

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/sign-in')
    } else {
      navigate('/shipping')
    }
  }
  return (
    <div className="flex flex-col h-screen">
      <CustomTitle title="Origami-Handmade | Cart" />
      <NavBar />
      <div className="flex flex-col md:flex-row my-10">
        <div className="w-full md:w-3/4 flex flex-col m-2">
          <h1 className="text-2xl md:text-4xl text-gray-800">Shopping Cart</h1>
          {/* start  */}
          {cartItems.length === 0 ? (
            <div className="max-w-lg p-10">
              <Alert color="bg-blue-500">Your cart is empty</Alert>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="flex flex-col items-center border-b-2 py-2 md:flex-row md:justify-around"
                >
                  <div className="w-1/2 md:w-12 flex items-center justify-center">
                    <img src={item.image} className="rounded" alt={item.name} />
                  </div>
                  <div className="w-1/2 md:w-40">
                    <Link to={`/product-details/${item.product}`}>
                      {item.name}
                    </Link>
                  </div>
                  <p>${item.price}</p>
                  <div className="w-1/2 md:w-32">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="bg-black p-2 mt-2 text-white rounded"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    delete item
                  </button>
                </div>
              ))}
            </>
          )}
          {/* end  */}
        </div>
        <div className="w-full my-10 flex flex-col border md:w-1/4 md:my-0 ">
          <div className="w-full border-b-2">
            <h1 className="text-2xl p-2 text-gray-700">
              SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              ITEMS
            </h1>
            <p className="p-2 text-gray-500">
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </p>
          </div>
          <button
            className="bg-gray-900 text-white mx-2 my-auto p-2 text-[14px]"
            type="button"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CartScreen
