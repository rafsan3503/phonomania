import React, { useContext, useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import { Link } from "react-router-dom";
import BookModal from "../Shared/BookModal";
import { FaFlag } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/UserContext";
import { data } from "autoprefixer";

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
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
  const handleReport = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to report this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Report it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:5000/products/${product._id}`, {
            body: { email: user.email, productId: product._id },
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              return Swal.fire("Reported!", "success");
            }
            if (res.data.message) {
              Swal.fire(res.data.message, "error");
            }
          });
      }
    });
  };
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md">
      <div className="flex justify-between p-5">
        <div className="flex space-x-4">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src={
              product.sellerImage
                ? product.sellerImage
                : "https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png"
            }
            alt="Avatar"
          />

          <div className="flex flex-col space-y-1">
            <Link
              href="#"
              className="font-semibold text-gray-700 flex items-center"
              tabIndex="0"
              role="link"
            >
              {product.seller}{" "}
              {verified && <GoVerified className="text-blue-500" />}
            </Link>
            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
              {product.postTime} {product.postDate}
            </span>
          </div>
        </div>

        <button
          onClick={() => handleReport(product)}
          className="flex items-center gap-4 cursor-pointer"
        >
          <FaFlag className="text-red-500" />
          <small>Report</small>
        </button>
      </div>
      <img
        className="w-1/2 h-96 object-cover mx-auto"
        src={product.img}
        alt="Article"
      />

      <div className="p-6">
        <div>
          <div className="flex justify-between">
            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
              {product.model}
            </span>
            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
              Price: ${product.price}
            </span>
          </div>
          <div className="flex justify-between">
            <Link
              href="#"
              className="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
              role="link"
            >
              {product.name}
            </Link>
          </div>
          <div className="my-5">
            <p>
              <span className="font-medium text-xl">Description: </span>
              {product.description}
            </p>
          </div>
          <div className="my-5">
            <p>
              <span className="font-medium text-xl">Location: </span>
              {product.location}
            </p>
          </div>
          <div className="my-5">
            <p>
              <span className="font-medium text-xl">Original Price: </span>$
              {product.originalPrice}
            </p>
          </div>
          <div className="my-5">
            <p>
              <span className="font-medium text-xl">Usage Year: </span>
              {product.usageYears}
            </p>
          </div>
          <div className="my-5">
            <p>
              <span className="font-medium text-xl">Condition: </span>
              {product.condition}
            </p>
          </div>
          {/* <button className="btn btn-primary">Book Now</button> */}
          <label
            htmlFor="my-modal-4"
            onClick={() => setModalProduct(product)}
            className="btn btn-primary text-white w-full"
          >
            Book Now
          </label>
        </div>
        {modalProduct && (
          <BookModal
            modalProduct={modalProduct}
            setModalProduct={setModalProduct}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
