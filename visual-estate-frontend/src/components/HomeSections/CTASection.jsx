export default function CTASection() {
  return (
    <section className="bg-indigo-600 py-16">
      <div className="container mx-auto text-center text-white px-4 sm:px-6 lg:px-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to find your dream home?</h2>
        <p className="mb-6 text-lg sm:text-xl">
          Browse our listings and discover properties that suit your style and budget.
        </p>
        <a
          href="/properties"
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Browse Listings
        </a>
      </div>
    </section>
  );
}
