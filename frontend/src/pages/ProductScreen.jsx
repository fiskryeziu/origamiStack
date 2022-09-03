import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../components/Card'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { fetchProducts } from '../reducers/productSlice'
import PaginationC from '../components/PaginationC'
import Spinner from '../components/Spinner'
import { Alert } from 'react-daisyui'
import CustomTitle from '../components/CustomTitle'

const ProductScreen = () => {
  const [value, setValue] = useState(0)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const rangeValue = params.rangeValue || 0
  const pageNumber = params.pageNumber || 1

  const productList = useSelector((state) => state.productList)

  const { loading, error, products, pages, page } = productList

  useEffect(() => {
    const obj = {
      rangeValue,
      pageNumber,
    }
    dispatch(fetchProducts(obj))
  }, [dispatch, pageNumber, rangeValue])

  const filterHandler = () => {
    if (value.trim()) {
      navigate(`/products/${value}`)
    } else {
      navigate('/')
    }
  }
  return (
    <>
      <CustomTitle title="Origami-Handmade | Product" />
      <NavBar />
      {/* product screen div   */}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert color="bg-red-500">{error}</Alert>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-between flex-col md:flex-row pt-40">
              <div className="min-w-[30%] mx-10">
                <label
                  htmlFor="steps-range"
                  className="block mb-2 text-sm font-medium text-black-400"
                >
                  Range steps
                </label>
                <input
                  id="steps-range"
                  type="range"
                  min="0"
                  max="1000"
                  value={value}
                  step="50"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  onChange={(e) => setValue(e.target.value)}
                />
                <p>{value}</p>
                <button
                  className="rounded-full bg-sky-700 text-white px-3 hover:brightness-125 mt-2"
                  onClick={filterHandler}
                >
                  Filter
                </button>
              </div>
              <div className="flex flex-row justify-center items-center flex-wrap">
                {products.map((product) => (
                  <Card
                    key={product._id}
                    width={200}
                    height={300}
                    product={product}
                  />
                ))}
              </div>
            </div>
            <PaginationC page={page} pages={pages} value={value} />
          </div>
          <Footer />
        </>
      )}
    </>
  )
}

export default ProductScreen
