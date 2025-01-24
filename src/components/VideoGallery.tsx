import { motion } from "framer-motion";

export const VideoGallery = () => {
  const videos = [
    "/lovable-uploads/#HaldiCeremony#HaldiCelebration#IndianWedding#HaldiVibes#ShaadiShenanigans #Yellow Vibes#WeddingStyle#BrideGoals #WeddingGlow #Traditionall #WeddingRituals (1).mp4",
    "/lovable-uploads/#wedding #traditionall #weddingrituals #weddingdesigners #indianwedding #weddingdecor #weddingplanner #weddinginspo #flowerwedding.mp4",
    "/lovable-uploads/#weddingrituals #indianwedding #weddingdesigners #weddingdesigners #wedding #weddinginspo.mp4"
  ];

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
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <video
                src={video}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-serif mb-8 text-center">Featured Instagram Reels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="aspect-[9/16] w-full"
            >
              <iframe
                src="https://www.instagram.com/reel/DFAOVeBMjBd/embed?autoplay=1"
                className="w-full h-full rounded-lg shadow-lg"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                allow="autoplay"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="aspect-[9/16] w-full"
            >
              <iframe
                src="https://www.instagram.com/reel/DESb_Ugs9aP/embed?autoplay=1"
                className="w-full h-full rounded-lg shadow-lg"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                allow="autoplay"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};