import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import PropertyDetail from "./components/PropertyDetail";
import PropertyCard from "./components/PropertyCard";
import SearchBar from "./components/SearchBar";

function App() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [featuredProperty, setFeaturedProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/properties/");
                const propertyArray = response.data.results || [];

                // Normalize URLs so they always have the correct host
                const normalizedProperties = propertyArray.map(p => ({
                    ...p,
                    images: p.images?.map(img => ({
                        ...img,
                        image: img.image.startsWith("http")
                            ? img.image
                            : `http://localhost:8000${img.image}`
                    }))
                }));

                setProperties(normalizedProperties);
                setFilteredProperties(normalizedProperties);

                if (normalizedProperties.length > 0) {
                    setFeaturedProperty(normalizedProperties[0]);
                }
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);


    const handleSearch = ({ city, minPrice, maxPrice, bedrooms }) => {
        const filtered = properties.filter((p) => {
            return (
                (!city || p.city?.toLowerCase().includes(city.toLowerCase())) &&
                (!minPrice || p.price >= parseFloat(minPrice)) &&
                (!maxPrice || p.price <= parseFloat(maxPrice)) &&
                (!bedrooms || p.bedrooms === parseInt(bedrooms))
            );
        });

        setFilteredProperties(filtered);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Visual Estate</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="#" className="text-gray-700 hover:text-blue-600">Home</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-blue-600">Properties</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-blue-600">About</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-blue-600">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Banner */}
            {featuredProperty && (
                <div
                    className="relative bg-gray-800 text-white h-96 flex items-center justify-center mb-12"
                    style={{
                        backgroundImage: `url(${featuredProperty.images?.[0]?.image || "https://via.placeholder.com/1200x400"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center">
                        <h2 className="text-4xl font-bold mb-2">{featuredProperty.title}</h2>
                        <p className="text-xl mb-4">
                            ${featuredProperty.price?.toLocaleString()}
                        </p>
                        <a
                            href={`/properties/${featuredProperty.id}`}
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded"
                        >
                            View Property
                        </a>
                    </div>
                </div>
            )}

            {/* Main Section */}
            <main className="container mx-auto px-4 py-12">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <h2 className="text-3xl font-bold mb-6">Find Your Dream Property</h2>
                                <p className="text-gray-700 mb-6">
                                    Browse through thousands of properties available for sale or rent.
                                </p>

                                <SearchBar onSearch={handleSearch} />

                                {loading ? (
                                    <p className="text-gray-500 mt-6">Loading properties...</p>
                                ) : Array.isArray(filteredProperties) ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                        {filteredProperties.map((property) => (
                                            <PropertyCard key={property.id} property={property} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-red-500 mt-6">No properties found or data invalid.</p>
                                )}
                            </>
                        }
                    />

                    {/* Property Detail Route */}
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
