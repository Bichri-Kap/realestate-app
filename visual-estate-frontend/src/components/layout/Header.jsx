import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Properties", to: "/properties" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  const navItemClasses = (path) =>
    `px-4 py-2 transition ${
      location.pathname === path
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Visual Estate
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link key={item.name} to={item.to} className={navItemClasses(item.to)}>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Sign In */}
        <Link
          to="/auth"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </Link>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-gray-700 ml-4"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow px-6 pb-6 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={navItemClasses(item.to)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
