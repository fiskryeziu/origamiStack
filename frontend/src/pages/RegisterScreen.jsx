import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const RegisterScreen = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16 mx-2">
        <h1 className="text-3xl text-gray-800">Register</h1>
        <form className="w-full max-w-sm">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
              required=""
              value=""
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
              required=""
              value=""
              placeholder="Password"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmpassword"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
              required=""
              value=""
              placeholder="Confirm password"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
          >
            <span>Sign in to account</span>
          </button>
          <p className="mt-8 text-center">
            <Link to="/sign-in" className="text-sm hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterScreen;
