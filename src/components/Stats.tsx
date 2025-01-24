import { motion } from "framer-motion";
import { Flower, LeafyGreen, Sprout } from "lucide-react";

export const Stats = () => {
  const stats = [
    { number: "400+", text: "Weddings Planned" },
    { number: "800+", text: "Happy Couples" },
    { number: "360+", text: "Coordinations" },
    { number: "16+", text: "Years of Service" },
  ];

  return (
    <section className="py-20 bg-accent-cream relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.2, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute left-10 top-20"
      >
        <Sprout className="w-16 h-16 text-primary/30 transform -rotate-45" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 0.2, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute right-10 bottom-20"
      >
        <LeafyGreen className="w-16 h-16 text-primary/30 transform rotate-45" />
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800">
            Why We Are The Best
          </h2>
          <h3 className="text-3xl md:text-4xl font-serif text-gray-800 mt-2">
            For Weddings
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-48 h-48 mb-4">
                {/* Decorative circle border */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'50%25\' cy=\'50%25\' r=\'49%25\' stroke=\'%23D4C4B5\' stroke-width=\'1\' fill=\'none\' /%3E%3C/svg%3E')] opacity-50"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl md:text-5xl font-serif text-primary mb-2">
                    {stat.number}
                  </span>
                  <span className="text-sm md:text-base text-primary-light">
                    {stat.text}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
