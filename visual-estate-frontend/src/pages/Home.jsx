import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Stock fallback images
const stockImages = [
  "https://images.unsplash.com/photo-1560184897-6c5a34803a8c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1572120360610-d971b9b28f3c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
];

export default function Home({ properties, featuredProperty }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">

      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[350px] lg:h-[420px] mb-12 px-4 sm:px-8 lg:px-12">
        <div
          className="absolute inset-0 bg-cover bg-center rounded-b-3xl"
          style={{
            backgroundImage: `url(${featuredProperty?.images?.[0]?.image || stockImages[0]})`,
          }}
        ></div>

        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-b-3xl"></div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide mb-3 sm:mb-4">
            Discover Your Next Home
          </h1>
          <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-2xl">
            Explore beautiful properties across Zambia and find a place that suits your lifestyle.
          </p>
          {featuredProperty && (
            <Link
              to={`/property/${featuredProperty.id}`}
              className="mt-4 sm:mt-6 px-5 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold shadow-lg transition"
            >
              View Featured Property
            </Link>
          )}
        </div>
      </section>

      {/* Property Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Featured Listings</h2>

        {properties.length === 0 ? (
          <p className="text-gray-500">No properties available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {properties.slice(0, 6).map((property, index) => (
              <motion.div
                key={property.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden relative"
              >
                <Link to={`/property/${property.id}`}>
                  {/* Image with consistent aspect ratio */}
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <img
                      src={property.images?.[0]?.image || stockImages[index % stockImages.length]}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </div>

                  {/* Property Info */}
                  <div className="p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{property.title}</h3>
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">{property.city || "Unknown Location"}</p>
                    <p className="text-blue-600 font-bold text-base sm:text-lg mb-2">
                      ${property.price?.toLocaleString()}
                    </p>
                    <div className="flex gap-4 text-gray-700 text-sm sm:text-sm font-medium">
                      <span>{property.bedrooms} Beds</span>
                      <span>{property.bathrooms} Baths</span>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition duration-300 rounded-2xl"></div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
