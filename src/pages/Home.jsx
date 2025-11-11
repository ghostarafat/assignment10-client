import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Banner from "../components/Banner";
import CategorySection from "../components/CategorySection";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Home = () => {
  const [listings, setListings] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get("https://assignment10-server-nine-eta.vercel.app/listings?limit=6")
      .then((res) => setListings(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "light"
          ? "bg-gray-50 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      {/* Banner Section */}
      <Banner />

      {/* Category Section */}
      <CategorySection />

      {/* Recent Listings */}
      <section className="py-12 container mx-auto px-4">
        <h2
          className={`text-3xl font-extrabold mb-8 text-center ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          Recent Listings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item._id}
              className={`rounded-xl shadow-md overflow-hidden flex flex-col transition transform hover:scale-105 duration-300 ${
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
                <p>Category: {item.category}</p>
                <p>
                  Price:{" "}
                  {item.price > 0 ? `$${item.price}` : "Free for Adoption"}
                </p>
                <p>Location: {item.location}</p>

                <Link
                  to={`/listing-details/${item._id}`}
                  className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-center transition"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Adopt Section */}
      <section className="py-16 bg-gradient-to-r from-pink-100 to-yellow-100 text-center max-w-[1440px] mx-auto rounded-2xl shadow-inner">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-pink-700">
          Why Adopt from PawMart?
        </h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700">
          Every pet deserves a loving home. Adopting reduces stray animals and
          gives pets a second chance at life. Join us in making a difference!
        </p>
      </section>

      {/* Pet Heroes Section */}
      <section className="py-16 container max-w-[1440px] mx-auto text-center px-4">
        <h2
          className={`text-3xl md:text-4xl font-extrabold mb-10 ${
            theme === "light" ? "text-gray-800" : "text-gray-100"
          }`}
        >
          Meet Our Pet Heroes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "John Doe", role: "Pet Care Volunteer" },
            { name: "Jane Smith", role: "Adopter" },
            { name: "Bob Johnson", role: "Shelter Worker" },
            { name: "Alice Brown", role: "Breeder" },
          ].map((hero) => (
            <div
              key={hero.name}
              className={`p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 ${
                theme === "light" ? "bg-white" : "bg-gray-800"
              }`}
            >
              <span className="text-4xl">🐾</span>
              <h3
                className={`mt-4 text-xl font-semibold ${
                  theme === "light" ? "text-gray-800" : "text-gray-100"
                }`}
              >
                {hero.name}
              </h3>
              <p
                className={`mt-1 ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {hero.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
