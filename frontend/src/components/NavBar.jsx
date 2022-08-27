import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsBagFill } from 'react-icons/bs'
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from '../assets/images/origamihandmade.png'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const [nav, setNav] = useState(false)

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const handleClick = () => {
    setNav(!nav)
  }
  return (
    <div className="relative h-[80px] border-b-2 bg-slate-100">
      <div className="flex justify-between items-center h-full w-full px-5">
        <div className="md:hidden" onClick={handleClick}>
          {!nav ? (
            <FaBars className="text-2xl cursor-pointer " />
          ) : (
            <FaTimes className="text-2xl cursor-pointer " />
          )}
        </div>
        <Link to="/">
          <img src={logo} alt="" className="w-[150px] h-[47px]" />
        </Link>
        <div className=" flex items-center space-x-10">
          <div className="space-x-10 md:flex hidden items-center">
            <Link to="/">Home</Link>
            <Link to="/products">Product</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/my-account">My Account</Link>
          </div>
          <Link
            to="/cart"
            className="flex items-center relative justify-center"
          >
            <BsBagFill size="30px" />
            <p className="text-white text-base absolute pt-1">
              {cartItems.length}
            </p>
          </Link>
          {/* mobile menu  */}
        </div>
      </div>
      <ul
        className={`w-full flex flex-col text-[18px] space-y-4 z-50 bg-slate-200 absolute px-8 duration-400 transition-all ${
          !nav ? `left-[-100%]` : `left-0`
        }`}
      >
        <Link to="/">Home</Link>
        <Link to="/products">Product</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/my-account">My Account</Link>
      </ul>
    </div>
  )
}

export default NavBar
