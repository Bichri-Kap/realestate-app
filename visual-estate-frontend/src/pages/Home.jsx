import HeroSection from '../components/HomeSections/HeroSection';
import SearchSection from '../components/HomeSections/SearchSection';
import FeaturedListings from '../components/HomeSections/FeaturedListings';
import CTASection from '../components/HomeSections/CTASection';

export default function Home({ properties, featuredProperty, onSearch }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroSection featuredProperty={featuredProperty} />
      <SearchSection onSearch={onSearch} />
      <FeaturedListings properties={properties} />
      <CTASection />
    </div>
  );
}
