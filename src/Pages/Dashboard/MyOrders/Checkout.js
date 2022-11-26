import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/UserContext";
import SmallLoading from "../../Shared/SmallLoading";

const Checkout = ({ booking }) => {
  const { _id, price, userName, productId, email } = booking;
  const { logOut } = useContext(AuthContext);
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          logOut();
        }
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [price, logOut]);

  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      setLoading(false);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        price,
        id: paymentIntent.id,
        email,
        userName,
        productId,
        bookingId: _id,
      };
      fetch(`http://localhost:5000/payments`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            logOut();
          }
          return res.json();
        })
        .then((data) => {
          setSuccess("Payment Success!!");
          setLoading(false);
          navigate("/dashboard/myorders");
        });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-primary w-full text-white btn-sm mt-5"
          disabled={!stripe || !clientSecret || loading}
        >
          {!loading ? "Pay" : <SmallLoading />}
        </button>
      </form>
      <p className="text-red-500 mt-3">{cardError}</p>
      <p className="text-green-500 mt-3">{success}</p>
    </div>
  );
};

export default Checkout;
