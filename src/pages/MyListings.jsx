import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";
import EditListingModal from "../components/EditListingModal";

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
        `https://assignment10-server-nine-eta.vercel.app/listings?email=${user.email}` // ✅ Changed port to 3000
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
      ); // ✅ Changed port
      toast.success("Listing deleted!");
      fetchListings();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete listing");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen max-w-[1440px] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Listings</h2>
      {listings.length === 0 && <p>No listings found.</p>}

      <div className="overflow-x-auto bg-white">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing._id}>
                <td className="border px-4 py-2">{listing.name}</td>
                <td className="border px-4 py-2">{listing.category}</td>
                <td className="border px-4 py-2">
                  {listing.category === "Pets"
                    ? "Free for Adoption"
                    : `$${listing.price}`}
                </td>
                <td className="border px-4 py-2">{listing.location}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => setEditListing(listing)}
                    className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editListing && (
        <EditListingModal
          listing={editListing}
          onClose={() => setEditListing(null)}
          onUpdate={fetchListings}
        />
      )}
    </div>
  );
};

export default MyListings;
