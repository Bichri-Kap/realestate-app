import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./HomeSections/Navbar";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/properties/${id}/`);
        const data = response.data;

        const safeProperty = {
          ...data,
          price: data?.price ?? data?.rent_amount ?? null,
          city: data?.city ?? "Location not specified",
          bedrooms: data?.bedrooms ?? 0,
          bathrooms: data?.bathrooms ?? 0,
          images: data?.images ?? [],
        };

        setProperty(safeProperty);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p className="text-gray-500 p-4">Loading...</p>;
  if (!property) return <p className="text-red-500 p-4">Property not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">
          {property.title ?? "Untitled Property"}
        </h2>

        <p className="text-gray-700 mb-2">
          {property.description ?? "No description available."}
        </p>

        <p className="text-gray-700 mb-2">
          Price:{" "}
          {property.price != null
            ? `$${property.price.toLocaleString()}`
            : "Contact for price"}
        </p>

        <p className="text-gray-700 mb-2">City: {property.city}</p>
        <p className="text-gray-700 mb-2">Bedrooms: {property.bedrooms}</p>
        <p className="text-gray-700 mb-2">Bathrooms: {property.bathrooms}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {property.images.length > 0 ? (
            property.images.map((img, idx) => (
              <img
                key={idx}
                src={
                  img?.image ??
                  "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
                }
                alt={`Property image ${idx}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No images available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
