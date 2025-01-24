import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Hero = () => {
  const { data: featuredVideo } = useQuery({
    queryKey: ['featured-video'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_videos')
        .select('*')
        .eq('featured', true)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    }
  });

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
            Hi There
            <br />
            This is
            <br />
            <span className="text-primary">— Sanches</span>
            <br />
            Liza
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
            className="bg-[#8B2635] hover:bg-[#7A1F2D] text-white px-8 py-3 rounded-md transition-all font-sans text-base"
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
          className="md:w-1/2"
        >
          <img
            src="/lovable-uploads/692e7d6c-6ac2-4db7-b3ca-6b1bb1671e75.png"
            alt="Floral Designer with Bouquet"
            className="w-full h-auto rounded-lg shadow-xl"
          />
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