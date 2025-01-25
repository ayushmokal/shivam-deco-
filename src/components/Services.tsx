import { motion } from "framer-motion";
import { Heart, Cake, Star, Flower, LeafyGreen } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Wedding Decoration",
    description: "Transform your special day into a magical celebration with our elegant wedding decorations.",
  },
  {
    icon: Cake,
    title: "Birthday Celebration",
    description: "Create unforgettable moments with our creative and festive birthday arrangements.",
  },
  {
    icon: Flower,
    title: "Floral Design",
    description: "Exquisite floral arrangements that bring natural beauty to any occasion.",
  },
  {
    icon: Star,
    title: "Special Events",
    description: "Elevate your corporate events and special occasions with our bespoke decoration services.",
  },
];

export const Services = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-accent-cream relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute left-0 top-1/4 hidden md:block"
      >
        <LeafyGreen className="w-16 md:w-20 h-16 md:h-20 text-primary/30 transform -rotate-45" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute right-0 bottom-1/4 hidden md:block"
      >
        <Flower className="w-16 md:w-20 h-16 md:h-20 text-primary/30 transform rotate-45" />
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-dark mb-4">Our Services</h2>
            <p className="text-primary font-sans text-base md:text-lg">Crafting Perfect Moments for Every Occasion</p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-all group"
            >
              <service.icon className="w-10 h-10 md:w-12 md:h-12 text-primary mb-4 md:mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-lg md:text-xl text-primary-dark mb-2 md:mb-3">{service.title}</h3>
              <p className="text-primary/80 font-sans text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};