import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Card = ({ width, height, product }) => {
  // any id but in the future get it from the db
  return (
    <div className="flex justify-center">
      <Link
        to={`/product-details/${product._id}}`}
        className="rounded-lg shadow-lg bg-white max-w-sm m-2"
      >
        <img
          className={`rounded-t-md w-[${width}px] h-[${height}px] object-contain`}
          src={product.image}
          alt=""
        />
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            {product.name}
          </h5>
          <div className="flex">
            <Rating value={product.rating} />
          </div>
          <h1 className="text-2xl">{product.price}$</h1>
        </div>
      </Link>
    </div>
  );
};

export default Card;
