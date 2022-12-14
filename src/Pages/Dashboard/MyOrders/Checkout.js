import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/UserContext";
import SmallLoading from "../../Shared/SmallLoading";

const Checkout = ({ booking }) => {
  const { _id, price, userName, productId, email } = booking;
  const { logOut } = useContext(AuthContext);
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  // const navigate = useNavigate();
  const [payment, setPayment] = useState(false);

  useEffect(() => {
    fetch("https://phonomania-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
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
      setPaymentId(paymentMethod.id);
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
      fetch(`https://phonomania-server.vercel.app/payments`, {
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
          console.log(data);
          toast.success("Payment Success!!");
          setSuccess("Payment Success!!");
          setLoading(false);
          setPayment(true);
          // navigate("/dashboard/myorders");
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
        {payment ? (
          <Link
            className="btn btn-primary w-full text-white btn-sm mt-5"
            to="/dashboard/myorders"
          >
            Go to my orders
          </Link>
        ) : (
          <button
            type="submit"
            className="btn btn-primary w-full text-white btn-sm mt-5"
            disabled={!stripe || !clientSecret || loading}
          >
            {!loading ? "Pay" : <SmallLoading />}
          </button>
        )}
      </form>
      <p className="text-red-500 mt-3">{cardError}</p>
      <p className="text-green-500 mt-3">{success}</p>
      {success && (
        <p className="text-green-500 mt-3">Payment Id: {paymentId}</p>
      )}
    </div>
  );
};

export default Checkout;
