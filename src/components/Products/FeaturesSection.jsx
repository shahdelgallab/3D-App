import React from 'react';
import { Truck, BadgePercent, Wand2 } from 'lucide-react';

const features = [
  {
    icon: <Truck size={32} className="text-blue-600" />,
    title: "Localized Egyptian Service",
    description: "Understanding local market needs with fast, reliable delivery.",
  },
  {
    icon: <BadgePercent size={32} className="text-green-600" />,
    title: "Affordable Pricing",
    description: "Competitive rates compared to expensive import alternatives.",
  },
  {
    icon: <Wand2 size={32} className="text-purple-600" />,
    title: "Complete Journey",
    description: "End-to-end service from your idea to the finished product.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center p-6">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;