import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { AuthContext } from "../../AuthProvider/UserContext";
import SmallLoading from "../Shared/SmallLoading";

const Login = () => {
  // get functions from context
  const { googleLogin, twitterLogin, loginUser } = useContext(AuthContext);
  // small loading
  const [loading, setLoading] = useState(false);
  // location and from
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const navigate = useNavigate();
  // log in with email and password
  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email, password)
      .then((res) => {
        const user = {
          email: res.user.email,
          role: "Buyer",
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
            console.log(data);
            if (data.token) {
              localStorage.setItem("token", data.token);
              setLoading(false);
              navigate(from, { replace: true });
            }
          });

        toast.success("Login Success");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  // google Login
  const handleGoogle = () => {
    setLoading(true);
    googleLogin().then((res) => {
      const user = {
        email: res.user.email,
        role: "Buyer",
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
          toast.success("Google Log in success");
          navigate(from, { replace: true });
        });
    });
  };

  // twitter Login

  const handleTwitter = () => {
    setLoading(true);
    twitterLogin().then((res) => {
      const user = {
        email: res.user.email,
        role: "Buyer",
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
          toast.success("Twitter Log in success");
          navigate(from, { replace: true });
        });
    });
  };
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form onSubmit={handleLogin} class="w-full max-w-md">
          <img
            class="object-cover w-24 h-24 mx-auto"
            src={logo}
            alt="user avatar"
          />

          <div class="flex items-center justify-center mt-6">
            <Link
              to="/login"
              class="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b-2 border-blue-500 dark:text-gray-300"
            >
              sign in
            </Link>

            <Link
              to="/login/signup"
              class="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize  dark:border-blue-400 dark:text-white"
            >
              sign up
            </Link>
          </div>

          <div class="relative flex items-center mt-6">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="email"
              class="block w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email address"
              name="email"
            />
          </div>

          <div class="relative flex items-center mt-4">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="password"
              class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
              name="password"
            />
          </div>
          <div class="mt-6">
            <button
              type="submit"
              class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              {loading ? <SmallLoading /> : "Log In"}
            </button>

            <div class="flex items-center justify-between mt-4">
              <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

              <div class="text-xs text-center text-gray-500 uppercase">
                or login with Social Media
              </div>

              <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
            </div>

            <div class="flex items-center mt-6 -mx-2">
              <button
                onClick={handleGoogle}
                type="button"
                class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
              >
                <svg class="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
                </svg>

                <span class="hidden mx-2 sm:inline">
                  {loading ? <SmallLoading /> : "Sign in with Google"}
                </span>
              </button>

              <Link
                onClick={handleTwitter}
                class="p-2 mx-2 text-sm font-medium text-gray-500 transition-colors duration-300 transform bg-gray-300 rounded-md hover:bg-gray-200"
              >
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
