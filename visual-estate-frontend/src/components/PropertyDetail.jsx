import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/properties/${id}/`);
        setProperty(response.data);
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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{property.title}</h2>
      <p className="text-gray-700 mb-2">{property.description}</p>
      <p className="text-gray-700 mb-2">
        Price: ${property.price.toLocaleString()}
      </p>
      <p className="text-gray-700 mb-2">City: {property.city}</p>
      <p className="text-gray-700 mb-2">Bedrooms: {property.bedrooms}</p>
      <p className="text-gray-700 mb-2">Bathrooms: {property.bathrooms}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {property.images?.map((img, idx) => (
          <img key={idx} src={img.image} alt={`Property image ${idx}`} className="w-full h-64 object-cover rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default PropertyDetail;
