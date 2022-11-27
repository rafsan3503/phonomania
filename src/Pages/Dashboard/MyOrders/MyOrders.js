import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/UserContext";
import Loading from "../../Shared/Loading";

const MyOrders = () => {
  // get user from context
  const { user, logOut } = useContext(AuthContext);
  // get orders
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://phonomania-server.vercel.app/orders?email=${user?.email}`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          logOut();
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      });
  }, [user?.email, logOut]);
  // loader
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="mt-16">
        <div className="overflow-x-auto">
          <table className="table w-11/12 mx-auto">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <th>
                    <div className="avatar">
                      <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={order.productImg} alt="" />
                      </div>
                    </div>
                  </th>
                  <td>{order.name}</td>
                  <td>${order.price}</td>
                  <td>
                    <div>
                      {order?.paid ? (
                        <button
                          disabled
                          className="btn btn-xs btn-success text-white"
                        >
                          Paid
                        </button>
                      ) : (
                        <Link
                          to={`/dashboard/payment/${order._id}`}
                          className="btn btn-xs btn-error text-white"
                        >
                          Pay
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
