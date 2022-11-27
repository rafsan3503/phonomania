import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserContext";
import axios from "axios";
import Swal from "sweetalert2";

const MyProducts = () => {
  const { user, logOut } = useContext(AuthContext);
  const {
    data: products = [],

    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(
        `https://phonomania-server.vercel.app/products?email=${user?.email}`,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      ).then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      }),
  });

  //   handle advertise with axios
  const handleAdvertise = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Advertise it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://phonomania-server.vercel.app/advertised/${id}`, {
          method: "PUT",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        })
          .then((res) => {
            if (res.status === 401 || res.status === 403) {
              return logOut();
            }
            return res.json();
          })
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire("Advertised!", "Your Product is Live now.", "success");
            }
            refetch();
          });
      }
    });
  };

  //   handle delete with axios
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://phonomania-server.vercel.app/products/${id}`, {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          })

          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire(
                "Deleted!",
                "Your product has been deleted.",
                "success"
              );
            }
          });
      }
    });
  };
  return (
    <div>
      <div className="mt-16">
        <div className="overflow-x-auto">
          <table className="table w-11/12 mx-auto">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sales Status</th>
                <th>Advertise</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <th>{product.name}</th>
                  <td>{product.salesStatus}</td>
                  <td>
                    {product.salesStatus === "available" && (
                      <button
                        onClick={() => handleAdvertise(product._id)}
                        disabled={product?.advertisement}
                        className={`btn btn-secondary btn-xs ${
                          product.advertisement && "btn-success text-white"
                        }`}
                      >
                        {product?.advertisement
                          ? "Advertised"
                          : "Advertise Product"}
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-error btn-xs text-white"
                    >
                      Delete
                    </button>
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

export default MyProducts;
