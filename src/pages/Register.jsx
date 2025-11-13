import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const { registerUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;

    if (!/[A-Z]/.test(password)) return setError("At least 1 uppercase letter");
    if (!/[a-z]/.test(password)) return setError("At least 1 lowercase letter");
    if (password.length < 6) return setError("Minimum 6 characters required");

    try {
      await registerUser(name, email, password, photoURL);
      toast.success("Registration Successful!");
      navigate("/");
    } catch {
      setError("Registration failed");
    }
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
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Register
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="border w-full p-2 mb-3 rounded"
        />
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
        <input
          type="text"
          name="photoURL"
          placeholder="Photo URL"
          className="border w-full p-2 mb-3 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
        >
          Register
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white w-full py-2 rounded mt-3 hover:bg-red-600"
        >
          Register with Google
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <p className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
