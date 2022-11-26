import React from "react";

import { Link, useLoaderData } from "react-router-dom";

import ProductCard from "./ProductCard";

const CategoriesProduct = () => {
  const products = useLoaderData();

  return (
    <div>
      <h2 className="mt-10 text-primary text-4xl font-medium">
        {products[0]?.category}
      </h2>
      <p className="my-5">Total Phone: {products.length}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[60vh] my-16">
        {products.map((product) => (
          <>
            <ProductCard product={product} key={product._id} />
          </>
        ))}
      </div>
      <div className="text-center my-10">
        <Link to="/home" className="btn btn-primary text-white">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CategoriesProduct;
