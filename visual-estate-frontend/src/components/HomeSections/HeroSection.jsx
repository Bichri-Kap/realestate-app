import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

export default function HeroSection({ featuredProperty }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative bg-gray-900">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Visual Estate</span>
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Logo"
                className="h-8 w-auto"
              />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white text-sm font-semibold hover:text-indigo-400"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-white text-sm font-semibold hover:text-indigo-400"
            >
              Log in →
            </a>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-gray-900 p-6">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Visual Estate</span>
                <img
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Logo"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-white font-semibold hover:bg-white/10"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-white font-semibold hover:bg-white/10"
              >
                Log in
              </a>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Hero Content */}
      <div className="relative px-6 pt-32 pb-32 text-center sm:pt-40 sm:pb-40 lg:pt-48 lg:pb-48">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Discover Your Next Home
        </h1>
        <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl mb-8">
          Explore beautiful properties across Zambia and find a place that suits your lifestyle.
        </p>
        <a
          href={featuredProperty ? `/property/${featuredProperty.id}` : "#"}
          className="inline-block px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-400 transition"
        >
          View Featured Property
        </a>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-50"></div>
    </div>
  );
}
