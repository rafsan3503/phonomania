import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/UserContext";

const BookModal = ({ product }) => {
  const { user } = useContext(AuthContext);
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
    };

    console.log(booking);
  };
  return (
    <div>
      <div className="modal" id="my-modal-2">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Add information to book {product.name}
          </h3>
          <form onSubmit={handleBooking}>
            <input
              type="text"
              defaultValue={product.name}
              disabled
              name="name"
              class="input input-bordered w-full my-3"
            />
            <input
              type="text"
              name="price"
              defaultValue={product.price}
              class="input input-bordered w-full my-3"
            />
            <input
              type="text"
              name="userName"
              defaultValue={user.displayName}
              disabled
              class="input input-bordered w-full my-3"
            />
            <input
              type="text"
              name="email"
              defaultValue={user.email}
              disabled
              class="input input-bordered w-full my-3"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              class="input input-bordered w-full my-3"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              class="input input-bordered w-full my-3"
            />

            <div className="modal-action">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
