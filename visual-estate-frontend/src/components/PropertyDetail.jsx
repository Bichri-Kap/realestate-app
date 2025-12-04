import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "axios";

import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { TbCarGarage } from "react-icons/tb";
import { RxDimensions } from "react-icons/rx";
import { AiOutlineColumnWidth } from "react-icons/ai";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/properties/${id}/`
        );

        const data = response.data;

        setProperty({
          ...data,
          price: data?.price ?? data?.rent_amount ?? null,
          city: data?.city || "Location not specified",
          bedrooms: data?.bedrooms ?? 0,
          bathrooms: data?.bathrooms ?? 0,
          images: data?.images ?? [],
          features: data?.features ?? [],
          status: data?.status || "available",
        });
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );

  if (!property)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <h2 className="text-2xl font-semibold">Property not found</h2>
        <Link to="/properties" className="mt-4 text-indigo-600 underline">
          Back to Properties
        </Link>
      </div>
    );

  const displayPrice = property.price;

  const statusColors = {
    available: "bg-green-600 text-white",
    reserved: "bg-yellow-500 text-white",
    sold: "bg-gray-600 text-white",
    processing: "bg-blue-600 text-white",
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="container mx-auto pt-10 px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">{property.title}</h1>

        <Link to="/properties">
          <Button variant="outline">Back to Listings</Button>
        </Link>
      </div>

      {/* Layout */}
      <div className="container mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT: Image Gallery */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden shadow-md rounded-xl">
            <div className="aspect-[4/3] w-full">
              <img
                src={
                  property.images?.[0]?.image ||
                  "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
                }
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
          </Card>

          {/* Thumbnails */}
          {property.images?.length > 1 && (
            <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-3">
              {property.images.slice(1, 6).map((img, i) => (
                <img
                  key={i}
                  src={img.image}
                  alt={`thumb-${i}`}
                  className="rounded-md h-24 w-full object-cover border hover:opacity-80 cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Summary */}
        <Card className="p-6 shadow-md rounded-xl">
          {/* Status */}
          {property.status && (
            <span
              className={cn(
                "px-3 py-1 text-sm rounded-full font-semibold",
                statusColors[property.status]
              )}
            >
              {property.status}
            </span>
          )}

          {/* Price */}
          <p className="text-3xl font-bold text-indigo-600 mt-4">
            {displayPrice
              ? `ZMW ${Number(displayPrice).toLocaleString()}`
              : "Contact for price"}
          </p>

          {/* City */}
          <p className="text-gray-600 text-lg mt-1">
            {property.city || "Location not specified"}
          </p>

          {/* Attributes */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-gray-700">
            <div className="flex items-center gap-2">
              <IoBedOutline className="w-5 h-5 text-gray-500" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>

            <div className="flex items-center gap-2">
              <LiaBathSolid className="w-5 h-5 text-gray-500" />
              <span>{property.bathrooms} Bathrooms</span>
            </div>

            {property.parking != null && (
              <div className="flex items-center gap-2">
                <TbCarGarage className="w-5 h-5 text-gray-500" />
                <span>{property.parking} Parking</span>
              </div>
            )}

            {property.floor_size != null && (
              <div className="flex items-center gap-2">
                <RxDimensions className="w-5 h-5 text-gray-500" />
                <span>{property.floor_size} m² Floor</span>
              </div>
            )}

            {property.erf_size != null && (
              <div className="flex items-center gap-2">
                <AiOutlineColumnWidth className="w-5 h-5 text-gray-500" />
                <span>{property.erf_size} m² Plot</span>
              </div>
            )}
          </div>

          {/* Features */}
          {property.features?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {property.features.map((feature) => (
                  <span
                    key={feature.id}
                    className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded"
                  >
                    {feature.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Description */}
      <div className="container mx-auto px-4 mt-10">
        <Card className="p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {property.description || "No description provided."}
          </p>
        </Card>
      </div>
    </div>
  );
}
