import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const CategorySection = () => {
  const categories = [
    { name: "Pets", emoji: "🐶" },
    { name: "Pet Food", emoji: "🍖" },
    { name: "Accessories", emoji: "🐾" },
    { name: "Pet Care Products", emoji: "🧴" },
  ];

  const { theme } = useContext(ThemeContext);

  return (
    <section className="py-16 container max-w-[1440px] mx-auto px-4">
      <h2
        className={`text-3xl md:text-4xl font-extrabold mb-10 text-center transition-colors duration-300 ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/category-filtered-product/${cat.name}`}
            className={`p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 flex flex-col items-center justify-center
              ${
                theme === "light"
                  ? "bg-white hover:bg-gradient-to-r hover:from-pink-100 hover:to-yellow-100 text-gray-800"
                  : "bg-gray-800 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 text-gray-100"
              }`}
          >
            <span className="text-5xl mb-4 animate-bounce">{cat.emoji}</span>
            <h3 className="text-xl font-semibold">{cat.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
