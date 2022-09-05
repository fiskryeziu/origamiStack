import express from 'express'
import path from 'path'
import connectDB from './config/db.js'
import { config } from 'dotenv'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import nodemailer from 'nodemailer'
import emailRoutes from './routes/emailRoutes.js'

config()

connectDB()

const app = express()

app.use(cors())

// nodemialer  start
let mailTransporter = {
  service: 'gmail',
  auth: {
    user: 'fisnik.crz7@gmail.com',
    pass: 'vlatajorkvgslmir',
  },
}

export let transporter = nodemailer.createTransport(mailTransporter)

transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log('All works fine, congratz!')
  }
})

// nodemailer end
app.use(express.json())

app.get('/', (req, res) => {
  res.send('api is running')
})

app.use('/send', emailRoutes)

app.use('/products', productRoutes)

app.use('/users', userRoutes)

app.use('/orders', orderRoutes)

app.use('/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// app.get('/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
