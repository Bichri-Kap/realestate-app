import { useState, useEffect } from "react";
import HeroSearch from "./HeroSearch";

import hero1 from "../../assets/image_1.jpg";
import hero2 from "../../assets/image_2.jpg";
import hero3 from "../../assets/image_3.jpg";
import hero4 from "../../assets/image_4.jpg";
import hero5 from "../../assets/image_5.jpg";

const IMAGES = [hero1, hero2, hero3, hero4, hero5];
const SLIDE_DURATION = 10000; // 10s

export default function HeroSection({ featuredProperty }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] overflow-hidden flex flex-col">

      {/* Background layers */}
      {IMAGES.map((img, i) => (
        <div
          key={img}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms]"
          style={{
            backgroundImage: `url(${img})`,
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-start px-6 lg:px-24 pt-10 min-h-[80vh] max-w-screen-xl mx-auto">
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
          Find Your Dream Property
        </h1>

        <p className="text-white text-lg md:text-xl mt-4 max-w-2xl">
          Explore beautiful properties across Zambia and find a place that suits your lifestyle.
        </p>

        <div className="mt-6 w-full max-w-3xl bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
          <HeroSearch simple />
        </div>

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
