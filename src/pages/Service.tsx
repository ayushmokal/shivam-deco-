import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Star, Heart, Sparkles, PartyPopper } from "lucide-react";

const ServicePage = () => {
  const services = [
    {
      icon: Heart,
      title: "Wedding Decorations",
      description: "Transform your special day into a magical celebration with our elegant wedding decorations.",
      features: ["Customized themes", "Floral arrangements", "Lighting setup", "Venue styling"]
    },
    {
      icon: Star,
      title: "Corporate Events",
      description: "Create impressive corporate events with our professional decoration services.",
      features: ["Brand integration", "Stage design", "Seating arrangements", "Technical setup"]
    },
    {
      icon: Sparkles,
      title: "Social Gatherings",
      description: "Make your social events memorable with our creative decoration solutions.",
      features: ["Theme customization", "Photo backdrops", "Table settings", "Ambient lighting"]
    },
    {
      icon: PartyPopper,
      title: "Special Occasions",
      description: "Celebrate life's special moments with our unique decoration services.",
      features: ["Birthday setups", "Anniversary themes", "Holiday decorations", "Custom installations"]
    }
  ];

  return (
    <div className="min-h-screen bg-accent-cream">
      <Header />
      <main className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-primary-dark mb-4">Our Services</h1>
            <p className="text-primary/80 text-lg">Crafting Perfect Moments for Every Occasion</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <service.icon className="w-12 h-12 text-primary mb-6" />
                <h2 className="text-2xl font-serif text-primary-dark mb-3">{service.title}</h2>
                <p className="text-primary/80 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-primary/70">
                      <span className="w-2 h-2 bg-primary/20 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicePage;