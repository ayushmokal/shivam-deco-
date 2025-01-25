import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Floating elements */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/20 backdrop-blur-sm"
          style={{
            width: Math.random() * 150 + 100,
            height: Math.random() * 150 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 300 - 150],
            y: [0, Math.random() * 300 - 150],
            scale: [1, Math.random() * 0.7 + 0.5],
            opacity: [0.4, 0.7],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
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
          opacity: 0.25,
        }}
        animate={{
          opacity: [0.25, 0.35],
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
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Color transitions */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay"
        animate={{
          background: [
            "linear-gradient(to right, rgba(255,195,160,0.4) 0%, rgba(255,175,189,0.4) 100%)",
            "linear-gradient(to top, rgba(210,153,194,0.4) 0%, rgba(254,249,215,0.4) 100%)",
            "linear-gradient(to right, rgba(238,156,167,0.4), rgba(255,221,225,0.4))",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};