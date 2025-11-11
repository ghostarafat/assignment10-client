import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { ThemeContext } from "../context/ThemeContext";
import { toast } from "react-hot-toast";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Logout failed!");
      });
  };

  return (
    <nav
      className={`p-4 shadow-md ${
        theme === "light"
          ? "bg-blue-600 text-white"
          : "bg-gray-900 text-yellow-300"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
            alt="logo"
            className="w-10 h-10"
          />
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 flex items-center gap-1"
          >
            <span>Paw</span>
            <span className="text-white/90">Mart</span>
          </Link>
        </div>

        {/*  Middle Menu (Desktop only) */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:opacity-80 transition">
            Home
          </Link>
          <Link to="/pets-supplies" className="hover:opacity-80 transition">
            Pets & Supplies
          </Link>

          {user && (
            <>
              <Link to="/add-listing" className="hover:opacity-80 transition">
                Add Listing
              </Link>
              <Link to="/my-listings" className="hover:opacity-80 transition">
                My Listings
              </Link>
              <Link to="/my-orders" className="hover:opacity-80 transition">
                My Orders
              </Link>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            title="Toggle Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {!user ? (
            <>
              <Link
                to="/login"
                className="hover:opacity-80 transition"
                onClick={() => toast("Welcome back! Please log in.")}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:opacity-80 transition"
                onClick={() => toast("Create a new account to get started!")}
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
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/*  Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

      {/*  Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
              title="Toggle Theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          <Link to="/" className="hover:opacity-80 transition">
            Home
          </Link>
          <Link to="/pets-supplies" className="hover:opacity-80 transition">
            Pets & Supplies
          </Link>

          {user && (
            <>
              <Link to="/add-listing" className="hover:opacity-80 transition">
                Add Listing
              </Link>
              <Link to="/my-listings" className="hover:opacity-80 transition">
                My Listings
              </Link>
              <Link to="/my-orders" className="hover:opacity-80 transition">
                My Orders
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="hover:opacity-80 transition"
                onClick={() => toast("Welcome back! Please log in.")}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:opacity-80 transition"
                onClick={() => toast("Create a new account to get started!")}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
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
