import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: "#2563eb", padding: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >
        <h2 style={{ fontWeight: "bold" }}>My App</h2>
        <div style={{ display: "flex", gap: "15px" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </Link>
          <Link
            to="/register"
            style={{ color: "white", textDecoration: "none" }}
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
