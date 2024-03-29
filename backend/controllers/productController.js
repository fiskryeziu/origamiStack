import asyncHandler from 'express-async-handler'
import { s3Delete } from '../middleware/s3Service.js'
import Product from '../models/productModel.js'

//fetch products
// method get
//route /products
//access public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 6
  const page = +req.query.pageNumber || 1

  const rangeValue = Number(req.query.rangeValue) || 0

  const count = await Product.count()
  const products = await Product.find({})
    .sort({ createdAt: 'descending', _id: -1 })
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .where('price')
    .gte(rangeValue)

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

// Delete a product
// method Delete
//route /api/products/:id
// access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    s3Delete(product.image)
    await product.remove()
    res.json({ message: 'Product Removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//  Create a product
// method Post
//route /products
// access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.webp',
    brand: 'sample brand',
    height: 0,
    width: 0,
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()

  res.status(201).json(createdProduct)
})

//  Update a product
// method PUT
//route /api/products/:id
// access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    height,
    width,
    brand,
    category,
    countInStock,
  } = req.body
  console.log(image)
  const product = await Product.findById(req.params.id)

  if (product) {
    if (
      product.image.startsWith(
        'https://renta-car-sif-2022.s3.eu-central-1.amazonaws.com/'
      )
    ) {
      console.log('me link koka')
      s3Delete(product.image)
    } else {
      product.image = ''
    }
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.height = height
    product.width = width
    product.category = category
    product.countInStock = countInStock

    const createdProduct = await product.save()
    res.json(createdProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// create new Review
// method POST
//route /api/products/:id/review
// access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review Added' })
  } else {
    res.status(404)
    throw new Error('Prodcut not found')
  }
})

//  get top rated products
// method get
// route/api/products/top
// access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
