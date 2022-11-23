import React from "react";

const Categories = () => {
  return (
    <section className="my-16">
      <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          <div class="flex items-center rounded bg-gray-100 p-8">
            <div class="mx-auto text-center lg:text-left">
              <h2 class="text-2xl font-bold">Watches</h2>

              <p class="mt-4 max-w-[45ch] text-sm text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
                cupiditate mollitia saepe vitae libero nobis.
              </p>

              <a
                href="#"
                class="mt-6 inline-block rounded bg-black px-6 py-3 text-sm text-white"
              >
                View the Range
              </a>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-12">
            <a href="#" class="block">
              <div class="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                <div
                  class="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
                  style="background-image: url(https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80)"
                ></div>

                <div class="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                  <h3 class="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                    Nike Revolt
                  </h3>

                  <div class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                    <span class="font-bold text-gray-800 dark:text-gray-200">
                      $129
                    </span>
                    <button class="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </a>

            <a href="#" class="block">
              <img
                alt="Simple Watch"
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                class="aspect-square w-full rounded object-cover"
              />

              <div class="mt-2">
                <h3 class="font-medium">Iphone</h3>

                <p class="mt-1 text-sm text-gray-700">$150</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
