import { motion } from "framer-motion";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { VideoGallery } from "../components/VideoGallery";
import { Contact } from "../components/Contact";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Stats } from "../components/Stats";
import { FAQ } from "../components/FAQ";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      // Only redirect to admin if we're already logged in and explicitly navigating to /admin
      if (session && window.location.pathname === "/admin") {
        navigate("/admin");
      }
    };
    
    checkAuth();
  }, [navigate]);

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
        <VideoGallery />
        <Stats />
        <FAQ />
        <Contact />
      </motion.div>
      <Footer />
    </>
  );
};

export default Index;