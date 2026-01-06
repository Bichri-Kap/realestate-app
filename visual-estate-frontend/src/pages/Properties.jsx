import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";
import axios from "../services/api";


export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchProperties = async (activeFilters = {}) => {
    setLoading(true);

    const params = {};

    // Listing type
    if (activeFilters.listing_type) {
      params.listing_type = activeFilters.listing_type;
    }

    // Price (sale or rent handled backend-side)
    if (activeFilters.min_price) params.min_price = activeFilters.min_price;
    if (activeFilters.max_price) params.max_price = activeFilters.max_price;

    // Rooms
    if (activeFilters.min_bedrooms)
      params.min_bedrooms = activeFilters.min_bedrooms;

    if (activeFilters.min_bathrooms)
      params.min_bathrooms = activeFilters.min_bathrooms;

    // Parking
    if (activeFilters.min_parking)
      params.min_parking = activeFilters.min_parking;

    // Sizes
    if (activeFilters.min_floor_size)
      params.min_floor_size = activeFilters.min_floor_size;

    if (activeFilters.min_erf_size)
      params.min_erf_size = activeFilters.min_erf_size;

    // Search
    if (activeFilters.search) params.search = activeFilters.search;

    // Boolean features
    [
      "pet_friendly",
      "pool",
      "garden",
      "flatlet",
      "on_auction",
      "repossessed",
      "retirement",
    ].forEach((key) => {
      if (activeFilters[key]) {
        params[key] = true;
      }
    });

    try {
      const response = await axios.get("/properties/", { params });
      setProperties(response.data.results || []);
    } catch (error) {
      console.error("Failed to fetch properties", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchProperties(newFilters);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="px-4 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Filters */}
        <div className="lg:col-span-1">
          <PropertyFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Properties */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="col-span-full text-center text-gray-500">
              Loading properties...
            </p>
          ) : properties.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No properties match your filters.
            </p>
          ) : (
            properties.map((property) => (
              <motion.div
                key={property.id}
                whileHover={{ scale: 1.03 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
