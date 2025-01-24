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
        .single();
      
      if (error) throw error;
      return data;
    }
  });

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
          {featuredVideo ? (
            <motion.video
              src={featuredVideo.url}
              className="w-full h-auto rounded-lg shadow-xl"
              autoPlay
              muted
              loop
              playsInline
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.4 }
              }}
            />
          ) : (
            <motion.img
              src="/lovable-uploads/f157ecac-d5e9-4323-b345-bea9fbac20ff.png"
              alt="Elegant Floral Decoration"
              className="w-full h-auto rounded-lg shadow-xl"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.4 }
              }}
            />
          )}
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