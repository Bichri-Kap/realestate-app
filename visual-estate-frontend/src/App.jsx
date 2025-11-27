import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";

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
              : `http://localhost:8000${img.image}`
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
  <div className="bg-indigo-500 text-white p-4 rounded-lg">
    Tailwind is working!
  </div>

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Visual Estate</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link></li>
              <li><Link to="/properties" className="text-gray-700 hover:text-blue-600">Properties</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ROUTES */}
      <main className="container mx-auto px-4 py-12">
        <Routes>
          <Route path="/" element={<Home properties={properties} featuredProperty={featuredProperty} />} />
          <Route path="/properties" element={<Properties properties={properties} stockImages={stockImages} />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          &copy; 2025 Visual Estate. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
