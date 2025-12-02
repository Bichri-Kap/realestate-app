import { TrendingUp, Shield, Users } from "lucide-react";

const FEATURES = [
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Wide Selection",
    description: "Thousands of properties across all categories and price ranges.",
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Verified Listings",
    description: "All properties are verified and approved by our team.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Expert Agents",
    description: "Connect with experienced and rated real estate professionals.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Visual Estate</h2>
          <p className="text-gray-600">
            Your trusted partner in finding the perfect property.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
