import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Hero = () => {
  const { data: heroImages } = useQuery({
    queryKey: ['hero-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_images')
        .select('*')
        .order('position');
      
      if (error) throw error;
      return data;
    }
  });

  const mainImage = heroImages?.find(img => img.position === 'main')?.url;
  const leftImage = heroImages?.find(img => img.position === 'left')?.url;
  const rightImage = heroImages?.find(img => img.position === 'right')?.url;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-accent-cream">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 1,
            type: "spring",
            bounce: 0.4
          }}
          className="text-left z-10 md:w-1/2"
        >
          <motion.h1 
            className="font-serif text-6xl md:text-7xl text-primary-dark mb-4 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We create
            <br />
            <span className="text-primary">Beautiful</span>
            <br />
            moments for
            <br />
            you
          </motion.h1>
          
          <motion.p 
            className="font-sans text-lg md:text-xl text-primary/70 mb-8 font-light max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Floral Designer, Wedding Planner, and Event Enthusiast who creates memorable moments for special occasions.
          </motion.p>
          
          <motion.button 
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md transition-all font-sans text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Get in touch
          </motion.button>
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
          className="relative md:w-1/2 h-[600px]"
        >
          {/* Main large image */}
          {mainImage && (
            <motion.img
              src={mainImage}
              alt="Floral Designer with Bouquet"
              className="absolute right-0 top-0 w-[90%] h-auto rounded-lg shadow-xl z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          )}
          
          {/* Left overlapping smaller image */}
          {leftImage && (
            <motion.img
              src={leftImage}
              alt="Floral Decoration"
              className="absolute left-0 top-[30%] w-[35%] h-auto rounded-lg shadow-xl z-20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          )}
          
          {/* Right overlapping medium image */}
          {rightImage && (
            <motion.img
              src={rightImage}
              alt="Wedding Venue Setup"
              className="absolute right-0 bottom-[10%] w-[45%] h-auto rounded-lg shadow-xl z-30"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          )}
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent-cream/50 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
    </div>
  );
};