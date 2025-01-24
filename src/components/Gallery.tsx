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

  // Group images by row
  const groupImagesByRow = (images: any[]) => {
    const rows: { [key: number]: any[] } = {};
    images.forEach((image) => {
      const rowNumber = image.row_number || 1;
      if (!rows[rowNumber]) {
        rows[rowNumber] = [];
      }
      rows[rowNumber].push(image);
    });
    return rows;
  };

  const groupedImages = groupImagesByRow(images);

  return (
    <div className="py-16 bg-background overflow-hidden">
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

        <div className="space-y-8">
          {[1, 2, 3, 4, 5].map((rowNumber) => (
            <div key={rowNumber} className="relative flex overflow-hidden">
              <motion.div
                className="flex gap-4 animate-none"
                animate={{
                  x: rowNumber % 2 === 0 ? [-50 * (groupedImages[rowNumber]?.length || 8), 0] : [0, -50 * (groupedImages[rowNumber]?.length || 8)],
                }}
                transition={{
                  duration: 50,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ width: `${(groupedImages[rowNumber]?.length || 8) * 320}px` }}
              >
                {(groupedImages[rowNumber] || []).map((image: any, index: number) => (
                  <div
                    key={`${image.id}-${index}`}
                    className="w-[300px] h-[300px] flex-shrink-0 relative group"
                  >
                    <img
                      src={image.url}
                      alt={image.title || "Gallery image"}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end rounded-lg">
                      <div className="p-4 text-white">
                        <h3 className="text-lg font-semibold">{image.title}</h3>
                        {image.description && (
                          <p className="text-sm text-gray-200">{image.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
