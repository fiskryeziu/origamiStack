import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/origamihandmade-white.png'

const Footer = () => {
  return (
    <footer className="w-full h-auto md:h-[280px] bg-[#1e1e1e] flex flex-col justify-between mt-auto">
      <div className="flex flex-col md:flex-row justify-between w-full p-10">
        <Link to="/">
          <img src={logo} alt="" className="w-[200px]" />
        </Link>
        <div className="flex flex-col space-x-0 space-y-6 md:flex-row md:space-y-0 md:space-x-6 text-white pt-4">
          <Link to="/">Home</Link>
          <Link to="/products">Product</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <p className="text-white text-center w-full pb-2">
        © 2022 origamihandmade. Powered by origamihandmade.
      </p>
    </footer>
  )
}

export default Footer
