import { motion } from "framer-motion";

type MediaItem = {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
};

const mediaItems: MediaItem[] = [
  {
    type: 'video',
    url: 'https://www.instagram.com/p/DFAOVeBMjBd/embed',
    thumbnail: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  },
  {
    type: 'video',
    url: 'https://www.instagram.com/p/DESb_Ugs9aP/embed',
    thumbnail: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
  },
  {
    type: 'video',
    url: 'https://www.instagram.com/p/DD2FCAnPhFg/embed',
    thumbnail: "https://images.unsplash.com/photo-1460574283810-2aab119d8511"
  }
];

export const Gallery = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Our Work</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Recent Decorations</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mediaItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden rounded-xl group"
            >
              <iframe
                src={item.url}
                className="w-full h-full border-none"
                allowFullScreen
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};