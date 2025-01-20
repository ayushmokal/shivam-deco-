import { motion } from "framer-motion";

export const Gallery = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Our Work</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Recent Decorations</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square overflow-hidden rounded-xl"
          >
            <iframe
              className="w-full h-full"
              src="https://www.instagram.com/p/DFAOVeBMjBd/embed"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative aspect-square overflow-hidden rounded-xl"
          >
            <iframe
              className="w-full h-full"
              src="https://www.instagram.com/p/DESb_Ugs9aP/embed"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-square overflow-hidden rounded-xl"
          >
            <iframe
              className="w-full h-full"
              src="https://www.instagram.com/p/DD2FCAnPhFg/embed"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};