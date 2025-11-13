import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";
import EditListingModal from "../components/EditListingModal";
import { motion, AnimatePresence } from "framer-motion";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editListing, setEditListing] = useState(null);

  // Fetch listings for logged-in user
  const fetchListings = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://assignment10-server-nine-eta.vercel.app/listings?email=${user.email}`
      );
      setListings(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [user]);

  // Delete a listing
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;
    try {
      await axios.delete(
        `https://assignment10-server-nine-eta.vercel.app/listings/${id}`
      );
      toast.success("Listing deleted!");
      fetchListings();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete listing");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <motion.div
      className="min-h-screen max-w-[1440px] mx-auto p-4 md:p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-xl md:text-2xl font-bold mb-4"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        My Listings
      </motion.h2>

      {listings.length === 0 && (
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          No listings found.
        </motion.p>
      )}

      {/*  Responsive Layout */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Desktop & Tablet View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Category</th>
                <th className="border px-4 py-2 text-left">Price</th>
                <th className="border px-4 py-2 text-left">Location</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                {listings.map((listing) => (
                  <motion.tr
                    key={listing._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-100"
                  >
                    <td className="border px-4 py-2 text-black">
                      {listing.name}
                    </td>
                    <td className="border px-4 py-2 text-black">
                      {listing.category}
                    </td>
                    <td className="border px-4 py-2 text-black">
                      {listing.category === "Pets"
                        ? "Free for Adoption"
                        : `$${listing.price}`}
                    </td>
                    <td className="border px-4 py-2 text-black">
                      {listing.location}
                    </td>
                    <td className="border px-4 py-2 flex gap-2 text-black">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditListing(listing)}
                        className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(listing._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </table>
        </div>

        {/*  Mobile View (Cards) */}
        <div className="block md:hidden space-y-4 p-2">
          <AnimatePresence>
            {listings.map((listing) => (
              <motion.div
                key={listing._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="border rounded-lg p-4 shadow-sm bg-gray-50"
              >
                <p className="font-semibold text-lg">{listing.name}</p>
                <p className="text-sm text-gray-600">{listing.category}</p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Price:</span>{" "}
                  {listing.category === "Pets"
                    ? "Free for Adoption"
                    : `$${listing.price}`}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Location:</span>{" "}
                  {listing.location}
                </p>

                <div className="flex gap-2 mt-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditListing(listing)}
                    className="w-1/2 bg-yellow-400 py-1 rounded hover:bg-yellow-500 text-sm"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(listing._id)}
                    className="w-1/2 bg-red-500 py-1 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/*  Modal Animation */}
      <AnimatePresence>
        {editListing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EditListingModal
              listing={editListing}
              onClose={() => setEditListing(null)}
              onUpdate={fetchListings}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MyListings;
