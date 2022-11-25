import React, { useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import { Link } from "react-router-dom";
import BookModal from "../Shared/BookModal";
import { FaFlag } from "react-icons/fa";
import axios from "axios";

const ProductCard = ({ product }) => {
  const [verified, setVerified] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/verify?email=${product?.sellerEmail}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.isVerified) {
          setVerified(true);
        }
      });
  }, [product?.sellerEmail]);

  // report item
  const handleReport = (id) => {
    axios.put(`http://localhost:5000/products/${id}`).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div class="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <img class="object-cover w-full h-64" src={product.img} alt="Article" />

      <div class="p-6">
        <div>
          <span class="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
            Product
          </span>
          <div className="flex justify-between">
            <Link
              href="#"
              class="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
              role="link"
            >
              {product.name}
            </Link>
            <div
              onClick={() => handleReport(product._id)}
              className="flex items-center gap-4 cursor-pointer"
            >
              <FaFlag className="text-red-500" />
              <small>Report this item</small>
            </div>
          </div>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {product.description}
          </p>
          <p>{product.location}</p>
          <p>{product.price}</p>
          <p>{product.originalPrice}</p>
          <p>{product.usageYears}</p>
          {/* <button className="btn btn-primary">Book Now</button> */}
          <label
            htmlFor="my-modal-4"
            onClick={() => setModalProduct(product)}
            className="btn btn-primary"
          >
            Book Now
          </label>
        </div>

        <div class="mt-4">
          <div class="flex items-center">
            <div class="flex items-center">
              <img
                class="object-cover h-10 rounded-full"
                src={
                  product.sellerImage
                    ? product.sellerImage
                    : "https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png"
                }
                alt="Avatar"
              />
              {verified && <GoVerified className="text-blue-500" />}
              <Link
                href="#"
                class="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                tabindex="0"
                role="link"
              >
                {product.seller}
              </Link>
            </div>
            <span class="mx-1 text-xs text-gray-600 dark:text-gray-300">
              {product.postTime} {product.postDate}
            </span>
          </div>
          {modalProduct && (
            <BookModal
              modalProduct={modalProduct}
              setModalProduct={setModalProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
