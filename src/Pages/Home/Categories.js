import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Categories = () => {
  // get categories
  const {
    data: categories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("http://localhost:5000/categories").then((res) => res.json()),
  });
  return (
    <section className="my-16">
      <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          <div class="flex items-center rounded bg-gray-100 p-8">
            <div class="mx-auto text-center lg:text-left">
              <h2 class="text-2xl font-bold">Categories</h2>

              <p class="mt-4 max-w-[45ch] text-sm text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
                cupiditate mollitia saepe vitae libero nobis.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-12">
            {categories.map((category) => (
              <Link to={`/categories/${category._id}`} class="block">
                <img
                  alt="Simple Watch"
                  src={category.img}
                  class="aspect-square w-full rounded object-cover"
                />

                <div class="mt-2">
                  <h3 class="font-medium">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
