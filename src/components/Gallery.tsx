import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Gallery = () => {
  const { data: images } = useQuery({
    queryKey: ["gallery_images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="py-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif mb-4">Recent Decorations</h2>
          <p className="text-muted-foreground">Explore our beautiful decorations</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {images?.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }} // 16:9 aspect ratio
            >
              <img
                src={image.url}
                alt={image.title || "Gallery image"}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};