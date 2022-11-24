import React from "react";

import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard";

const CategoriesProduct = () => {
  const products = useLoaderData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
};

export default CategoriesProduct;
