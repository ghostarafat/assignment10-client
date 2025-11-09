import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const PetsSupplies = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch listings from server
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/listings");
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

  // Filter by category
  useEffect(() => {
    if (categoryFilter === "All") {
      setFilteredListings(listings);
    } else {
      const filtered = listings.filter(
        (item) => item.category === categoryFilter
      );
      setFilteredListings(filtered);
    }
  }, [categoryFilter, listings]);

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Pets & Supplies</h2>

      {/* Filter */}
      <div className="mb-4 flex gap-3 flex-wrap">
        {["All", "Pets", "Pet Food", "Accessories", "Pet Care Products"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded ${
                categoryFilter === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* Listings */}
      {loading ? (
        <p>Loading listings...</p>
      ) : filteredListings.length === 0 ? (
        <p>No listings available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredListings.map((listing) => (
            <div
              key={listing._id}
              className="border p-3 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={listing.image}
                alt={listing.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="font-bold">{listing.name}</h3>
              <p className="text-sm text-gray-600">{listing.category}</p>
              <p className="text-gray-700">
                {listing.price > 0 ? `$${listing.price}` : "Free for Adoption"}
              </p>
              <p className="text-gray-500">{listing.location}</p>
              <Link
                to={`/listing-details/${listing._id}`}
                className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                See Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetsSupplies;
