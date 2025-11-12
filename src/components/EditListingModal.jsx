import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const EditListingModal = ({ listing, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: listing.name,
    category: listing.category,
    price: listing.price,
    location: listing.location,
    description: listing.description,
    image: listing.image,
    date: listing.date,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://assignment10-server-nine-eta.vercel.app/listings/${listing._id}`,
        formData
      );
      toast.success("Listing updated successfully!");
      onUpdate();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update listing.");
    }
  };

  return (
    // Overlay (animated fade-in)
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Modal box (animated slide-up) */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-lg w-11/12 md:w-1/2 relative"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Edit Listing</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product/Pet Name"
            className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="Pets">Pets</option>
            <option value="Pet Food">Pet Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Pet Care Products">Pet Care Products</option>
          </select>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
            required
          />

          <div className="flex justify-end gap-3 mt-4">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </motion.button>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Update
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditListingModal;
