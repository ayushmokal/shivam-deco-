import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("enquiries").insert({
        name,
        email,
        message,
      });
      if (error) throw error;

      toast({
        title: "Success",
        description: "Your message has been sent successfully!",
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Get in Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Contact Us</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-600">+1 234 567 890</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">contact@shivamdecorators.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-gray-600">123 Decoration Street, City</p>
              </div>
            </div>
          </motion.div>
          
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
            />
            <button className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};