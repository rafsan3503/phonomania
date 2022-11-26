import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { AuthContext } from "../../AuthProvider/UserContext";
import SmallLoading from "../Shared/SmallLoading";

const SigUp = () => {
  // get functions from context
  const { googleLogin, updateUser, createUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  // get location and navigate
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // create user with email and password
  const handleSignup = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const role = form.role.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    // create form Data
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMG_API}`;

    if (password !== confirm) {
      return toast.error("Password does not match");
    }

    // post image to imgbb
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((image) => {
        const img = image.data.url;
        createUser(email, password)
          .then((res) => {
            // update user
            updateUser(name, img)
              .then(() => {
                const user = {
                  email,
                  role,
                };
                fetch("http://localhost:5000/users", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(user),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    localStorage.setItem("token", data.token);
                    setLoading(false);
                    navigate(from, { replace: true });
                  });
                toast.success("User Created successfully");
              })
              .catch((err) => toast.error(err.message));
          })
          .catch((err) => toast.error(err.message));
      });
  };

  // google login
  const handleGoogle = () => {
    googleLogin()
      .then((res) => {
        const user = {
          email: res.user.email,
          role: "buyer",
        };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("token", data.token);
            navigate(from, { replace: true });
          });
        toast.success("Google Log in success");
      })
      .catch((err) => toast.error(err.message));
  };

  // twitter login
  // const handleTwitter = () => {
  //   twitterLogin()
  //     .then((res) => {
  //       const email = `${res.user.uid}@gmail.com`;
  //       const user = {
  //         email,
  //         role: "buyer",
  //       };
  //       fetch("http://localhost:5000/users", {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //         body: JSON.stringify(user),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           localStorage.setItem("token", data.token);
  //           navigate(from, { replace: true });
  //         });
  //       toast.success("Twitter Log in success");
  //     })
  //     .catch((err) => toast.error(err.message));
  // };
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={handleSignup}>
          <img
            className="object-cover w-24 h-24 mx-auto"
            src={logo}
            alt="user avatar"
          />

          <div className="flex items-center justify-center mt-6">
            <Link
              to="/login"
              className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
            >
              sign in
            </Link>

            <Link
              to="/login/signup"
              className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-primary dark:text-white"
            >
              Sign Up
            </Link>
          </div>

          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>

            <input
              type="text"
              className="block w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Username"
              name="name"
              required
            />
          </div>

          <label
            htmlFor="dropzone-file"
            className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-md cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-300 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>

            <h2 className="mx-3 text-gray-400">Profile Photo</h2>

            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              name="image"
              required
            />
          </label>

          <select
            className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 w-full rounded-md cursor-pointer"
            name="role"
            required
          >
            <option className="mx-3 text-gray-400">Buyer</option>
            <option className="mx-3 text-gray-400">Seller</option>
          </select>

          <div className="relative flex items-center mt-6">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="email"
              className="block w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email address"
              name="email"
              required
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="password"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
              name="password"
              required
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="password"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Confirm Password"
              name="confirm"
              required
            />
          </div>

          <div className="mt-6">
            <button className="w-full flex justify-center px-6 py-3 text-sm font-medium  text-white capitalize  bg-primary rounded-md">
              {!loading ? "Sign Up" : <SmallLoading />}
            </button>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

              <div className="text-xs text-center text-gray-500 uppercase">
                or login with Social Media
              </div>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
            </div>

            <div className="flex items-center mt-6 -mx-2">
              <button
                onClick={handleGoogle}
                type="button"
                className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-primary rounded-md"
              >
                <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
                </svg>

                <span className="hidden mx-2 sm:inline">
                  {loading ? <SmallLoading /> : "Sign up with google"}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SigUp;
