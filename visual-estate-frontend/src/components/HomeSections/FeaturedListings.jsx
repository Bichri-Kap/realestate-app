import { motion } from "framer-motion";
import PropertyCard from "../PropertyCard";

export default function FeaturedListings({ properties, stockImages }) {
  if (!properties || properties.length === 0)
    return <p className="text-gray-500 text-center py-10">No properties available.</p>;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
        Featured Listings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {properties.slice(0, 6).map((property, index) => {
          // Safely fallback missing data
          const safeProperty = {
            ...property,
            images:
              property?.images && property.images.length > 0
                ? property.images
                : [{ image: stockImages[index % stockImages.length] }],
            price: property?.price ?? property?.rent_amount ?? null,
            city: property?.city ?? "Location not specified",
            bedrooms: property?.bedrooms ?? 0,
            bathrooms: property?.bathrooms ?? 0,
            features: property?.features ?? [],
            moreFilters: property?.moreFilters ?? {},
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
