import SearchBar from "../SearchBar";

export default function SearchSection({ onSearch }) {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-12 -mt-16 relative z-10">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <SearchBar onSearch={onSearch} />
      </div>
    </section>
  );
}
