import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-accent-beige">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent-beige/30" />
      </div>
      
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left z-10 md:w-1/2"
        >
          <h1 className="font-serif text-5xl md:text-7xl text-primary-dark mb-6">
            Shivam<br />
            Decorators
          </h1>
          <p className="font-serif text-xl md:text-2xl text-primary italic mb-8">
            "Creating magical moments through elegant decorations"
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-none hover:bg-primary-dark transition-colors font-sans text-sm tracking-wider uppercase">
            Explore Our Work
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 mt-12 md:mt-0"
        >
          <img
            src="/lovable-uploads/01f8f2d0-0c32-4997-a2b6-6507f05e6e3a.png"
            alt="Elegant Decoration"
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};