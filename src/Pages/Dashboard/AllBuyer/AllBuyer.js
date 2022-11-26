import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../Shared/Loading";
import { AuthContext } from "../../../AuthProvider/UserContext";

const AllBuyer = () => {
  // get logout from context
  const { logOut } = useContext(AuthContext);
  // get buyers using react query
  const {
    data: buyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["buyers"],
    queryFn: () =>
      fetch("http://localhost:5000/buyers", {
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
  //   delete buyer
  const handleDelete = (buyer) => {
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
        fetch(`http://localhost:5000/buyers/${buyer._id}`, {
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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-16">
      <div className="overflow-x-auto">
        <table className="table w-11/12 mx-auto">
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer) => (
              <tr key={buyer._id}>
                <th>1</th>
                <td>{buyer.email}</td>
                <td>{buyer.role}</td>
                <td>
                  <button
                    onClick={() => handleDelete(buyer)}
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

export default AllBuyer;
