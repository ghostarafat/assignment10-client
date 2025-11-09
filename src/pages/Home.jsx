import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/listings?limit=6")
      .then((res) => setListings(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner Section */}
      <section className="bg-blue-500 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">
          Find Your Furry Friend Today!
        </h1>
        <p className="text-lg">Adopt, Don’t Shop — Give a Pet a Home.</p>
      </section>

      {/* Category Section */}
      <section className="py-12 container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link
            to="/category-filtered-product/Pets"
            className="bg-white p-4 rounded shadow hover:shadow-lg text-center"
          >
            🐶 Pets (Adoption)
          </Link>
          <Link
            to="/category-filtered-product/Pet Food"
            className="bg-white p-4 rounded shadow hover:shadow-lg text-center"
          >
            🍖 Pet Food
          </Link>
          <Link
            to="/category-filtered-product/Accessories"
            className="bg-white p-4 rounded shadow hover:shadow-lg text-center"
          >
            🐾 Accessories
          </Link>
          <Link
            to="/category-filtered-product/Pet Care Products"
            className="bg-white p-4 rounded shadow hover:shadow-lg text-center"
          >
            🧴 Pet Care Products
          </Link>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="py-12 container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Recent Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded shadow p-4 flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p>Category: {item.category}</p>
              <p>
                Price: {item.price > 0 ? `$${item.price}` : "Free for Adoption"}
              </p>
              <p>Location: {item.location}</p>
              <Link
                to={`/listing/${item._id}`}
                className="mt-auto bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition mt-2 text-center"
              >
                See Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Sections */}
      <section className="py-12 bg-gray-200 container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Why Adopt from PawMart?</h2>
        <p>
          We believe every pet deserves a loving home. Adopting helps reduce
          stray animals and gives pets a second chance at life.
        </p>
      </section>

      <section className="py-12 container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Meet Our Pet Heroes</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded shadow">
            🐾 John Doe - Pet Care Volunteer
          </div>
          <div className="bg-white p-4 rounded shadow">
            🐾 Jane Smith - Adopter
          </div>
          <div className="bg-white p-4 rounded shadow">
            🐾 Bob Johnson - Shelter Worker
          </div>
          <div className="bg-white p-4 rounded shadow">
            🐾 Alice Brown - Breeder
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
