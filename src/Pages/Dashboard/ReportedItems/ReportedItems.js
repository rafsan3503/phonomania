import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/UserContext";
import Loading from "../../Shared/Loading";

const ReportedItems = () => {
  const { logOut } = useContext(AuthContext);
  const {
    data: reportedProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reported"],
    queryFn: () =>
      fetch("http://localhost:5000/reported", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.status === 401 || res.status === 403) {
          logOut();
        }
        return res.json();
      }),
  });
  // delete product
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

  // loader
  if (isLoading) {
    <Loading />;
  }
  return (
    <div>
      <div className="mt-16">
        <div className="overflow-x-auto">
          <table className="table w-11/12 mx-auto">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {reportedProducts.map((product, idx) => (
                <tr key={product._id}>
                  <th>{idx + 1}</th>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-xs btn-error text-white"
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

export default ReportedItems;
