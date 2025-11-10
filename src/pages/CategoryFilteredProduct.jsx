import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CategoryFilteredProduct = () => {
  const { categoryName } = useParams();
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/listings?category=${categoryName}`)
      .then((res) => setFilteredListings(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categoryName]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading {categoryName}...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-800 capitalize">
        {categoryName} Listings
      </h2>

      {filteredListings.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <p className="text-xl">😔 No products found for this category.</p>
          <Link
            to="/"
            className="inline-block mt-6 bg-blue-600 text-white py-2 px-5 rounded hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {filteredListings.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover mb-3 rounded-xl"
              />
              <h3 className="font-semibold text-lg text-gray-800 mb-1">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm mb-1">
                Category: <span className="font-medium">{item.category}</span>
              </p>
              <p className="text-gray-600 text-sm mb-1">
                Price:{" "}
                <span className="font-medium">
                  {item.price > 0 ? `$${item.price}` : "Free for Adoption"}
                </span>
              </p>
              <p className="text-gray-600 text-sm mb-3">
                Location: <span className="font-medium">{item.location}</span>
              </p>

              <Link
                to={`/listing/${item._id}`}
                className="mt-auto bg-blue-600 text-white py-2 px-3 rounded-xl text-center font-medium hover:bg-blue-700 transition"
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

export default CategoryFilteredProduct;
