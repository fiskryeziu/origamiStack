import React, { useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import origamivase from "../assets/images/origamivase.jpg";
import origami2 from "../assets/images/origami2.jpg";
import origami3 from "../assets/images/origami3.jpg";
import origami4 from "../assets/images/origami4.jpg";
import origami5 from "../assets/images/origami5.jpg";

const ProductScreen = () => {
  const [value, setValue] = useState(0);
  return (
    <>
      <NavBar />
      {/* product screen div   */}
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-between flex-col md:flex-row pt-40">
          <div className="min-w-[30%] mx-10">
            <label
              htmlFor="steps-range"
              className="block mb-2 text-sm font-medium text-black-400"
            >
              Range steps
            </label>
            <input
              id="steps-range"
              type="range"
              min="0"
              max="1000"
              value={value}
              step="50"
              onChange={(e) => setValue(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <button className="rounded-full bg-sky-700 text-white px-3 hover:brightness-125 mt-2">
              Filter
            </button>
          </div>
          <div className="flex flex-row justify-center items-center flex-wrap">
            <Card width={200} height={300} image={origamivase} />
            <Card width={200} height={300} image={origami2} />
            <Card width={200} height={300} image={origami3} />
            <Card width={200} height={300} image={origami4} />
            <Card width={200} height={300} image={origami5} />
            <Card width={200} height={300} image={origami2} />
          </div>
        </div>
        <nav aria-label="Page navigation example" className="m-10">
          <ul className="inline-flex -space-x-px">
            <li>
              <a
                href="/"
                className="py-2 px-3 leading-tight text-gray-800 bg-white border border-gray-800 hover:bg-gray-900 hover:text-white duration-200"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="/"
                className="py-2 px-3 leading-tight text-gray-800 bg-white border border-gray-800 hover:bg-gray-900 hover:text-white duration-200"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="/"
                className="py-2 px-3 leading-tight text-gray-800 bg-white border border-gray-800 hover:bg-gray-900 hover:text-white duration-200"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="/"
                className="py-2 px-3 leading-tight text-gray-800 bg-white border border-gray-800 hover:bg-gray-900 hover:text-white duration-200"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="/"
                className="py-2 px-3 leading-tight text-gray-800 bg-white border border-gray-800 hover:bg-gray-900 hover:text-white duration-200"
              >
                5
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <Footer />
    </>
  );
};

export default ProductScreen;
