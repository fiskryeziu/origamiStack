import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import CustomTitle from '../components/CustomTitle'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import PaginationC from '../components/PaginationC'
import Spinner from '../components/Spinner'
import {
  createProduct,
  productCreateReset,
} from '../reducers/productCreateSlice'
import { deleteProduct } from '../reducers/productDeleteSlice'
import { fetchProducts } from '../reducers/productSlice'

const ProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const pageNumber = params.pageNumber || 1

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productCreate = useSelector((state) => state.productCreate)
  const {
    product: createdProduct,
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = productCreate

  useEffect(() => {
    dispatch(productCreateReset())

    if (!userInfo.isAdmin) {
      navigate('/login')
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      const obj = {
        pageNumber,
      }
      dispatch(fetchProducts(obj))
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      //delete products
      dispatch(deleteProduct(id))
    }
  }
  const createProductHandler = () => {
    //create a product
    dispatch(createProduct())
  }
  return (
    <>
      <CustomTitle title="Origami-Handmade | ProductList" />

      <NavBar />
      <div className="flex flex-col ">
        <div className="flex justify-between">
          <h1 className="text-3xl text-gray-600 m-2 text-left">Products</h1>
          <button
            onClick={createProductHandler}
            className="btn-primary m-3 py-2 px-6"
          >
            Create Product
          </button>
        </div>
        {loadingDelete && <Spinner />}
        {errorDelete && <Alert color="bg-red-500">{errorDelete}</Alert>}
        {loadingCreate && <Spinner />}
        {errorCreate && <Alert color="bg-red-500">{errorCreate}</Alert>}
        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert color="bg-red-500">{error}</Alert>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 h-full ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      ID
                    </th>
                    <th scope="col" className="py-3 px-6">
                      NAME
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Price
                    </th>
                    <th scope="col" className="py-3 px-6">
                      CATEGORY
                    </th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="bg-white border-b ">
                      <td className="py-4 px-6">{product._id}</td>
                      <td className="py-4 px-6">{product.name}</td>
                      <td className="py-4 px-6">{product.price}€</td>
                      <td className="py-4 px-6">{product.category}</td>
                      <td>
                        <Link to={`/admin/product/${product._id}/edit`}>
                          <button className="btn-active px-5 py-2 rounded text-white">
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn-active px-5 py-2 rounded text-white"
                          onClick={() => deleteHandler(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="max-w-full">
              <PaginationC
                page={page}
                pages={pages}
                isAdmin={userInfo.isAdmin}
              />
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  )
}

export default ProductListScreen
