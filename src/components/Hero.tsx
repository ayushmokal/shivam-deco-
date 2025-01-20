import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-accent-beige">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <img
            src="/lovable-uploads/f157ecac-d5e9-4323-b345-bea9fbac20ff.png"
            alt="Elegant Floral Decoration"
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left z-10 md:w-1/2"
        >
          <h1 className="font-serif text-6xl md:text-7xl text-primary-dark mb-4">
            Shivam
            <br />
            Decorators
          </h1>
          <div className="w-24 h-0.5 bg-primary mx-auto md:mx-0 mb-6"></div>
          <p className="font-serif text-xl md:text-2xl text-primary mb-8 italic">
            "Creating magical moments through elegant decorations"
          </p>
          <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 transition-colors font-sans text-sm tracking-wider uppercase">
            Explore Our Work
          </button>
        </motion.div>
      </div>
    </div>
  );
};