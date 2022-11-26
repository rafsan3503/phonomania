import React from "react";
import { Link } from "react-router-dom";
import banner from "../../Assets/banner (2).gif";

const Banner = () => {
  return (
    <div className="container flex flex-col px-6 py-4 mx-auto lg:py-16 lg:flex-row lg:items-center">
      <div className="flex flex-col items-center w-full lg:flex-row lg:w-1/2">
        <div className="flex justify-center order-2 mt-6 lg:mt-0 lg:space-y-3 lg:flex-col">
          <button className="w-3 h-3 mx-2 bg-primary rounded-full lg:mx-0 focus:outline-none"></button>
          <button className="w-3 h-3 mx-2 bg-gray-300 rounded-full lg:mx-0 focus:outline-none hover:bg-primary"></button>
          <button className="w-3 h-3 mx-2 bg-gray-300 rounded-full lg:mx-0 focus:outline-none hover:bg-primary"></button>
          <button className="w-3 h-3 mx-2 bg-gray-300 rounded-full lg:mx-0 focus:outline-none hover:bg-primary"></button>
        </div>

        <div className="max-w-lg lg:mx-12 lg:order-2">
          <h1 className="text-3xl font-medium tracking-wide text-primary lg:text-4xl">
            YOUR TRUST IS OUR SERVICE
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Welcome to Phonomania. Phonomania is currently one of the most
            trusted online second hand Mobile Buy/Sell store in our country.
            Here you will find all the authentic devices affordable prices.
          </p>
          <div className="mt-6">
            <Link to="/login" className="btn btn-primary text-white">
              Become a member
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-10 lg:mt-0 lg:w-1/2">
        <img className="w-9/12 mx-auto rounded-md" src={banner} alt="" />
      </div>
    </div>
  );
};

export default Banner;
