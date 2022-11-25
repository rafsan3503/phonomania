import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../AuthProvider/UserContext";
import { useQuery } from "@tanstack/react-query";
import SmallLoading from "../../Shared/SmallLoading";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  // get user data
  const { user } = useContext(AuthContext);

  // loader
  const [loading, setLoading] = useState(false);

  // navigate
  const navigate = useNavigate();

  // get categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("http://localhost:5000/categories").then((res) => res.json()),
  });

  // product add
  const handleAddProduct = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const name = form.name.value;
    const price = form.price.value;
    const location = form.location.value;
    const condition = form.condition.value;
    const purchaseYear = form.purchase.value;
    const phone = form.phone.value;
    const description = form.description.value;
    const image = form.image.files[0];
    const category = form.category.value;
    const model = form.model.value;
    const originalPrice = form.originalPrice.value;
    const usageYears = form.usageYear.value;

    const selectedCategory = categories.find((item) => item.name === category);
    const categoryId = selectedCategory._id;

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
        const date = new Date();
        const product = {
          name,
          img,
          price,
          originalPrice,
          model,
          purchaseYear,
          phone,
          condition,
          location,
          description,
          seller: user.displayName,
          sellerId: user.uid,
          sellerEmail: user.email,
          sellerImage: user.photoURL,
          category,
          categoryId,
          salesStatus: "available",
          advertisement: false,
          report: false,
          usageYears,
          postTime: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          postDate: date.toDateString(),
        };

        console.log(product.postTime);

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
              setLoading(false);
              navigate(`/categories/${categoryId}`);
            }
          });
      });
  };
  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md  mt-20">
      <h2 className="text-lg font-semibold text-gray-700">Add a product</h2>

      <form onSubmit={handleAddProduct}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
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
            <label htmlFor="">Model</label>
            <input
              type="text"
              required
              placeholder="Model"
              className="input input-bordered w-full"
              name="model"
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
            <label htmlFor="">Original Price</label>
            <input
              type="text"
              required
              placeholder="Original Price"
              className="input input-bordered w-full"
              name="originalPrice"
            />
          </div>

          <div>
            <label htmlFor="">Year of use</label>
            <input
              type="text"
              required
              placeholder="Year of use"
              className="input input-bordered w-full"
              name="usageYear"
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
            <label htmlFor="category">Category</label>
            <select
              required
              className="select select-bordered w-full"
              name="category"
            >
              {categories.map((category) => (
                <option key={category._id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="">Location</label>
            <input
              type="text"
              required
              placeholder="Location"
              className="input input-bordered w-full"
              name="location"
            />
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
        <div className="mt-5">
          <label htmlFor="">Description</label>
          <textarea
            required
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            name="description"
          ></textarea>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" className="btn btn-primary">
            {loading ? <SmallLoading /> : "Add Product"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
