import React, { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client.js';

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post('/logout').then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get('/user').then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex" id="defaultLayout">
      <aside className="bg-blue-800 text-white w-1/6 p-4">
        <h2 className="text-2xl font-semibold mb-4">Welcome,  {user.name}!</h2>
        <ul>
          <li className="mb-2">
            <Link
              to="/dashboard"
              className="block text-gray-300 hover:text-white"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/users"
              className="block text-gray-300 hover:text-white"
            >
              Users
            </Link>
          </li>
          {/* Add more menu items here */}
        </ul>
      </aside>

      <div className="w-5/6">
        <header className="flex justify-between items-center bg-blue-700 p-4">
          <div className="text-3xl font-semibold text-white">Your App Name</div>
         
          <div>
            <button
              onClick={onLogout}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
