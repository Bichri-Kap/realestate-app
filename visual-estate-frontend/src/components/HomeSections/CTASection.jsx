import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
      <div className="container mx-auto text-center space-y-6 px-4 sm:px-6 lg:px-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Find Your Dream Home?
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Join thousands of satisfied customers who found their perfect property with Visual Estate
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <Link
            to="/properties"
            className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Browse Properties
          </Link>
          <Link
            to="/auth"
            className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
