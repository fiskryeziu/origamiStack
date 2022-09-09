import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import CustomTitle from '../components/CustomTitle'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Spinner from '../components/Spinner'
import {
  fetchProductsDetails,
  productDetailsReset,
} from '../reducers/productDetailsSlice'
import {
  productUpdateReset,
  updateProduct,
} from '../reducers/productUpdateSlice'

const ProductEditScreen = () => {
  const params = useParams()
  const productId = params.id
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: '',
    width: 0,
    height: 0,
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
  })
  const [uploading, setUploading] = useState(false)

  const {
    name,
    price,
    image,
    width,
    height,
    brand,
    category,
    countInStock,
    description,
  } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productListDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch(productUpdateReset())
      dispatch(productDetailsReset())
      navigate('/admin/products')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(fetchProductsDetails(productId))
      } else {
        setFormData({
          name: product.name,
          price: product.price,
          image: product.image,
          width: product.width,
          height: product.height,
          brand: product.brand,
          category: product.category,
          countInStock: product.countInStock,
          description: product.description,
        })
      }
    }
  }, [dispatch, productId, product, navigate, successUpdate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    //update product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        width,
        height,
        brand,
        description,
        countInStock,
      })
    )
  }
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]

    const formdata = new FormData()
    formdata.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/upload', formdata, config)

      setFormData((prev) => ({
        ...prev,
        image: data,
      }))
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }
  }

  return (
    <>
      <CustomTitle title="Origami-Handmade | ProductEdit" />

      <NavBar />
      <div className="flex flex-col h-screen">
        <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16 mx-2">
          <h1 className="text-3xl text-gray-800">Product Edit</h1>

          <Link
            to="/admin/products"
            className="absolute top-2 left-2 underline"
          >
            Go Back
          </Link>
          {loadingUpdate && <Spinner />}
          {errorUpdate && <Alert color="bg-red-500">{errorUpdate}</Alert>}
          {loading ? (
            <Spinner />
          ) : (
            <form className="w-full max-w-sm" onSubmit={submitHandler}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                  value={name}
                  placeholder="Name"
                  onChange={onChange}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                  value={price}
                  placeholder="Enter Price"
                  onChange={onChange}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Image
                </label>
                <input
                  type="text"
                  name="image"
                  className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                  value={image}
                  placeholder="Enter Image url"
                  onChange={onChange}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Name
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="file"
                  onChange={uploadFileHandler}
                />
                {uploading && <Spinner />}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="width"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Width
                </label>
                <input
                  type="text"
                  name="width"
                  className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                  value={width}
                  placeholder="Enter width"
                  onChange={onChange}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="height"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Height
                </label>
                <input
                  type="text"
                  name="height"
                  className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                  value={height}
                  placeholder="Enter Height"
                  onChange={onChange}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="brand"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                  value={brand}
                  placeholder="Enter brand"
                  onChange={onChange}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="countInStock"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Count In Stock
                </label>
                <input
                  type="text"
                  name="countInStock"
                  className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                  value={countInStock}
                  placeholder="Enter countInStock"
                  onChange={onChange}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                  value={category}
                  placeholder="Enter category"
                  onChange={onChange}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                  value={description}
                  placeholder="Enter description"
                  onChange={onChange}
                />
              </div>

              <button
                type="submit"
                className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
              >
                Update
              </button>
            </form>
          )}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default ProductEditScreen
