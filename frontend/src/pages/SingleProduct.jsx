import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Rating from '../components/Rating'
import Spinner from '../components/Spinner'
import { fetchProductsDetails } from '../reducers/productDetailsSlice'
import {
  createReview,
  productCreateReviewReset,
} from '../reducers/productReviewCreateSlice'
import CustomTitle from '../components/CustomTitle'

const SingleProduct = () => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [qty, setQty] = useState(1)
  const params = useParams()
  const navigate = useNavigate()
  const productId = params.id
  const dispatch = useDispatch()

  const productListDetails = useSelector((state) => state.productListDetails)
  const { error, loading, product } = productListDetails

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { error: errorProductReview, success: successProductReview } =
    productReviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted')
      setRating(0)
      setComment('')
      dispatch(productCreateReviewReset())
    }
    dispatch(fetchProductsDetails(productId))
  }, [productId, dispatch, successProductReview])

  const addToCartHandler = () => {
    navigate(`/cart/${productId}/?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const ratingData = {
      rating,
      comment,
    }
    const productData = {
      productId,
      ratingData,
    }
    dispatch(createReview(productData))
  }
  return (
    <>
      <CustomTitle title="Origami-Handmade | Product" />

      <NavBar />
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <>
          {/* img title total price add to cart button  */}
          <div className="flex justify-center my-10 mx-10 flex-col space-y-4 md:flex-row md:space-y-0">
            {/* col1  */}
            <div className="flex  w-full md:w-1/2 justify-center">
              <div className="max-w-xs">
                <img src={product.image} alt="" />
              </div>
            </div>
            {/* col2  */}
            <div className="flex w-full md:w-1/4 flex-col border-2 mr-10">
              <div className="py-10 px-1">
                <h1 className="text-4xl text-gray-800">{product.name}</h1>
              </div>
              <div className="py-4 border-t-2 flex items-center px-1">
                <Rating value={product.rating} />
              </div>
              <div className="py-4 border-2 flex items-center px-1">
                <h1>{product.price}$</h1>
              </div>
              <div className="p-1">
                <p>{product.description}</p>
              </div>
            </div>

            {/* col3  */}
            <div className="flex w-full md:w-1/4 flex-col">
              <div className="flex justify-between border-2 p-2 flex-col lg:flex-row">
                <p>Price</p>
                <p>{product.price}$</p>
              </div>
              <div className="flex justify-between border-x-2 p-2 border-b-2 flex-col lg:flex-row">
                <p>Status</p>
                <p>{product.countInStock > 0 ? 'In Stock' : 'Out of stock'}</p>
              </div>
              {product.countInStock > 0 && (
                <div className="flex justify-between border-x-2 p-2 flex-col lg:flex-row">
                  <p>qty</p>
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="border-2 p-3 flex justify-center">
                <button
                  className="bg-gray-900 text-white w-full py-2 hover:brightness-125"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
          {/* review  */}
          <div className="flex flex-col max-w-sm mx-10 md:mx-40 mb-10">
            <h1 className="text-4xl text-gray-700 pb-4">Reviews </h1>
            {product.reviews.length === 0 && (
              <Alert color="bg-red-500">No Reviews</Alert>
            )}
            {product.reviews.map((review) => (
              <>
                <div className="border-2 p-5">
                  <p>{review.name}</p>
                  <Rating value={review.rating} />
                  <p>{moment(review.createdAt).format('L')}</p>
                  <p className="mt-5">{review.comment}</p>
                </div>
              </>
            ))}
            <div className="border-x-2 p-5">
              <h1 className="text-3xl text-gray-700">
                Write a customer Review
              </h1>
              {errorProductReview && (
                <Alert color="bg-red-500">{errorProductReview}</Alert>
              )}
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <label>Rating</label>
                  <select
                    className="w-full border-2"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select ...</option>
                    <option value="1">1 - Poor </option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                  <p>Comment</p>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border-2"
                  ></textarea>
                  <div>
                    <button className="w-full bg-gray-900 p-2 text-white hover:brightness-125">
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <Alert color="bg-blue-500">
                  Please{' '}
                  <Link to="/sign-in" className="underline">
                    sign in
                  </Link>{' '}
                  to write a review
                </Alert>
              )}
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  )
}

export default SingleProduct
