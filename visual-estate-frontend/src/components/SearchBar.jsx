import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ city });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-md p-4 flex gap-4 items-center"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city, e.g. Lusaka"
        className="border rounded-md p-2 flex-1"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}
