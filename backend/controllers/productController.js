import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//fetch products
// method get
//route /products
//access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: '1' }).limit(6)

  res.json(products)
})

//fetch productbyId
// method get
//route /products/:id
//access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById }
