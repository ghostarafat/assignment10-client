import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ThemeContext } from "../context/ThemeContext";
import ListingCard from "../components/ListingCard";

const PetsSupplies = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "https://assignment10-server-nine-eta.vercel.app/listings"
        );
        setListings(response.data);
        setFilteredListings(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    let filtered = listings;

    if (categoryFilter !== "All") {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredListings(filtered);
  }, [categoryFilter, search, listings]);

  return (
    <div
      className={`min-h-screen max-w-[1440px] mx-auto p-6 transition-colors duration-300 ${
        theme === "light"
          ? "bg-gray-50 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">
        🐶 Pets & Supplies
      </h2>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {["All", "Pets", "Pet Food", "Accessories", "Pet Care Products"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                categoryFilter === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : theme === "light"
                  ? "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                  : "bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`border p-2 w-full sm:w-1/2 md:w-1/3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            theme === "light"
              ? "border-gray-300 bg-white text-gray-800"
              : "border-gray-700 bg-gray-800 text-gray-100"
          }`}
        />
      </div>

      {/* Listings */}
      {loading ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          Loading listings...
        </p>
      ) : filteredListings.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          No listings available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <ListingCard key={item._id} item={item} theme={theme} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PetsSupplies;
