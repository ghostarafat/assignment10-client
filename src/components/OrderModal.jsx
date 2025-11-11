import React, { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const OrderModal = ({ listing, onClose }) => {
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in!");
    setLoading(true);

    const orderData = {
      productId: listing._id,
      productName: listing.name,
      buyerName: user.displayName || user.email,
      email: user.email,
      quantity: listing.category === "Pets" ? 1 : 1, // simplicity
      price: listing.category === "Pets" ? 0 : listing.price,
      address,
      phone,
      date,
      additionalNotes: notes,
    };

    try {
      await axios.post(
        "https://assignment10-server-nine-eta.vercel.app/orders",
        orderData
      );
      toast.success("Order placed successfully!");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-11/12 md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Place Your Order</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="border px-3 py-2 rounded"
          />
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            value={listing.name}
            readOnly
            className="border px-3 py-2 rounded"
          />
          <input
            type="number"
            value={listing.category === "Pets" ? 1 : 1}
            readOnly
            className="border px-3 py-2 rounded"
          />
          <input
            type="number"
            value={listing.category === "Pets" ? 0 : listing.price}
            readOnly
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Additional Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Placing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
