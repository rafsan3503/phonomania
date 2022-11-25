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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-16">
      {advertisedProducts.map((product) => (
        <Link
          to={`/categories/${product.categoryId}`}
          class="group relative block bg-black"
        >
          <img
            alt="Featured Product"
            src={product.img}
            class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
          />

          <div class="relative p-8">
            <p class="text-sm font-medium uppercase tracking-widest text-pink-500">
              Featured
            </p>

            <p class="text-2xl font-bold text-white">{product.name}</p>

            <div class="mt-64">
              <div class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <p class="text-sm text-white">{product.description}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdvertiseProducts;
