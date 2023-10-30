import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setErrors({
      email: [],
      password: [],
    });

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        
        if (response && response.status === 422) {
          const errorData = response.data;
          if (errorData.errors) {
            setErrors(errorData.errors);
          } else if (errorData.message) {
            setErrors({
              email: [errorData.message],
            });
          }
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Login into your account
          </h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              className="mt-1 rounded-md px-3 py-2 border border-gray-300 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email.length > 0 && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email[0]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="mt-1 rounded-md px-3 py-2 border border-gray-300 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password.length > 0 && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password[0]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-sm">
          Not registered?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
