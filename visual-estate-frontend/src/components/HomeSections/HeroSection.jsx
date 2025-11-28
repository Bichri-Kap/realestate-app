import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import heroImg from "../../assets/roofs-small-blue-yellow-houses-with-copyspace-sky.jpg";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

export default function HeroSection({ featuredProperty }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative h-[70vh] flex flex-col">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Hero Background"
          className="h-full w-full object-cover brightness-50"
        />
      </div>

      {/* Navigation */}
      <header className="absolute inset-x-0 top-0 z-50 bg-transparent">
        <nav className="flex items-center justify-between p-6 lg:px-10">
          <div className="flex lg:flex-1">
            <a href="/" className="text-white text-xl font-bold tracking-wide">
              Visual Estate
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 p-2.5 text-white"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white text-sm font-medium hover:text-indigo-300 transition"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm text-white hover:text-indigo-300">
              Log in →
            </a>
          </div>
        </nav>
      </header>

      {/* Hero content */}
      <div className="flex flex-col justify-center items-start px-6 lg:px-12 h-full mt-10">
        <h1 className="text-white text-4xl md:text-5xl font-bold max-w-2xl leading-tight">
          Discover Your Next Home
        </h1>

        <p className="text-white/90 text-lg md:text-xl max-w-2xl mt-4">
          Explore beautiful properties across Zambia and find a place that suits your lifestyle.
        </p>

        <a
          href={featuredProperty ? `/property/${featuredProperty.id}` : "#"}
          className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-500 transition"
        >
          View Featured Property
        </a>
      </div>
    </section>
  );
}
