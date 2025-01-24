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
          className="md:w-1/2 grid grid-cols-1 gap-6"
        >
          <motion.div
            className="relative rounded-lg overflow-hidden shadow-xl"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.4 }
            }}
          >
            <video 
              className="w-full h-auto"
              controls
              muted
              loop
            >
              <source src="/lovable-uploads/#HaldiCeremony#HaldiCelebration#IndianWedding#HaldiVibes#ShaadiShenanigans #Yellow Vibes#WeddingStyle#BrideGoals #WeddingGlow #Traditionall #WeddingRituals (1).mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
          <motion.div
            className="relative rounded-lg overflow-hidden shadow-xl"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.4 }
            }}
          >
            <video 
              className="w-full h-auto"
              controls
              muted
              loop
            >
              <source src="/lovable-uploads/#wedding #traditionall #weddingrituals #weddingdesigners #indianwedding #weddingdecor #weddingplanner #weddinginspo #flowerwedding.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
          <motion.div
            className="relative rounded-lg overflow-hidden shadow-xl"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.4 }
            }}
          >
            <video 
              className="w-full h-auto"
              controls
              muted
              loop
            >
              <source src="/lovable-uploads/#weddingrituals #indianwedding #weddingdesigners #weddingdesigners #wedding #weddinginspo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
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
            className="font-serif text-5xl md:text-6xl text-primary-dark mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Shivam
            <br />
            <span className="text-primary-light">Decorators</span>
          </motion.h1>
          <motion.div 
            className="w-16 h-[1px] bg-primary mx-auto md:mx-0 mb-8"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.div>
          <motion.p 
            className="font-sans text-lg md:text-xl text-primary/80 mb-10 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Creating magical moments through elegant decorations
          </motion.p>
          <motion.button 
            className="bg-primary/90 hover:bg-primary text-white px-8 py-3 transition-all font-sans text-sm tracking-widest uppercase"
            whileHover={{ 
              scale: 1.05,
              letterSpacing: "0.2em"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Explore Our Work
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent-beige/50 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
    </div>
  );
};