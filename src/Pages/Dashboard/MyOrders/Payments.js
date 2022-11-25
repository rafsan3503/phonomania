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
        <h2 className="text-xl font-bold p-5">
          Payment for {booking.treatMent}
        </h2>
        <p>
          Please Pay
          {booking.price} for your Booking on {booking.name} at{" "}
        </p>
        <div className="w-96 p-10">
          <Elements stripe={stripePromise}>
            <Checkout booking={booking} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payments;
