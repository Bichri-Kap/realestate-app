import React from "react";
import { Link } from "react-router-dom";

// React Icons imports
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { TbCarGarage } from "react-icons/tb";
import { RxDimensions } from "react-icons/rx";
import { AiOutlineColumnWidth } from "react-icons/ai";

function PropertyCard({ property }) {
  const displayPrice = property.price ?? property.rent_amount;

  return (
    <Link
      to={`/property/${property?.id ?? ""}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      {/* Property Image */}
      <div className="relative">
        <img
          src={
            property?.images?.[0]?.image ||
            "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
          }
          alt={property?.title || "Property Image"}
          className="w-full h-48 object-cover"
        />
        {property?.isFeatured && (
          <span className="absolute top-2 left-2 bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>

      {/* Property Info */}
      <div className="p-4">
        {/* Title & City */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
          {property?.title || "Untitled Property"}
        </h3>
        <p className="text-gray-500 text-sm mb-2">
          {property?.city || "Location not specified"}
        </p>

        {/* Price */}
        <p className="text-indigo-600 font-bold mt-1 text-base sm:text-lg">
          {displayPrice != null
            ? `ZMW ${displayPrice.toLocaleString()}`
            : "Contact for price"}
        </p>

        {/* Main Attributes with Icons */}
        <div className="flex flex-wrap gap-4 text-gray-700 text-sm mt-2 items-center">
          <div className="flex items-center gap-1">
            <IoBedOutline className="w-4 h-4 text-gray-500" />
            <span>{property?.bedrooms ?? 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <LiaBathSolid className="w-4 h-4 text-gray-500" />
            <span>{property?.bathrooms ?? 0}</span>
          </div>
          {property?.moreFilters?.parking != null && (
            <div className="flex items-center gap-1">
              <TbCarGarage className="w-4 h-4 text-gray-500" />
              <span>{property.moreFilters.parking}</span>
            </div>
          )}
          {property?.moreFilters?.floorSize != null && (
            <div className="flex items-center gap-1">
              <RxDimensions className="w-4 h-4 text-gray-500" />
              <span>{property.moreFilters.floorSize} m²</span>
            </div>
          )}
          {property?.moreFilters?.erfSize != null && (
            <div className="flex items-center gap-1">
              <AiOutlineColumnWidth className="w-4 h-4 text-gray-500" />
              <span>{property.moreFilters.erfSize} m²</span>
            </div>
          )}
        </div>

        {/* Property Features Badges */}
        {property?.features?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {property.features.map((feature) => (
              <span
                key={feature?.id ?? Math.random()}
                className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded"
              >
                {feature?.name || "Feature"}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export default PropertyCard;
