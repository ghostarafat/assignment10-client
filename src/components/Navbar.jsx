import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo + Website Name */}
        <div className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
            alt="logo"
            className="w-8 h-8"
          />
          <Link to="/" className="text-white text-2xl font-bold">
            PawMart
          </Link>
        </div>

        {/* Middle Menu (desktop only) */}
        <div className="hidden md:flex gap-6 text-white">
          <Link to="/" className="hover:text-blue-200 transition">
            Home
          </Link>
          <Link to="/pets-supplies" className="hover:text-blue-200 transition">
            Pets & Supplies
          </Link>
        </div>

        {/* Right Side (Login/Register or Avatar/Logout) */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-blue-200 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-blue-200 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <img
                src={
                  user.photoURL || "https://i.ibb.co/7z6X6TQ/default-avatar.png"
                }
                alt="user avatar"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <button
                onClick={() => setUser(null)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-3 text-white flex flex-col gap-2">
          <Link to="/" className="hover:text-blue-200 transition">
            Home
          </Link>
          <Link to="/pets-supplies" className="hover:text-blue-200 transition">
            Pets & Supplies
          </Link>

          {user && (
            <>
              <Link
                to="/add-listing"
                className="hover:text-blue-200 transition"
              >
                Add Listing
              </Link>
              <Link
                to="/my-listings"
                className="hover:text-blue-200 transition"
              >
                My Listings
              </Link>
              <Link to="/my-orders" className="hover:text-blue-200 transition">
                My Orders
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" className="hover:text-blue-200 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-200 transition">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => setUser(null)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition w-fit"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
