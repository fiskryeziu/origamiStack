import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import origamivase from "../assets/images/origamivase.jpg";

const CartScreen = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-col md:flex-row my-10">
        <div className="w-full md:w-3/4 flex flex-col m-2">
          <h1 className="text-2xl md:text-5xl text-gray-800">Shopping Cart</h1>
          <div className="flex flex-col items-center border-b-2 py-2 md:flex-row md:justify-around">
            <div className="w-1/2 md:w-12 flex items-center justify-center">
              <img src={origamivase} className="rounded" alt="" />
            </div>
            <div className="w-1/2 md:w-40">
              <p>Cannon EOS 80D DSLR Camera</p>
            </div>
            <p>$929.99</p>
            <div className="w-1/2 md:w-32">
              <select name="" id="" className="w-full border-2">
                <option defaultValue=""></option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
              </select>
            </div>
            <button className="bg-black p-2 mt-2 text-white rounded">
              delete item
            </button>
          </div>
        </div>
        <div className="w-full my-10 flex flex-col border md:w-1/4 md:my-0 ">
          <div className="w-full border-b-2">
            <h1 className="text-2xl p-2 text-gray-700">SUBTOTAL (3) ITEMS</h1>
            <p className="p-2 text-gray-500">$1000</p>
          </div>
          <button className="bg-gray-900 text-white mx-2 my-auto p-2 text-[14px]">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartScreen;
