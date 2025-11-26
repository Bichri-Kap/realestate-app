import React from "react";
import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  return (
    <Link
      to={`/property/${property.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
    >
      <img
        src={property.images?.[0]?.image || "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"}
        alt={property.title}
        className="w-full h-48 object-cover"
      />



      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
        <p className="text-gray-600">{property.city}</p>
        <p className="text-blue-600 font-bold mt-2">ZMW {property.price.toLocaleString()}</p>
        <p className="text-gray-700 text-sm mt-1">{property.bedrooms} bedrooms</p>
      </div>
    </Link>
  );
}

export default PropertyCard;
