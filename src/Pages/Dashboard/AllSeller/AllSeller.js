import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../Shared/Loading";
import toast from "react-hot-toast";
import { AuthContext } from "../../../AuthProvider/UserContext";

const AllSeller = () => {
  // get logout
  const { logOut } = useContext(AuthContext);
  // get all seller
  const {
    data: sellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: () =>
      fetch("http://localhost:5000/sellers", {
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
  const handleDelete = (seller) => {
    Swal.fire({
      title: `Are you sure you want to delete?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/sellers/${seller._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Buyer has been deleted.", "success");
              refetch();
            }
          });
      }
    });
  };

  // verify seller
  const handleVerify = (_id) => {
    fetch(`http://localhost:5000/sellers/${_id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("User is verified now!!");
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }
  console.log(sellers);
  return (
    <div className="mt-16">
      <div className="overflow-x-auto">
        <table className="table w-11/12 mx-auto">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr>
                <th>1</th>
                <td>{seller.email}</td>
                <td>
                  <button
                    onClick={() => handleVerify(seller._id)}
                    className="btn btn-success btn-xs"
                  >
                    {seller.verified ? "verified" : "verify"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(seller)}
                    className="btn btn-xs btn-error"
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
  );
};

export default AllSeller;
