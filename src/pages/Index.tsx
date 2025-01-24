import { motion } from "framer-motion";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Gallery } from "../components/Gallery";
import { Contact } from "../components/Contact";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RecentDecorations } from "../components/RecentDecorations";

const Index = () => {
  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Services />
        <RecentDecorations />
        <Gallery />
        <Contact />
      </motion.div>
      <Footer />
    </>
  );
};

export default Index;