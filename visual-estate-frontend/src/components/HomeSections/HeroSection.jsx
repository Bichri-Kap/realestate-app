import { useState, useEffect } from "react";
import HeroSearch from "./HeroSearch";

import hero1 from "../../assets/roofs-small-blue-yellow-houses-with-copyspace-sky.jpg";
import hero2 from "../../assets/3d-house-model-with-modern-architecture.jpg";
import hero3 from "../../assets/analog-landscape-city-with-buildings.jpg";
import hero4 from "../../assets/new-home-keys-plan-table-with-defocused-couple.jpg";
import hero5 from "../../assets/villa-house-model-key-drawing-retro-desktop-real-estate-sale-concept.jpg";

export default function HeroSection({ featuredProperty }) {
  const imagesToUse = [hero1, hero2, hero3, hero4, hero5];
  const [bgIndex, setBgIndex] = useState(0);

  // Carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % imagesToUse.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []); // empty dependency array, no warning

  const bgImage = imagesToUse[bgIndex];

  const handleSearch = (filters) => {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.propertyType) params.append("propertyType", filters.propertyType);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.bedrooms) params.append("bedrooms", filters.bedrooms);
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <section className="relative w-full min-h-[80vh] overflow-hidden flex flex-col">

      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-center bg-cover bg-no-repeat transition-opacity duration-1000"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Single overlay for readability */}
      <div className="absolute inset-0 bg-black/20 -z-0" />

      {/* Hero Content */}
      <div className="flex flex-col justify-center items-start px-6 lg:px-24 pt-10 min-h-[80vh] max-w-screen-xl mx-auto z-40">
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
          Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Dream Property</span>
        </h1>

        <p className="text-white text-lg md:text-xl mt-4 max-w-2xl text-muted-foreground">
          Explore beautiful properties across Zambia and find a place that suits your lifestyle.
        </p>

        {/* HeroSearch */}
        <div className="mt-6 w-full max-w-3xl bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
          <HeroSearch onSearch={handleSearch} simple={true} />
        </div>

        {/* Featured CTA */}
        {featuredProperty && (
          <a
            href={`/property/${featuredProperty.id}`}
            className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-500 transition"
          >
            View Featured Property
          </a>
        )}
      </div>
    </section>
  );
}
