import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./components/PropertyDetail";

const stockImages = [
  "https://images.unsplash.com/photo-1560184897-6c5a34803a8c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1572120360610-d971b9b28f3c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
];

function App() {
  const [properties, setProperties] = useState([]);
  const [featuredProperty, setFeaturedProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/properties/");
        const propertyArray = response.data.results || [];

        const normalized = propertyArray.map((p, index) => ({
          ...p,
          images: p.images?.map(img => ({
            ...img,
            image: img.image.startsWith("http")
              ? img.image
              : `http://localhost:8000${img.image}`,
          })) ?? [{ image: stockImages[index % stockImages.length] }],
        }));

        setProperties(normalized);

        if (normalized.length > 0) setFeaturedProperty(normalized[0]);

      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-0"> {/* pushes content below fixed header */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                properties={properties}
                featuredProperty={featuredProperty}
              />
            }
          />

          <Route
            path="/properties"
            element={
              <div className="container mx-auto px-4">
                <Properties properties={properties} stockImages={stockImages} />
              </div>
            }
          />

          <Route
            path="/property/:id"
            element={
              <div className="container mx-auto px-4">
                <PropertyDetail />
              </div>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
