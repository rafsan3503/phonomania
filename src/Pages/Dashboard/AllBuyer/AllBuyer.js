import React from "react";
import { useQuery } from "@tanstack/react-query";

const AllBuyer = () => {
  // get buyers using react query
  const { data: buyers = [] } = useQuery({
    queryKey: ["buyers"],
    queryFn: () =>
      fetch("http://localhost:5000/buyers").then((res) => res.json()),
  });
  console.log(buyers);
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
            {buyers.map((buyer) => (
              <tr>
                <th>1</th>
                <td>{buyer.email}</td>
                <td>Quality Control Specialist</td>
                <td>
                  <button
                    onClick={handleDelete}
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

export default AllBuyer;
