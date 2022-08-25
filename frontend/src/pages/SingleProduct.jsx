import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Rating from '../components/Rating';
import products from '../product';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//mongoDB tash
const SingleProduct = () => {
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState([]);

  console.log(products);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/products/${productId}`);
      setProduct(data);
    };
    fetchProducts();
  }, [productId]);
  return (
    <>
      <NavBar />
      {/* img title total price add to cart button  */}
      <div className="flex justify-center my-10 mx-10 flex-col space-y-4 md:flex-row md:space-y-0">
        {/* col1  */}
        <div className="flex  w-full md:w-1/2 justify-center">
          <div className="max-w-xs">
            <img src={product.image} alt="" />
          </div>
        </div>
        {/* col2  */}
        <div className="flex w-full md:w-1/4 flex-col border-2 mr-10">
          <div className="py-10 px-1">
            <h1 className="text-4xl text-gray-800">{product.name}</h1>
          </div>
          <div className="py-4 border-t-2 flex items-center px-1">
            <Rating value={product.rating} />
          </div>
          <div className="py-4 border-2 flex items-center px-1">
            <h1>{product.price}$</h1>
          </div>
          <div className="p-1">
            <p>{product.description}</p>
          </div>
        </div>

        {/* col3  */}
        <div className="flex w-full md:w-1/4 flex-col">
          <div className="flex justify-between border-2 p-2 flex-col lg:flex-row">
            <p>Price</p>
            <p>{product.price}$</p>
          </div>
          <div className="flex justify-between border-x-2 p-2 border-b-2 flex-col lg:flex-row">
            <p>Status</p>
            <p>{product.countInStock > 0 ? 'In Stock' : 'Out of stock'}</p>
          </div>
          <div className="flex justify-between border-x-2 p-2 flex-col lg:flex-row">
            <p>qty</p>
            <select name="" id="">
              <option defaultValue=""></option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
            </select>
          </div>
          <div className="border-2 p-3 flex justify-center">
            <button
              className="bg-gray-900 text-white w-full py-2 hover:brightness-125"
              disabled={product.countInStock === 0}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      {/* review  */}
      <div className="flex flex-col max-w-sm mx-10 md:mx-40 mb-10">
        <h1 className="text-4xl text-gray-700 pb-4">Reviews </h1>
        <div className="border-2 p-5">
          <p>John Doe</p>
          <Rating />
          <p>2022-07-27</p>
          <p className="mt-5">great product</p>
        </div>
        <div className="border-x-2 p-5">
          <h1 className="text-3xl text-gray-700">Write a customer Review</h1>
          <p>Rating</p>
          <form action="">
            <select name="" id="" className="w-full border-2">
              <option defaultValue=""></option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
              <option value="">5</option>
            </select>
            <p>Comment</p>
            <textarea name="" id="" className="w-full border-2"></textarea>
            <div>
              <button className="w-full bg-gray-900 p-2 text-white hover:brightness-125">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
