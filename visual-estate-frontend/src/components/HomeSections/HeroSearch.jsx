import React, { useState } from "react";

// Example static options, you can fetch from API if needed
const PROPERTY_TYPES = ["House", "Apartment", "Townhouse", "Vacant Land", "Farm", "Commercial", "Industrial"];
const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, 6];
const BATHROOM_OPTIONS = [1, 2, 3, 4];
const OTHER_FILTERS = ["Retirement", "On Show", "On Auction", "Repossessed", "Security", "Estate", "Cluster"];
const FEATURES = ["Pet Friendly", "Pool", "Garden", "Flatlet"];

export default function HeroSearch({ onSearch }) {
  const [filters, setFilters] = useState({
    listingType: "sale",
    search: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    moreFilters: {
      bathrooms: "",
      parking: "",
      floorSize: "",
      erfSize: "",
      features: [],
      other: []
    },
    showMore: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleMoreFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      moreFilters: { ...prev.moreFilters, [name]: value }
    }));
  };

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    setFilters((prev) => {
      const prevArr = prev.moreFilters[type];
      if (checked) return { ...prev, moreFilters: { ...prev.moreFilters, [type]: [...prevArr, value] } };
      return { ...prev, moreFilters: { ...prev.moreFilters, [type]: prevArr.filter((v) => v !== value) } };
    });
  };

  const handleListingTypeChange = (type) => {
    setFilters((prev) => ({ ...prev, listingType: type }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clean filters before sending
    const cleanedFilters = {
      ...filters,
      search: filters.search || undefined,
      propertyType: filters.propertyType || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      bedrooms: filters.bedrooms || undefined,
      moreFilters: Object.fromEntries(
        Object.entries(filters.moreFilters).filter(([key, value]) =>
          value !== "" && !(Array.isArray(value) && value.length === 0)
        )
      )
    };

    onSearch(cleanedFilters);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
      {/* Listing Type Toggle */}
      <div className="flex gap-2 mb-4">
        {["sale", "rent"].map((type) => (
          <button
            key={type}
            onClick={() => handleListingTypeChange(type)}
            className={`px-4 py-2 rounded-md font-medium transition ${
              filters.listingType === type
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {type === "sale" ? "For Sale" : "For Rent"}
          </button>
        ))}
      </div>

      {/* Main Search Form */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
        {/* City / Search */}
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium mb-1">City / Suburb / Ref</label>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleInputChange}
            placeholder="Lusaka"
            className="border rounded-md p-2 w-full"
          />
        </div>

        {/* Property Type */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Property Type</label>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleInputChange}
            className="border rounded-md p-2"
          >
            <option value="">Any</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Min Price</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleInputChange}
            placeholder="10000"
            className="border rounded-md p-2"
          />
        </div>

        {/* Max Price */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleInputChange}
            placeholder="500000"
            className="border rounded-md p-2"
          />
        </div>

        {/* Bedrooms */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Bedrooms</label>
          <select
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleInputChange}
            className="border rounded-md p-2"
          >
            <option value="">Any</option>
            {BEDROOM_OPTIONS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* More Filters */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setFilters((prev) => ({ ...prev, showMore: !prev.showMore }))}
          className="text-blue-600 font-medium underline"
        >
          {filters.showMore ? "Hide Filters" : "More Filters"}
        </button>

        {filters.showMore && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Bathrooms */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Bathrooms</label>
              <select
                name="bathrooms"
                value={filters.moreFilters.bathrooms}
                onChange={handleMoreFilterChange}
                className="border rounded-md p-2"
              >
                <option value="">Any</option>
                {BATHROOM_OPTIONS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Parking */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Parking / Garage</label>
              <input
                type="number"
                name="parking"
                value={filters.moreFilters.parking}
                onChange={handleMoreFilterChange}
                placeholder="0"
                className="border rounded-md p-2"
              />
            </div>

            {/* Floor Size */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Floor Size (sqm)</label>
              <input
                type="number"
                name="floorSize"
                value={filters.moreFilters.floorSize}
                onChange={handleMoreFilterChange}
                placeholder="0"
                className="border rounded-md p-2"
              />
            </div>

            {/* ERF Size */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">ERF Size (sqm)</label>
              <input
                type="number"
                name="erfSize"
                value={filters.moreFilters.erfSize}
                onChange={handleMoreFilterChange}
                placeholder="0"
                className="border rounded-md p-2"
              />
            </div>

            {/* Features */}
            <div className="flex flex-col col-span-full md:col-span-1">
              <span className="text-sm font-medium mb-1">Features</span>
              <div className="flex flex-wrap gap-2">
                {FEATURES.map((f) => (
                  <label key={f} className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      value={f}
                      checked={filters.moreFilters.features.includes(f)}
                      onChange={(e) => handleCheckboxChange(e, "features")}
                    />
                    {f}
                  </label>
                ))}
              </div>
            </div>

            {/* Other Filters */}
            <div className="flex flex-col col-span-full md:col-span-1">
              <span className="text-sm font-medium mb-1">Other</span>
              <div className="flex flex-wrap gap-2">
                {OTHER_FILTERS.map((f) => (
                  <label key={f} className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      value={f}
                      checked={filters.moreFilters.other.includes(f)}
                      onChange={(e) => handleCheckboxChange(e, "other")}
                    />
                    {f}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
