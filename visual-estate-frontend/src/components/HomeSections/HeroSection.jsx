import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import HeroSearch from "./HeroSearch";

import hero1 from "../../assets/roofs-small-blue-yellow-houses-with-copyspace-sky.jpg";
import hero2 from "../../assets/3d-house-model-with-modern-architecture.jpg";
import hero3 from "../../assets/analog-landscape-city-with-buildings.jpg";
import hero4 from "../../assets/new-home-keys-plan-table-with-defocused-couple.jpg";
import hero5 from "../../assets/villa-house-model-key-drawing-retro-desktop-real-estate-sale-concept.jpg";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

export default function HeroSection({ featuredProperty, properties = [] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const backendImages = properties.flatMap(p => p.images?.map(img => img.image) || []).filter(Boolean);
  const fallbackImages = [hero1, hero2, hero3, hero4, hero5];
  const imagesToUse = useMemo(() => (backendImages.length ? backendImages : fallbackImages), [backendImages]);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setBgIndex(prev => (prev + 1) % imagesToUse.length), 5000);
    return () => clearInterval(interval);
  }, [imagesToUse]);

  const bgImage = imagesToUse[bgIndex];

  // Home page simplified search
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
    <section className="relative w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 min-h-[80vh] flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-center bg-cover bg-no-repeat transition-opacity duration-1000 opacity-60"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/30 -z-0" />

      {/* Navigation */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-10">
          <a href="/" className="text-white text-xl font-bold tracking-wide">Visual Estate</a>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map(item => (
              <a key={item.name} href={item.href} className="text-white text-sm font-medium hover:text-indigo-300">{item.name}</a>
            ))}
          </div>
          <div className="hidden lg:flex">
            <a href="#" className="text-white text-sm hover:text-indigo-300">Log in →</a>
          </div>
          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(true)} className="text-white">
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 bg-black/50 z-40" />
        <DialogPanel className="fixed right-0 inset-y-0 z-50 w-full max-w-sm bg-gray-900 p-6">
          <div className="flex items-center justify-between">
            <a href="/" className="text-white font-semibold text-lg">Visual Estate</a>
            <button onClick={() => setMobileMenuOpen(false)} className="text-gray-300">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {navigation.map(item => (
              <a key={item.name} href={item.href} className="block text-white text-base font-medium hover:bg-white/10 rounded-md px-3 py-2">
                {item.name}
              </a>
            ))}
          </div>
        </DialogPanel>
      </Dialog>

      {/* Hero Content */}
      <div className="flex flex-col justify-center items-start px-6 lg:px-24 pt-24 min-h-[80vh] max-w-screen-xl mx-auto z-40">
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
          Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Dream Property</span>
        </h1>
        <p className="text-white text-lg md:text-xl mt-4 max-w-2xl text-muted-foreground">
          Explore beautiful properties across Zambia and find a place that suits your lifestyle.
        </p>

        {/* HeroSearch with simplified filters */}
        <div className="mt-6 w-full max-w-3xl bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
          <HeroSearch onSearch={handleSearch} simple={true} />
        </div>

        {/* Featured CTA */}
        {featuredProperty && (
          <a href={`/property/${featuredProperty.id}`} className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-500 transition">
            View Featured Property
          </a>
        )}
      </div>
    </section>
  );
}
