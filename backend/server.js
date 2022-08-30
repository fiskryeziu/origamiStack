import express from 'express'
import connectDB from './config/db.js'
import { config } from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('api is running')
})

app.use('/products', productRoutes)

app.use('/users', userRoutes)

app.use('/orders', orderRoutes)

app.get('/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
