export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

        {/* Column 1 */}
        <div>
          <h2 className="text-xl font-semibold text-white">Visual Estate</h2>
          <p className="mt-3 text-gray-400">
            Helping you find your dream property across the country.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li className="hover:text-white"><a href="/">Home</a></li>
            <li className="hover:text-white"><a href="/properties">Properties</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <p className="mt-3 text-gray-400">
            support@visualestate.com
          </p>
        </div>

      </div>

      <div className="border-t border-gray-700 py-4 text-center text-gray-500">
        © 2025 Visual Estate. All rights reserved.
      </div>
    </footer>
  );
}
