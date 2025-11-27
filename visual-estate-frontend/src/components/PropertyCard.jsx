import React from "react";
import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  return (
    <Link
      to={`/property/${property.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative">
        <img
          src={
            property.images?.[0]?.image ||
            "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
          }
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        {/* Optional overlay badge */}
        {property.isFeatured && (
          <span className="absolute top-2 left-2 bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
          {property.title}
        </h3>
        <p className="text-gray-500 text-sm">{property.city}</p>
        <p className="text-indigo-600 font-bold mt-2 text-base sm:text-lg">
          ZMW {property.price.toLocaleString()}
        </p>
        <p className="text-gray-700 text-sm mt-1">
          {property.bedrooms} {property.bedrooms === 1 ? "bedroom" : "bedrooms"}
        </p>
      </div>
    </Link>
  );
}

export default PropertyCard;
