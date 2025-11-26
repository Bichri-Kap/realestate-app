import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ city, minPrice, maxPrice, bedrooms });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-md p-4 flex flex-col md:flex-row gap-4 items-end"
    >
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Lusaka"
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Min Price</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="10000"
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Max Price</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="500000"
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Bedrooms</label>
        <input
          type="number"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          placeholder="2"
          className="border rounded-md p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}
