import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contact as ContactForm } from "@/components/Contact";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-accent-cream">
      <Header />
      <main className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-primary-dark mb-4">Get in Touch</h1>
            <p className="text-primary/80 text-lg">We'd love to hear from you</p>
          </motion.div>
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;