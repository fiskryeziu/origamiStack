import React from 'react'
import CustomTitle from '../components/CustomTitle'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

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
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            necessitatibus cum fuga, blanditiis impedit nulla repellat
            exercitationem explicabo repellendus perspiciatis.
          </p>
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
              <p className="text-gray-600">Our location</p>
            </div>
            <p className="font-bold">origamihandmade8@gmail.com</p>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col space-y-10 border-t-2 md:border-t-0 mt-4">
          <h1 className="text-3xl text-gray-700">Drop us a line or two</h1>
          <form action="" className="space-y-10">
            <div className="flex flex-col">
              <label htmlFor="Name" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Full name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Email" className="font-semibold">
                Email
              </label>
              <input
                type="text"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Name" className="font-semibold">
                Comment
              </label>
              <textarea
                type="text"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <button className="rounded-full bg-sky-700 px-3 py-1 text-white hover:brightness-125">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ContactScreen
