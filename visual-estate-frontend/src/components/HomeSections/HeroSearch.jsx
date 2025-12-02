import React, { useState } from "react";

const PROPERTY_TYPES = ["House", "Apartment", "Townhouse", "Vacant Land", "Farm", "Commercial", "Industrial"];

export default function HeroSearch({ onSearch, simple = false }) {
  const [filters, setFilters] = useState({
    listingType: "sale",
    search: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    moreFilters: { bathrooms: "", parking: "", floorSize: "", erfSize: "", features: [], other: [] },
    showMore: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedFilters = {
      ...filters,
      search: filters.search || undefined,
      propertyType: filters.propertyType || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      bedrooms: filters.bedrooms || undefined,
      moreFilters: Object.fromEntries(
        Object.entries(filters.moreFilters).filter(([_, value]) => value !== "" && (!(Array.isArray(value)) || value.length > 0))
      ),
    };
    onSearch(cleanedFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
      {/* Top Row: always show main search input and button */}
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleInputChange}
          placeholder="Search by location, property type..."
          className="flex-1 border rounded-md p-2"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-500 transition flex items-center justify-center"
        >
          Search
        </button>
      </div>

      {/* Extra filters row, only if simple = false */}
      {!simple && (
        <div className="flex flex-wrap gap-4 mt-2">
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleInputChange}
            className="border rounded-md p-2 min-w-[120px]"
          >
            <option value="">Any Property Type</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleInputChange}
            placeholder="Min Price"
            className="border rounded-md p-2 min-w-[100px]"
          />

          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleInputChange}
            placeholder="Max Price"
            className="border rounded-md p-2 min-w-[100px]"
          />

          <select
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleInputChange}
            className="border rounded-md p-2 min-w-[80px]"
          >
            <option value="">Any Bedrooms</option>
            {[1, 2, 3, 4, 5, 6].map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      )}
    </form>
  );
}
