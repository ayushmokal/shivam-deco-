import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Floating elements */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10 backdrop-blur-sm"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [1, Math.random() * 0.5 + 0.5],
            opacity: [0.3, 0.6],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient overlays */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)",
          opacity: 0.1,
        }}
        animate={{
          opacity: [0.1, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Shimmering effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Color transitions */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay"
        animate={{
          background: [
            "linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)",
            "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)",
            "linear-gradient(to right, #ee9ca7, #ffdde1)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};