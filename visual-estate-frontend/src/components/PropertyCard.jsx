import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { cn } from "../lib/utils";

import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { TbCarGarage } from "react-icons/tb";
import { RxDimensions } from "react-icons/rx";
import { AiOutlineColumnWidth } from "react-icons/ai";

export default function PropertyCard({ property }) {
  const displayPrice = property.price ?? property.rent_amount;

  const statusColors = {
    available: "bg-green-500 text-white",
    reserved: "bg-yellow-500 text-white",
    sold: "bg-gray-600 text-white",
    processing: "bg-blue-600 text-white",
  };

  return (
    <Link to={`/property/${property.id}`}>
      <Card className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl rounded-xl">

        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={
              property?.images?.[0]?.image ||
              "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
            }
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Status Badge */}
          {property.status && (
            <span
              className={cn(
                "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow",
                statusColors[property.status]
              )}
            >
              {property.status}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {property.title || "Untitled Property"}
          </h3>

          {/* City */}
          <p className="text-gray-500 text-sm mb-2 line-clamp-1">
            {property.city || "Location not specified"}
          </p>

          {/* Price */}
          <p className="text-indigo-600 font-bold text-lg">
            {displayPrice
              ? `ZMW ${Number(displayPrice).toLocaleString()}`
              : "Contact for price"}
          </p>

          {/* Attributes Icons */}
          <div className="flex flex-wrap gap-4 text-gray-700 text-sm mt-3">
            <div className="flex items-center gap-1">
              <IoBedOutline className="w-4 h-4 text-gray-500" />
              <span>{property.bedrooms ?? 0}</span>
            </div>

            <div className="flex items-center gap-1">
              <LiaBathSolid className="w-4 h-4 text-gray-500" />
              <span>{property.bathrooms ?? 0}</span>
            </div>

            {property.parking != null && (
              <div className="flex items-center gap-1">
                <TbCarGarage className="w-4 h-4 text-gray-500" />
                <span>{property.parking}</span>
              </div>
            )}

            {property.floor_size != null && (
              <div className="flex items-center gap-1">
                <RxDimensions className="w-4 h-4 text-gray-500" />
                <span>{property.floor_size} m²</span>
              </div>
            )}

            {property.erf_size != null && (
              <div className="flex items-center gap-1">
                <AiOutlineColumnWidth className="w-4 h-4 text-gray-500" />
                <span>{property.erf_size} m²</span>
              </div>
            )}
          </div>

          {/* Features Pills */}
          {property.features?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {property.features.slice(0, 3).map((feature) => (
                <span
                  key={feature.id}
                  className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded"
                >
                  {feature.name}
                </span>
              ))}

              {/* "+X more" indicator */}
              {property.features.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{property.features.length - 3} more
                </span>
              )}
            </div>
          )}

        </div>
      </Card>
    </Link>
  );
}
