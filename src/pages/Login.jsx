// src/pages/Login.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success("Login Successful!");
        navigate("/");
      })
      .catch(() => setError("Invalid email or password"));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Google Login Successful!");
        navigate("/");
      })
      .catch(() => toast.error("Google login failed"));
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border w-full p-2 mb-3 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="border w-full p-2 mb-3 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white w-full py-2 rounded mt-3 hover:bg-red-600"
        >
          Login with Google
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <p className="text-center mt-3 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
