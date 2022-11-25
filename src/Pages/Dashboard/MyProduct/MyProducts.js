import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`http://localhost:5000/products?email=${user?.email}`).then((res) =>
        res.json()
      ),
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
        axios.put(`http://localhost:5000/products/${id}`).then((res) => {
          refetch();
        });
        Swal.fire("Advertised!", "Your Product is Live now.", "success");
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
        axios.delete(`http://localhost:5000/products/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
          }
        });
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
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
                <tr>
                  <th>{product.name}</th>
                  <td>{product.salesStatus}</td>
                  <td>
                    <button
                      onClick={() => handleAdvertise(product._id)}
                      className={`btn btn-secondary btn-xs ${
                        product.advertisement && "btn-success text-white"
                      }`}
                    >
                      {product.advertisement
                        ? "Advertised"
                        : "Advertise Product"}
                    </button>
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
