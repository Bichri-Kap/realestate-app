import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";

export default function Properties({ properties = [] }) {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    const filtered = properties.filter((p) => {
      if (newFilters.listing_type_id && p.listing_type?.id !== Number(newFilters.listing_type_id))
        return false;

      const price = Number(p.price || p.rent_amount || 0);
      if (newFilters.min_price && price < Number(newFilters.min_price)) return false;
      if (newFilters.max_price && price > Number(newFilters.max_price)) return false;

      if (newFilters.bedrooms && p.bedrooms < Number(newFilters.bedrooms)) return false;
      if (newFilters.bathrooms && p.bathrooms < Number(newFilters.bathrooms)) return false;

      if (newFilters.search) {
        const searchText = newFilters.search.toLowerCase();
        if (
          !p.title.toLowerCase().includes(searchText) &&
          !p.description.toLowerCase().includes(searchText)
        )
          return false;
      }

      return true;
    });

    setFilteredProperties(filtered);
  };

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="px-4 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Filters */}
        <div className="lg:col-span-1">
          <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Right: Properties */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">
              No properties match your filters.
            </p>
          ) : (
            filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                whileHover={{ scale: 1.03 }}
                className="transition-transform"
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
