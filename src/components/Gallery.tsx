import { motion } from "framer-motion";

export const Gallery = () => {
  return (
    <div className="py-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif mb-4">Recent Decorations</h2>
          <p className="text-muted-foreground">Explore our beautiful decorations</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full"
            style={{ paddingBottom: "56.25%" }} // 16:9 aspect ratio
          >
            <video 
              src="/lovable-uploads/%23HaldiCeremony%23HaldiCelebration%23IndianWedding%23HaldiVibes%23ShaadiShenanigans%20%23Yellow%20Vibes%23WeddingStyle%23BrideGoals%20%23WeddingGlow%20%23Traditionall%20%23WeddingRituals%20(1).mp4"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
              playsInline
              controls
              muted
              loop
              autoPlay
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative w-full"
            style={{ paddingBottom: "56.25%" }} // 16:9 aspect ratio
          >
            <video 
              src="/lovable-uploads/%23wedding%20%23traditionall%20%23weddingrituals%20%23weddingdesigners%20%23indianwedding%20%23weddingdecor%20%23weddingplanner%20%23weddinginspo%20%23flowerwedding.mp4"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
              playsInline
              controls
              muted
              loop
              autoPlay
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative w-full"
            style={{ paddingBottom: "56.25%" }} // 16:9 aspect ratio
          >
            <video 
              src="/lovable-uploads/%23weddingrituals%20%23indianwedding%20%23weddingdesigners%20%23weddingdesigners%20%23wedding%20%23weddinginspo.mp4"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
              playsInline
              controls
              muted
              loop
              autoPlay
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};