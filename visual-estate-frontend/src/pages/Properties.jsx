import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/HomeSections/Navbar";

export default function Properties({ properties = [], stockImages = [] }) {
  const [filteredProperties, setFilteredProperties] = useState(properties);

  // Handler for the search bar
  const handleSearch = ({ city, minPrice, maxPrice, bedrooms }) => {
    const filtered = properties.filter((p) => {
      const price = p.price || 0;
      const beds = p.bedrooms || 0;
      const cityMatch = city ? p.city?.toLowerCase().includes(city.toLowerCase()) : true;
      const minPriceMatch = minPrice ? price >= parseInt(minPrice) : true;
      const maxPriceMatch = maxPrice ? price <= parseInt(maxPrice) : true;
      const bedroomsMatch = bedrooms ? beds >= parseInt(bedrooms) : true;

      return cityMatch && minPriceMatch && maxPriceMatch && bedroomsMatch;
    });

    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Navbar />
      <h2 className="text-3xl font-bold mb-6 text-center">All Properties</h2>

      {/* Search Bar */}
      <div className="container mx-auto px-4 mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <p className="text-gray-500 text-center">No properties match your search.</p>
      ) : (
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <Link to={`/property/${property.id}`}>
                <img
                  src={property.images?.[0]?.image || stockImages[index % stockImages.length]}
                  alt={property.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-1">{property.title}</h3>
                  <p className="text-gray-600 mb-2">{property.city || "Unknown Location"}</p>

                  <p className="text-blue-600 font-bold text-lg mb-3">
                    ${property.price?.toLocaleString() || "N/A"}
                  </p>

                  <div className="flex gap-5 text-gray-700 text-sm font-medium">
                    <span>{property.bedrooms || 0} Beds</span>
                    <span>{property.bathrooms || 0} Baths</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
