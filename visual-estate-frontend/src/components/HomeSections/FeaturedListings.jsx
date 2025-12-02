import { motion } from "framer-motion";
import PropertyCard from "../PropertyCard";
import hero1 from "../../assets/roofs-small-blue-yellow-houses-with-copyspace-sky.jpg";
import hero2 from "../../assets/3d-house-model-with-modern-architecture.jpg";
import hero3 from "../../assets/analog-landscape-city-with-buildings.jpg";
import hero4 from "../../assets/new-home-keys-plan-table-with-defocused-couple.jpg";
import hero5 from "../../assets/villa-house-model-key-drawing-retro-desktop-real-estate-sale-concept.jpg";

const fallbackImages = [hero1, hero2, hero3, hero4, hero5];

export default function FeaturedListings({ properties = [] }) {
  if (!properties || properties.length === 0) {
    return <p className="text-gray-500 text-center py-10">No properties available.</p>;
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
        Featured Listings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {properties.slice(0, 6).map((property, index) => {
          // Ensure property has images, otherwise use fallback
          const safeProperty = {
            ...property,
            images:
              property?.images && property.images.length > 0
                ? property.images
                : [{ image: fallbackImages[index % fallbackImages.length] }],
            price: property?.price ?? property?.rent_amount ?? null,
            city: property?.city ?? "Location not specified",
            bedrooms: property?.bedrooms ?? 0,
            bathrooms: property?.bathrooms ?? 0,
            features: property?.features ?? [],
          };

          return (
            <motion.div
              key={property?.id ?? index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <PropertyCard property={safeProperty} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
