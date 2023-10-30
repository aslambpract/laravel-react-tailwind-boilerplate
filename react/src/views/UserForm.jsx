import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';

export default function UserForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data.data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          navigate('/users');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post('/users', user)
        .then(() => {
          navigate('/users');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto py-8">
        {user.id && <h1 className="text-3xl font-semibold mb-4">Update User: {user.name}</h1>}
        {!user.id && <h1 className="text-3xl font-semibold mb-4">New User</h1>}
        <div className="bg-white shadow-md rounded-lg p-4">
          {loading && <div className="text-center">Loading...</div>}
          {errors && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          {!loading && (
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600">
                  Name
                </label>
                <input
                  id="name"
                  value={user.name}
                  onChange={(ev) => setUser({ ...user, name: ev.target.value })}
                  placeholder="Name"
                  className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600">
                  Email
                </label>
                <input
                  id="email"
                  value={user.email}
                  onChange={(ev) => setUser({ ...user, email: ev.target.value })}
                  placeholder="Email"
                  className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  onChange={(ev) => setUser({ ...user, password: ev.target.value })}
                  placeholder="Password"
                  className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password_confirmation" className="block text-gray-600">
                  Password Confirmation
                </label>
                <input
                  id="password_confirmation"
                  type="password"
                  onChange={(ev) =>
                    setUser({ ...user, password_confirmation: ev.target.value })
                  }
                  placeholder="Password Confirmation"
                  className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
