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
            <a href="#" class="block"></a>

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
