import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserContext";
import Loading from "../../Shared/Loading";

const MyOrders = () => {
  // get user from context
  const { user } = useContext(AuthContext);
  // get orders
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`http://localhost:5000/orders?email=${user?.email}`).then((res) =>
        res.json()
      ),
  });
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
                <tr>
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
                    <button className="btn btn-xs btn-error">Pay</button>
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
