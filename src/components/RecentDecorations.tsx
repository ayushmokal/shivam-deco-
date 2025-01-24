import { motion } from "framer-motion";

export const RecentDecorations = () => {
  const videos = [
    "/lovable-uploads/#HaldiCeremony#HaldiCelebration#IndianWedding#HaldiVibes#ShaadiShenanigans #Yellow Vibes#WeddingStyle#BrideGoals #WeddingGlow #Traditionall #WeddingRituals (1).mp4",
    "/lovable-uploads/#wedding #traditionall #weddingrituals #weddingdesigners #indianwedding #weddingdecor #weddingplanner #weddinginspo #flowerwedding.mp4",
    "/lovable-uploads/#weddingrituals #indianwedding #weddingdesigners #weddingdesigners #wedding #weddinginspo.mp4"
  ];

  return (
    <section className="py-16 bg-accent-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-primary uppercase tracking-wider text-sm mb-2">OUR WORK</h2>
          <h3 className="text-4xl font-serif text-primary-dark">Recent Decorations</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative aspect-video rounded-lg overflow-hidden shadow-lg"
            >
              <video
                className="w-full h-full object-cover"
                controls
                muted
                loop
                preload="metadata"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};