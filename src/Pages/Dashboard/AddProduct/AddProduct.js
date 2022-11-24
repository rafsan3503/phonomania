import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../AuthProvider/UserContext";

const AddProduct = () => {
  // get user data
  const { user } = useContext(AuthContext);
  // product add
  const handleAddProduct = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const price = form.price.value;
    const condition = form.condition.value;
    const purchaseYear = form.purchase.value;
    const phone = form.phone.value;
    const description = form.description.value;
    const image = form.image.files[0];

    // create form data
    const formData = new FormData();
    formData.append("image", image);

    // add img to imgbb
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMG_API}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((image) => {
        const img = image.data.url;
        const product = {
          name,
          img,
          price,
          purchaseYear,
          phone,
          condition,
          description,
          seller: user.displayName,
          sellerId: user.uid,
          category: "android",
          categoryId: user.uid,
        };

        // post product to database
        fetch("http://localhost:5000/products", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(product),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              toast.success("product added successfully!");
            }
          });
      });

    console.log(
      name,
      price,
      condition,
      purchaseYear,
      phone,
      description,
      image
    );
  };
  return (
    <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md  mt-20">
      <h2 class="text-lg font-semibold text-gray-700">Add a product</h2>

      <form onSubmit={handleAddProduct}>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Name"
              required
              className="input input-bordered w-full"
              name="name"
            />
          </div>

          <div>
            <label htmlFor="">Price</label>
            <input
              type="text"
              required
              placeholder="Price"
              className="input input-bordered w-full"
              name="price"
            />
          </div>

          <div>
            <label htmlFor="">Condition</label>
            <select
              required
              className="select select-bordered w-full"
              name="condition"
            >
              <option>Good</option>
              <option>Medium</option>
              <option>Bad</option>
            </select>
          </div>

          <div>
            <label htmlFor="">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="Phone Number"
              className="input input-bordered w-full"
              name="phone"
            />
          </div>

          <div>
            <label htmlFor="">Purchase Year</label>
            <input
              type="date"
              required
              placeholder="Purchase Year"
              className="input input-bordered w-full"
              name="purchase"
            />
          </div>

          <div>
            <label htmlFor="">Photo Url</label>
            <input
              type="file"
              required
              placeholder="Photo Url"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              name="image"
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="">Description</label>
          <textarea
            required
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            name="description"
          ></textarea>
        </div>

        <div class="flex justify-end mt-6">
          <button type="submit" class="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
