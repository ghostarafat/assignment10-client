import React from "react";
import { Link } from "react-router-dom";

const ListingCard = ({ item, theme }) => {
  return (
    <div
      className={`rounded-2xl shadow-md overflow-hidden flex flex-col transition transform hover:scale-105 duration-300 ${
        theme === "light" ? "bg-white" : "bg-gray-800"
      }`}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
        <p className="text-sm mb-1">
          Category: <span className="font-medium">{item.category}</span>
        </p>
        <p className="font-semibold mb-1">
          Price: {item.price > 0 ? `$${item.price}` : "Free for Adoption"}
        </p>
        <p className="text-sm mb-2">
          Location: <span className="font-medium">{item.location}</span>
        </p>
        <Link
          to={`/listing-details/${item._id}`}
          className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-center transition"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
