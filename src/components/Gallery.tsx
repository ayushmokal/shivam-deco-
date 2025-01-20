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
            <video 
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="https://scontent.cdninstagram.com/v/t50.2886-16/408675673_1398011457476018_7776818062537411837_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=Hs7_4Oc5CZYAX8Vy4Hs&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBPLPWXYZQ_4Q_8Hs7_4Oc5CZYAX8Vy4Hs&oe=65E9F8A0&_nc_sid=10d13b" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative aspect-square overflow-hidden rounded-xl"
          >
            <video 
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="https://scontent.cdninstagram.com/v/t50.2886-16/408675673_1398011457476018_7776818062537411837_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=Hs7_4Oc5CZYAX8Vy4Hs&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBPLPWXYZQ_4Q_8Hs7_4Oc5CZYAX8Vy4Hs&oe=65E9F8A0&_nc_sid=10d13b" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-square overflow-hidden rounded-xl"
          >
            <video 
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="https://scontent.cdninstagram.com/v/t50.2886-16/408675673_1398011457476018_7776818062537411837_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=Hs7_4Oc5CZYAX8Vy4Hs&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBPLPWXYZQ_4Q_8Hs7_4Oc5CZYAX8Vy4Hs&oe=65E9F8A0&_nc_sid=10d13b" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
};