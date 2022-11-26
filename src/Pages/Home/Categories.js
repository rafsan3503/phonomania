import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Categories = ({ setModalProduct }) => {
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
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          <div className="flex items-center rounded bg-gray-100 p-8">
            <div className="mx-auto text-center lg:text-left">
              <h2 className="text-2xl font-bold text-primary">Categories</h2>

              <p className="mt-4 max-w-[45ch] text-sm text-gray-700">
                Find second-hand mobile phones for sale near you at the best
                price. Explore the wide range of used mobile phones from top
                brands like Apple, Samsung
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-12">
            {categories.map((category) => (
              <Link to={`/categories/${category._id}`} className="block">
                <img
                  alt="Simple Watch"
                  src={category.img}
                  className="aspect-square w-full rounded object-cover shadow-md shadow-primary"
                />

                <div className="mt-2">
                  <h3 className="font-medium text-primary">{category.name}</h3>
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
