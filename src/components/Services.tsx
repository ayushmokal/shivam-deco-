import { motion } from "framer-motion";
import { Heart, Cake, Star } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Wedding Decoration",
    description: "Create the perfect ambiance for your special day with our elegant wedding decoration services.",
  },
  {
    icon: Cake,
    title: "Birthday Celebration",
    description: "Make your birthday memorable with our creative and festive decoration arrangements.",
  },
  {
    icon: Star,
    title: "Special Events",
    description: "Transform any space for corporate events, parties, or special occasions.",
  },
];

export const Services = () => {
  return (
    <section className="py-20 px-4 bg-secondary-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Crafting Perfect Moments</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <service.icon className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-secondary">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};