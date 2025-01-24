import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const placeholderImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=800&auto=format&fit=crop",
    title: "Wedding Decoration",
    description: "Elegant floral arrangement"
  },
  {
    id: "2", 
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop",
    title: "Traditional Setup",
    description: "Beautiful traditional wedding setup"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop",
    title: "Wedding Stage",
    description: "Luxurious stage decoration"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&auto=format&fit=crop",
    title: "Reception Area",
    description: "Elegant reception decoration"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop",
    title: "Table Setting",
    description: "Sophisticated dining arrangement"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop",
    title: "Outdoor Setup",
    description: "Beautiful garden decoration"
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800&auto=format&fit=crop",
    title: "Wedding Entrance",
    description: "Grand entrance decoration"
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop",
    title: "Floral Design",
    description: "Stunning floral arrangements"
  }
];

export const Gallery = () => {
  const { data: uploadedImages } = useQuery({
    queryKey: ["gallery_images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const images = uploadedImages?.length ? uploadedImages : placeholderImages;

  return (
    <div className="py-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif mb-4">Our Gallery</h2>
          <p className="text-muted-foreground">Browse through our beautiful collection</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {images?.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={image.url}
                alt={image.title || "Gallery image"}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {image.title && (
                <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-semibold">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-gray-200">{image.description}</p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};