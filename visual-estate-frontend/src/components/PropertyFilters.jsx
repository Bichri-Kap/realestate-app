import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { X } from "lucide-react";

export default function PropertyFilters({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (field, value) => {
    setLocalFilters({ ...localFilters, [field]: value });
  };

  const handleApply = () => {
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    const reset = {};
    setLocalFilters(reset);
    onFilterChange(reset);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-4 sticky top-20">
      <h3 className="font-semibold text-lg mb-2">Filter Properties</h3>

      {/* Search */}
      <div>
        <label className="block text-sm font-medium mb-1">Search</label>
        <input
          type="text"
          placeholder="Search by title or description..."
          className="w-full border rounded px-3 py-2"
          value={localFilters.search || ""}
          onChange={(e) => handleChange("search", e.target.value || undefined)}
        />
      </div>

      {/* Listing Type */}
      <div>
        <label className="block text-sm font-medium mb-1">Listing Type</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={localFilters.listing_type_id || ""}
          onChange={(e) =>
            handleChange(
              "listing_type_id",
              e.target.value ? Number(e.target.value) : undefined
            )
          }
        >
          <option value="">All Types</option>
          <option value={1}>For Sale</option>
          <option value={2}>For Rent</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium mb-1">Min Price</label>
        <input
          type="number"
          placeholder="Min Price"
          className="w-full border rounded px-3 py-2"
          value={localFilters.min_price || ""}
          onChange={(e) =>
            handleChange("min_price", e.target.value ? Number(e.target.value) : undefined)
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Max Price</label>
        <input
          type="number"
          placeholder="Max Price"
          className="w-full border rounded px-3 py-2"
          value={localFilters.max_price || ""}
          onChange={(e) =>
            handleChange("max_price", e.target.value ? Number(e.target.value) : undefined)
          }
        />
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-sm font-medium mb-1">Bedrooms</label>
        <input
          type="number"
          placeholder="Min Bedrooms"
          className="w-full border rounded px-3 py-2"
          value={localFilters.bedrooms || ""}
          onChange={(e) =>
            handleChange("bedrooms", e.target.value ? Number(e.target.value) : undefined)
          }
        />
      </div>

      {/* Bathrooms */}
      <div>
        <label className="block text-sm font-medium mb-1">Bathrooms</label>
        <input
          type="number"
          placeholder="Min Bathrooms"
          className="w-full border rounded px-3 py-2"
          value={localFilters.bathrooms || ""}
          onChange={(e) =>
            handleChange("bathrooms", e.target.value ? Number(e.target.value) : undefined)
          }
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <Button onClick={handleApply}>Apply</Button>
        <Button variant="outline" onClick={handleReset} className="flex items-center">
          <X className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
