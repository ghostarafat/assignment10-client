import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { ThemeContext } from "../context/ThemeContext";

const ListingDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState({
    address: "",
    phone: "",
    date: "",
    additionalNotes: "",
    quantity: 1,
  });
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `https://assignment10-server-nine-eta.vercel.app/listings/${id}`
        );
        setListing(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load listing details");
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to place an order");
      return;
    }

    const orderPayload = {
      productId: listing._id,
      productName: listing.name,
      buyerName: user.displayName || "Anonymous",
      email: user.email,
      quantity: listing.category === "Pets" ? 1 : orderData.quantity,
      price: listing.price,
      address: orderData.address,
      date: orderData.date,
      phone: orderData.phone,
      additionalNotes: orderData.additionalNotes,
    };

    try {
      await axios.post(
        "https://assignment10-server-nine-eta.vercel.app/orders",
        orderPayload
      );
      toast.success("Order placed successfully!");
      setShowOrderForm(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>Listing not found</p>;

  return (
    <div
      className={`min-h-screen max-w-[1440px] mx-auto  p-6 transition-colors duration-500 ${
        theme === "light"
          ? "bg-gray-50 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full md:w-1/2 h-64 object-cover rounded"
        />

        {/* Details */}
        <div className="flex-1 flex flex-col gap-2">
          <h2 className={`text-2xl font-bold`}>{listing.name}</h2>
          <p className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
            {listing.category}
          </p>
          <p className={theme === "light" ? "text-gray-700" : "text-gray-200"}>
            {listing.description}
          </p>
          <p className={theme === "light" ? "text-gray-700" : "text-gray-200"}>
            {listing.price > 0 ? `$${listing.price}` : "Free for Adoption"}
          </p>
          <p className={theme === "light" ? "text-gray-500" : "text-gray-400"}>
            {listing.location}
          </p>
          <p className={theme === "light" ? "text-gray-400" : "text-gray-500"}>
            Owner: {listing.email}
          </p>

          {/* Order Button */}
          <button
            onClick={() => setShowOrderForm(!showOrderForm)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Adopt / Order Now
          </button>

          {/* Order Form */}
          {showOrderForm && (
            <form onSubmit={handleOrder} className="mt-4 flex flex-col gap-2">
              {listing.category !== "Pets" && (
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  min="1"
                  value={orderData.quantity}
                  onChange={handleChange}
                  required
                  className={`border p-2 rounded ${
                    theme === "light"
                      ? "bg-white text-black"
                      : "bg-gray-700 text-white"
                  }`}
                />
              )}
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={orderData.address}
                onChange={handleChange}
                required
                className={`border p-2 rounded ${
                  theme === "light"
                    ? "bg-white text-black"
                    : "bg-gray-700 text-white"
                }`}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={orderData.phone}
                onChange={handleChange}
                required
                className={`border p-2 rounded ${
                  theme === "light"
                    ? "bg-white text-black"
                    : "bg-gray-700 text-white"
                }`}
              />
              <input
                type="date"
                name="date"
                value={orderData.date}
                onChange={handleChange}
                required
                className={`border p-2 rounded ${
                  theme === "light"
                    ? "bg-white text-black"
                    : "bg-gray-700 text-white"
                }`}
              />
              <textarea
                name="additionalNotes"
                placeholder="Additional Notes"
                value={orderData.additionalNotes}
                onChange={handleChange}
                className={`border p-2 rounded ${
                  theme === "light"
                    ? "bg-white text-black"
                    : "bg-gray-700 text-white"
                }`}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit Order
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
