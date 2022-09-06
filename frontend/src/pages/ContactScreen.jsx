import React, { useState } from 'react'
import API from '../api'
import { useSelector } from 'react-redux'
import CustomTitle from '../components/CustomTitle'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import contactus from '../assets/images/contactus.jpg'

const ContactScreen = () => {
  return (
    <>
      <CustomTitle title="Origami-Handmade | Contact" />
      <NavBar />
      <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[60vh] relative bg-contact bg-cover bg-bottom bg-no-repeat">
        <div className="z-10 flex items-center h-[200px]">
          <h1 className="text-white z-10 text-center text-4xl">Contact Us</h1>
        </div>
        <div className="bg-black opacity-70 absolute w-full h-full top-0"></div>
      </div>
      {/* from section  */}

      <div className="flex justify-between m-10 flex-col md:flex-row">
        <div className="md:w-1/2 space-y-10">
          <h1 className="text-5xl">Get in Touch</h1>

          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <i className="fa fa-location-arrow"></i>{' '}
              <p className="text-gray-600">Our location</p>
            </div>
            <p className="font-bold">Lekë Matranga, Prizren</p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <i className="fa fa-phone-alt"></i>{' '}
              <p className="text-gray-600">Call us</p>
            </div>
            <p className="font-bold">+123456789</p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <i className="fa fa-envelope"></i>{' '}
              <p className="text-gray-600">Contact Us</p>
            </div>
            <a
              href="mailto:fiskryeziu@gmail.com?subject=Email from Origami Contact form"
              className="font-bold"
            >
              origamihandmade8@gmail.com
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col space-y-10 border-t-2 md:border-t-0 mt-4">
          <div className="flex justify-end">
            <img
              src={contactus}
              className="hidden md:block rounded-full w-96 h-96"
              alt="contactimg"
            />
          </div>
          {/* <h1 className="text-3xl text-gray-700">Drop us a line or two</h1>
          <form className="space-y-10" onSubmit={submitHandler}>
            <div className="flex flex-col">
              <label htmlFor="Name" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Full name"
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Email" className="font-semibold">
                Email
              </label>
              <input
                type="text"
                name="email"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Email"
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Name" className="font-semibold">
                Comment
              </label>
              <textarea
                type="text"
                name="text"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={onChange}
              />
            </div>

            <button className="rounded-full bg-sky-700 px-3 py-1 text-white hover:brightness-125">
              Submit
            </button>
          </form> */}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ContactScreen
