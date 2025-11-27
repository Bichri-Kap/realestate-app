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
        {properties.slice(0, 6).map((property, index) => (
          <motion.div
            key={property.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <PropertyCard
              property={{
                ...property,
                images: property.images?.length
                  ? property.images
                  : [{ image: stockImages[index % stockImages.length] }],
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
