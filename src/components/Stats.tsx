import { motion } from "framer-motion";
import { Award, Calendar, Heart, Users } from "lucide-react";

export const Stats = () => {
  const stats = [
    { 
      number: "400+", 
      text: "Weddings Planned",
      icon: Calendar,
      color: "text-rose-400"
    },
    { 
      number: "800+", 
      text: "Happy Couples",
      icon: Heart,
      color: "text-pink-400"
    },
    { 
      number: "360+", 
      text: "Coordinations",
      icon: Award,
      color: "text-violet-400"
    },
    { 
      number: "16+", 
      text: "Years of Service",
      icon: Users,
      color: "text-indigo-400"
    },
  ];

  const iconAnimation = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5, type: "spring" }
  };

  return (
    <section className="py-12 md:py-20 bg-accent-cream relative overflow-hidden">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800">
            Why We Are The Best
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 mt-2">
            For Weddings
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-36 h-36 md:w-48 md:h-48 mb-4">
                {/* Decorative circle border */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'50%25\' cy=\'50%25\' r=\'49%25\' stroke=\'%23D4C4B5\' stroke-width=\'1\' fill=\'none\' /%3E%3C/svg%3E')] opacity-50"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    {...iconAnimation}
                    whileHover={{ scale: 1.1 }}
                    className={`mb-3 ${stat.color}`}
                  >
                    {stat.icon && <stat.icon size={32} />}
                  </motion.div>
                  <span className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary mb-2">
                    {stat.number}
                  </span>
                  <span className="text-xs md:text-sm lg:text-base text-primary-light text-center px-2">
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