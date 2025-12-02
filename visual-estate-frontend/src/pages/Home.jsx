import HeroSection from "../components/HomeSections/HeroSection";
import CategoriesSection from "../components/HomeSections/CategoriesSection";
import FeaturedListings from "../components/HomeSections/FeaturedListings";
import WhyChooseUsSection from "../components/HomeSections/WhyChooseUsSection";
import CTASection from "../components/HomeSections/CTASection";

export default function Home({ featuredProperty, properties }) {
  return (
    <div className="min-h-screen">
      <HeroSection featuredProperty={featuredProperty} properties={properties} />
      <CategoriesSection />
      <FeaturedListings properties={properties} />
      <WhyChooseUsSection />
      <CTASection />
    </div>
  );
}
