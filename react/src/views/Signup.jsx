import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState({
    name: [],
    email: [],
    password: [],
    password_confirmation: [],
  });

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    setErrors({
      name: [],
      email: [],
      password: [],
      password_confirmation: [],
    });

    axiosClient
      .post("/signup", payload)
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
            Signup for Free
          </h1>
        </div>
        
      
       
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              ref={nameRef}
              type="text"
              id="name"
              placeholder="Full Name"
              className="mt-1 rounded-md px-3 py-2 border border-gray-300 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && errors.name.length > 0 && (
          <div className="text-red-500 text-xs mt-1">
            {errors.name.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              placeholder="Email Address"
              className="mt-1 rounded-md px-3 py-2 border border-gray-300 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
              {errors.email && errors.email.length > 0 && (
          <div className="text-red-500 text-xs mt-1">
            {errors.email.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              placeholder="Password"
              className="mt-1 rounded-md px-3 py-2 border border-gray-300 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
             {errors.password && errors.password.length > 0 && (
          <div className="text-red-500 text-xs mt-1">
            {errors.password.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
          </div>
          <div className="mb-4">
            <label htmlFor="passwordConfirmation" className="text-sm font-semibold text-gray-700">
              Repeat Password
            </label>
            <input
              ref={passwordConfirmationRef}
              type="password"
              id="passwordConfirmation"
              placeholder="Repeat Password"
              className="mt-1 rounded-md px-3 py-2 border border-gray-300 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            
        {errors.password_confirmation && errors.password_confirmation.length > 0 && (
          <div className="text-red-500 text-xs mt-1">
            {errors.password_confirmation.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Signup
          </button>
          <p className="mt-4 text-center text-gray-500">
            Already registered?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
