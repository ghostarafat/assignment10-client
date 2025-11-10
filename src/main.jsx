import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import Layout from "./layout/Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import AddListing from "./pages/AddListing";
import PetsSupplies from "./pages/PetsSupplies";
import ListingDetails from "./pages/ListingDetails";
import MyOrders from "./pages/MyOrders";
import MyListings from "./pages/MyListings";
import CategoryFilteredProduct from "./pages/CategoryFilteredProduct";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./routes/PrivateRoute";
import { ThemeProvider } from "./context/ThemeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      // 🏠 Public Routes
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/pets-supplies", element: <PetsSupplies /> },
      {
        path: "/category-filtered-product/:categoryName",
        element: <CategoryFilteredProduct />,
      },

      // 🔒 Private Routes (Only for Logged-in Users)
      {
        path: "/add-listing",
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },
      {
        path: "/listing-details/:id",
        element: (
          <PrivateRoute>
            <ListingDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
