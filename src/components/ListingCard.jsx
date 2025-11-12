import React from "react";
import { Link } from "react-router-dom";

const ListingCard = ({ item, theme }) => {
  return (
    <div
      className={`group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full
      ${theme === "light" ? "bg-white" : "bg-gray-800 border border-gray-700"}`}
    >
      {/* Image Section */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Info Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h3
          className={`font-extrabold text-lg mb-1 tracking-wide ${
            theme === "light" ? "text-gray-800" : "text-gray-100"
          }`}
        >
          {item.name}
        </h3>

        <p
          className={`text-sm mb-1 ${
            theme === "light" ? "text-gray-600" : "text-gray-400"
          }`}
        >
          Category: <span className="font-medium">{item.category}</span>
        </p>

        {/* Price & Location */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <p
            className={`${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Price:{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {item.price > 0 ? `৳${item.price}` : "Free"}
            </span>
          </p>
          <p
            className={`${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            📍 <span className="font-medium">{item.location}</span>
          </p>
        </div>

        {/* Button at bottom, full width */}
        <div className="mt-auto w-full">
          <Link
            to={`/listing-details/${item._id}`}
            className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-center font-medium shadow-md hover:shadow-lg hover:opacity-90 transition duration-300"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
