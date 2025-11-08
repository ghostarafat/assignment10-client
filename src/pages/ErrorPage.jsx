import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9fafb",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "60px", color: "#ef4444", marginBottom: "10px" }}>
        404
      </h1>
      <h2 style={{ color: "#374151", marginBottom: "20px" }}>Page Not Found</h2>
      <p style={{ color: "#6b7280", marginBottom: "20px" }}>
        Sorry! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
