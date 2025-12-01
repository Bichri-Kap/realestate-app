import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Visual Estate
        </Link>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/properties"
                className="text-gray-700 hover:text-blue-600"
              >
                Properties
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
