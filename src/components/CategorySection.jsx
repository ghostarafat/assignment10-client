// src/components/CategorySection.jsx
import React from "react";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const categories = [
    { name: "Pets", emoji: "🐶" },
    { name: "Pet Food", emoji: "🍖" },
    { name: "Accessories", emoji: "🐾" },
    { name: "Pet Care Products", emoji: "🧴" },
  ];

  return (
    <section className="py-12 container mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/category-filtered-product/${cat.name}`}
            className="bg-white p-4 rounded shadow hover:shadow-lg text-center"
          >
            <span className="text-3xl block mb-2">{cat.emoji}</span>
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
