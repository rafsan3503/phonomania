import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_key);

const Payments = () => {
  const booking = useLoaderData();
  return (
    <div>
      <div>
        <div className="card w-1/2 mx-auto glass mt-16 shadow-xl">
          <figure className="px-5 pt-10">
            <img
              src={booking.productImg}
              alt="product"
              className="rounded-xl w-96"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="text-xl font-medium">Payment for {booking.name}</h2>
            <p>Please pay ${booking.price} to get your product</p>
            <div className="w-full p-10">
              <Elements stripe={stripePromise}>
                <Checkout booking={booking} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
