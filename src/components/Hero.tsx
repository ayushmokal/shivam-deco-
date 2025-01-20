import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1500673922987-e212871fec22')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm bg-primary/20 text-white rounded-full">
            Premier Event Decorators
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Shivam Decorators
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Transforming spaces into magical experiences for weddings, birthdays, and special events
          </p>
          <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full transition-all transform hover:scale-105">
            Explore Our Services
          </button>
        </motion.div>
      </div>
    </div>
  );
};