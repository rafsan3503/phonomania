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
    <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <img
        className="object-cover w-full h-64"
        src={product.img}
        alt="Article"
      />

      <div className="p-6">
        <div>
          <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
            Product
          </span>
          <div className="flex justify-between">
            <Link
              href="#"
              className="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
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
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
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

        <div className="mt-4">
          <div className="flex items-center">
            <div className="flex items-center">
              <img
                className="object-cover h-10 rounded-full"
                src={
                  product.sellerImage
                    ? product.sellerImage
                    : "https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png"
                }
                alt="Avatar"
              />

              <Link
                href="#"
                className="mx-2 font-semibold text-gray-700 flex items-center"
                tabindex="0"
                role="link"
              >
                {product.seller}{" "}
                {verified && <GoVerified className="text-blue-500" />}
              </Link>
            </div>
            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
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
