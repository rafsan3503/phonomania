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
    Swal.fire({
      title: "Are you sure?",
      text: "You want to verify?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Verify!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/sellers/${_id}`, {
          method: "PUT",
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
            if (data.modifiedCount > 0) {
              refetch();
              toast.success("User is verified now!!");
            }
          });
        Swal.fire("Verified!", "success");
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-16">
      <div className="overflow-x-auto">
        <table className="table w-11/12 mx-auto">
          <thead>
            <tr>
              <th>SL</th>
              <th>Email</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, idx) => (
              <tr key={seller._id}>
                <th>{idx + 1}</th>
                <td>{seller.email}</td>
                <td>
                  <button
                    onClick={() => handleVerify(seller._id)}
                    disabled={seller.verified}
                    className={`btn ${
                      seller.verified ? "btn-success" : "btn-error"
                    } btn-xs text-white`}
                  >
                    {seller.verified ? "verified" : "Unverified"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(seller)}
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
  );
};

export default AllSeller;
