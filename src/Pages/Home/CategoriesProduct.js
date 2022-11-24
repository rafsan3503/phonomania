import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/UserContext";

const CategoriesProduct = () => {
  const products = useLoaderData();
  const { user } = useContext(AuthContext);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/verify?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isVerified) {
          setVerified(true);
        }
      });
  }, [user.email]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {products.map((product) => (
        <div class="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <img
            class="object-cover w-full h-64"
            src={product.img}
            alt="Article"
          />

          <div class="p-6">
            <div>
              <span class="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                Product
              </span>
              <a
                href="#"
                class="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                tabindex="0"
                role="link"
              >
                {product.name}
              </a>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {product.description}
              </p>
              <p>{product.location}</p>
              <p>{product.price}</p>
              <p>{product.originalPrice}</p>
            </div>

            <div class="mt-4">
              <div class="flex items-center">
                <div class="flex items-center">
                  <img
                    class="object-cover h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                    alt="Avatar"
                  />
                  <a
                    href="#"
                    class="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                    tabindex="0"
                    role="link"
                  >
                    {product.seller}
                  </a>
                </div>
                <span class="mx-1 text-xs text-gray-600 dark:text-gray-300">
                  {product.postTime} {product.postDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesProduct;
