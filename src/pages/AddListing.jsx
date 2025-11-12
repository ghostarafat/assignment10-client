import React, { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion"; // 👈 Import Framer Motion

const AddListing = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    category: "Pets",
    price: 0,
    location: "",
    description: "",
    image: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to add a listing");
      return;
    }

    const payload = { ...formData, email: user.email };

    try {
      await axios.post(
        "https://assignment10-server-nine-eta.vercel.app/listings",
        payload
      );
      toast.success("Listing added successfully!");
      setFormData({
        name: "",
        category: "Pets",
        price: 0,
        location: "",
        description: "",
        image: "",
        date: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add listing");
    }
  };

  return (
    <motion.div
      className="min-h-screen p-6 dark:bg-gray-900 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="max-w-3xl mx-auto border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          🐾 Add New Listing
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Name */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="name"
            placeholder="Product / Pet Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Category */}
          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="Pets">Pets</option>
            <option value="Pet Food">Pet Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Pet Care Products">Pet Care Products</option>
          </motion.select>

          {/* Price */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="number"
            name="price"
            placeholder="Price (0 if pet)"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Location */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Description */}
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Image URL */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Date */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
          >
            Add Listing
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default AddListing;
