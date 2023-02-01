import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { Link, useParams } from 'react-router-dom'
import Card from '../components/Card'
import section from '../assets/images/section.jpg'
import Carousel from '../components/Carousel'
import { fetchProducts } from '../reducers/productSlice'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'
import CustomTitle from '../components/CustomTitle'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const pageNumber = params.pageNumber || 1

  const productList = useSelector((state) => state.productList)

  const { loading, error, products } = productList

  useEffect(() => {
    const obj = {
      pageNumber,
    }
    dispatch(fetchProducts(obj))
  }, [dispatch, pageNumber])

  return (
    <>
      <CustomTitle title="Origami-Handmade | Home" />
      <NavBar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div>
            {/* hero section  */}
            <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[90vh] relative bg-hero bg-cover bg-center bg-no-repeat">
              <div className="z-10 flex flex-col justify-between items-center h-[200px]">
                <h1 className="text-white z-10 text-center font-semibold text-[20px]">
                  Welcome to origami-handmade
                </h1>
                <h1 className="text-white z-10 text-2xl md:text-4xl text-center font-unna">
                  A piece of art made by folding the paper
                </h1>
                <div>
                  <Link
                    to="/products"
                    className="rounded-full bg-white p-2  z-10"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="bg-black opacity-70 absolute w-full h-full top-0"></div>
            </div>

            {/* products */}
            <div>
              <div className="flex items-center py-10 space-x-5 justify-center">
                <h1 className="text-base md:text-2xl">New Origamis</h1>
                <div>
                  <Link
                    to="/products"
                    className="rounded-full bg-sky-700 text-white p-2  z-10"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="flex flex-row justify-center  flex-wrap">
                {error ? (
                  <Alert color="bg-red-500">{error}</Alert>
                ) : (
                  <>
                    {products.map((product) => (
                      <Card
                        key={product._id}
                        width={345}
                        height={345}
                        product={product}
                      />
                    ))}
                  </>
                )}
                {/* maximum 6 items in homescreen */}
              </div>
            </div>

            {/* another section  */}
            <div className="flex w-full h-80 my-20 bg-black bg-opacity-40">
              <img
                src={section}
                alt=""
                className="w-full h-auto object-cover -z-10"
              />
            </div>
          </div>
          {/* swipper  */}
          <Carousel />

          {/* footer  */}
          <Footer />
        </>
      )}
    </>
  )
}

export default HomeScreen
