import express from 'express'
import products from './data/product.js'
import connectDB from './config/db.js'
import { config } from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

config()

//models now.
connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('api is running')
})

app.use('/products', productRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
