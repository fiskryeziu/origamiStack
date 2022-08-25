import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import section from '../assets/images/section.jpg';
import Carousel from '../components/Carousel';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  console.log(products);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <NavBar />
      <div>
        {/* hero section  */}
        <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[90vh] relative bg-hero bg-cover bg-center bg-no-repeat">
          <div className="z-10 flex flex-col justify-between items-center h-[200px]">
            <h1 className="text-white z-10 text-center font-semibold text-[20px]">
              Welcome to origami-handmade
            </h1>
            <h1 className="text-white z-10 text-2xl md:text-4xl text-center font-unna">
              A piece of art made by folding the paper
            </h1>
            <div>
              <Link to="/products" className="rounded-full bg-white p-2  z-10">
                Shop Now
              </Link>
            </div>
          </div>
          <div className="bg-black opacity-70 absolute w-full h-full top-0"></div>
        </div>

        {/* products */}
        <div>
          <div className="flex items-center py-10 space-x-5 justify-center">
            <h1 className="text-base md:text-2xl">New Origamis</h1>
            <div>
              <Link
                to="/products"
                className="rounded-full bg-sky-700 text-white p-2  z-10"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center flex-wrap">
            {/* maximum 6 items in homescreen */}
            {products.map((product) => (
              <Card
                key={product._id}
                width={345}
                height={345}
                product={product}
              />
            ))}
          </div>
        </div>

        {/* another section  */}
        <div className="flex w-full h-80 my-20 bg-black bg-opacity-40">
          <img
            src={section}
            alt=""
            className="w-full h-auto object-cover -z-10"
          />
        </div>
      </div>
      {/* swipper  */}
      <Carousel />

      {/* footer  */}
      <Footer />
    </>
  );
};

export default HomeScreen;
