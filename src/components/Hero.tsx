import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-accent-beige">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 1,
            type: "spring",
            bounce: 0.4
          }}
          className="md:w-1/2"
        >
          <motion.img
            src="/lovable-uploads/f157ecac-d5e9-4323-b345-bea9fbac20ff.png"
            alt="Elegant Floral Decoration"
            className="w-full h-auto rounded-lg shadow-xl"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 1,
            type: "spring",
            bounce: 0.4,
            delay: 0.2 
          }}
          className="text-center md:text-left z-10 md:w-1/2"
        >
          <motion.h1 
            className="font-serif text-6xl md:text-7xl text-primary-dark mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Shivam
            <br />
            Decorators
          </motion.h1>
          <motion.div 
            className="w-24 h-0.5 bg-primary mx-auto md:mx-0 mb-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.div>
          <motion.p 
            className="font-serif text-xl md:text-2xl text-primary mb-8 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            "Creating magical moments through elegant decorations"
          </motion.p>
          <motion.button 
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 transition-colors font-sans text-sm tracking-wider uppercase"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Explore Our Work
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};