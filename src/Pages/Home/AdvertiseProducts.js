import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdvertiseProducts = () => {
  const { data: advertisedProducts = [] } = useQuery({
    queryKey: ["advertised"],
    queryFn: () =>
      axios.get("http://localhost:5000/advertised").then((res) => res.data),
  });
  if (advertisedProducts.length <= 0) {
    return <div></div>;
  }
  return (
    <div className="my-16">
      <h2 className="text-primary text-3xl font-medium text-center my-10">
        Advertised Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advertisedProducts.map((product) => (
          <Link
            key={product._id}
            to={`/categories/${product.categoryId}`}
            className="group relative block bg-black rounded shadow-md"
          >
            <img
              alt="Featured Product"
              src={product.img}
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                Featured
              </p>

              <p className="text-3xl font-bold text-white">{product.name}</p>

              <div className="mt-64">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm text-white">{product.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdvertiseProducts;
