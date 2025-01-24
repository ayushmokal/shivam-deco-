import { motion } from "framer-motion";

export const Gallery = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Our Work</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Recent Decorations</h2>
        </div>
        
        {/* First row - right to left */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-xl h-[300px] order-3 md:order-3"
          >
            <img 
              src="https://source.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="Decoration 1"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-xl h-[300px] order-2 md:order-2"
          >
            <img 
              src="https://source.unsplash.com/photo-1518770660439-4636190af475"
              alt="Decoration 2"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-xl h-[300px] order-1 md:order-1"
          >
            <img 
              src="https://source.unsplash.com/photo-1581091226825-a6a2a5aee158"
              alt="Decoration 3"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Second row - left to right */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-xl h-[300px]"
          >
            <img 
              src="https://source.unsplash.com/photo-1485827404703-89b55fcc595e"
              alt="Decoration 4"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-xl h-[300px]"
          >
            <img 
              src="https://source.unsplash.com/photo-1526374965328-7f61d4dc18c5"
              alt="Decoration 5"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-xl h-[300px]"
          >
            <img 
              src="https://source.unsplash.com/photo-1649972904349-6e44c42644a7"
              alt="Decoration 6"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Third row - right to left */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-xl h-[300px] order-3 md:order-3"
          >
            <img 
              src="https://source.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="Decoration 7"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-xl h-[300px] order-2 md:order-2"
          >
            <img 
              src="https://source.unsplash.com/photo-1518770660439-4636190af475"
              alt="Decoration 8"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-xl h-[300px] order-1 md:order-1"
          >
            <img 
              src="https://source.unsplash.com/photo-1581091226825-a6a2a5aee158"
              alt="Decoration 9"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        
        {/* Video section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-xl h-[400px]"
          >
            <video 
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="lovable-uploads/#HaldiCeremony#HaldiCelebration#IndianWedding#HaldiVibes#ShaadiShenanigans #Yellow Vibes#WeddingStyle#BrideGoals #WeddingGlow #Traditionall #WeddingRituals (1).mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-xl h-[400px]"
          >
            <video 
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="lovable-uploads/#wedding #traditionall #weddingrituals #weddingdesigners #indianwedding #weddingdecor #weddingplanner #weddinginspo #flowerwedding.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-xl h-[400px]"
          >
            <video 
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="lovable-uploads/#weddingrituals #indianwedding #weddingdesigners #weddingdesigners #wedding #weddinginspo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
};