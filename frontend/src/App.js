import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AboutScreen from './pages/AboutScreen'
import CartScreen from './pages/CartScreen'
import ContactScreen from './pages/ContactScreen'
import HomeScreen from './pages/HomeScreen'
import LoginScreen from './pages/LoginScreen'
import MyAccountScreen from './pages/MyAccountScreen'
import ProductScreen from './pages/ProductScreen'
import RegisterScreen from './pages/RegisterScreen'
import ShippingScreen from './pages/ShippingScreen'
import SingleProduct from './pages/SingleProduct'
import UserProfileScreen from './pages/UserProfileScreen'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products" element={<ProductScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/my-account" element={<MyAccountScreen />} />
        <Route path="/sign-in" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/account-info" element={<UserProfileScreen />} />
        <Route path="/cart">
          <Route index element={<CartScreen />} />
          <Route path=":id" element={<CartScreen />} />
        </Route>
        <Route path="/shipping" element={<ShippingScreen />} />

        <Route path="/product-details/:id" element={<SingleProduct />} />
      </Routes>
    </Router>
  )
}

export default App
