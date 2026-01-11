import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { X, ChevronDown, ChevronUp } from "lucide-react";

export default function PropertyFilters({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [showMore, setShowMore] = useState(false);

  const handleChange = (field, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleBoolean = (field) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleApply = () => {
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    setLocalFilters({});
    onFilterChange({});
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-5 sticky top-20">

      <h3 className="font-semibold text-lg">Filter Properties</h3>

      {/* Search */}
      <div>
        <label className="block text-sm font-medium mb-1">Search</label>
        <input
          type="text"
          placeholder="City, area, keyword..."
          className="w-full border rounded px-3 py-2"
          value={localFilters.search || ""}
          onChange={(e) =>
            handleChange("search", e.target.value || undefined)
          }
        />
      </div>

      {/* Listing Type */}
      <div>
        <label className="block text-sm font-medium mb-1">Listing Type</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={localFilters.listing_type || ""}
          onChange={(e) =>
            handleChange("listing_type", e.target.value || undefined)
          }
        >
          <option value="">All</option>
          <option value="1">For Sale</option>
          <option value="2">For Rent</option>
        </select>
      </div>

      {/* Price */}
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          placeholder="Min Price"
          className="border rounded px-3 py-2"
          value={localFilters.min_price || ""}
          onChange={(e) =>
            handleChange("min_price", e.target.value || undefined)
          }
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border rounded px-3 py-2"
          value={localFilters.max_price || ""}
          onChange={(e) =>
            handleChange("max_price", e.target.value || undefined)
          }
        />
      </div>

      {/* More Filters Toggle */}
      <button
        type="button"
        onClick={() => setShowMore(!showMore)}
        className="flex items-center justify-between w-full text-sm font-medium text-indigo-600"
      >
        More Filters
        {showMore ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* More Filters */}
      {showMore && (
        <div className="space-y-5 border-t pt-4">

          {/* Rooms & Parking */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min Bedrooms"
              className="border rounded px-3 py-2"
              value={localFilters.bedrooms || ""}
              onChange={(e) =>
                handleChange("bedrooms", e.target.value || undefined)
              }
            />
            <input
              type="number"
              placeholder="Min Bathrooms"
              className="border rounded px-3 py-2"
              value={localFilters.bathrooms || ""}
              onChange={(e) =>
                handleChange("bathrooms", e.target.value || undefined)
              }
            />
          </div>

          <input
            type="number"
            placeholder="Min Parking / Garage"
            className="w-full border rounded px-3 py-2"
            value={localFilters.parking || ""}
            onChange={(e) =>
              handleChange("parking", e.target.value || undefined)
            }
          />

          {/* Sizes */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min Floor Size (m²)"
              className="border rounded px-3 py-2"
              value={localFilters.min_floor_size || ""}
              onChange={(e) =>
                handleChange("min_floor_size", e.target.value || undefined)
              }
            />
            <input
              type="number"
              placeholder="Min Erf Size (m²)"
              className="border rounded px-3 py-2"
              value={localFilters.min_erf_size || ""}
              onChange={(e) =>
                handleChange("min_erf_size", e.target.value || undefined)
              }
            />
          </div>

          {/* FEATURES */}
          <div>
            <p className="text-sm font-semibold mb-2">Features</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                ["pet_friendly", "Pet Friendly"],
                ["garden", "Garden"],
                ["pool", "Pool"],
                ["flatlet", "Flatlet"],
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!localFilters[key]}
                    onChange={() => handleToggleBoolean(key)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* OTHER */}
          <div>
            <p className="text-sm font-semibold mb-2">Other</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                ["retirement", "Retirement"],
                ["repossessed", "Repossessed"],
                ["on_show", "On Show"],
                ["estate", "Security Estate / Cluster"],
                ["on_auction", "On Auction"],
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!localFilters[key]}
                    onChange={() => handleToggleBoolean(key)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <Button onClick={handleApply} className="flex-1">
          Apply
        </Button>
        <Button variant="outline" onClick={handleReset}>
          <X className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>
    </div>
  );
}
