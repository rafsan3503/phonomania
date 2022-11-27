import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/UserContext";

const BookModal = ({ modalProduct, setModalProduct }) => {
  const { user } = useContext(AuthContext);
  // navigate
  const navigate = useNavigate();
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const price = form.price.value;
    const userName = form.userName.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const location = form.location.value;
    const booking = {
      name,
      price,
      userName,
      email,
      phone,
      location,
      productImg: modalProduct.img,
      productId: modalProduct._id,
    };

    fetch("https://phonomania-server.vercel.app/orders", {
      method: "Post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          setModalProduct(false);
          toast.success("Booking Successful");
          navigate("/dashboard/myorders");
          return;
        }
        if (data.error) {
          toast.error(data.message);
          setModalProduct(null);
        }
      });
  };
  return (
    <div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="font-bold text-lg">
            Add information to book {modalProduct.name}
          </h3>
          <form onSubmit={handleBooking}>
            <input
              type="text"
              defaultValue={modalProduct.name}
              disabled
              name="name"
              className="input input-bordered w-full my-3"
            />
            <input
              type="text"
              name="price"
              defaultValue={modalProduct.price}
              className="input input-bordered w-full my-3"
            />
            <input
              type="text"
              name="userName"
              defaultValue={user.displayName}
              disabled
              className="input input-bordered w-full my-3"
            />
            <input
              type="text"
              name="email"
              defaultValue={user.email}
              disabled
              className="input input-bordered w-full my-3"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full my-3"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              className="input input-bordered w-full my-3"
            />

            <div className="modal-action">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary w-full"
              />
            </div>
          </form>
        </label>
      </label>
    </div>
  );
};

export default BookModal;
