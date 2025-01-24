import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState<{
    title: string;
    content: string;
    created_at: string;
    image_url: string | null;
  } | null>(null);

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-serif text-center mb-12">Our Blog</h1>
          
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs?.map((blog) => (
                <motion.article
                  key={blog.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedBlog(blog)}
                >
                  {blog.image_url && (
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-serif mb-2">{blog.title}</h2>
                    <p className="text-gray-600 line-clamp-3">{blog.content}</p>
                    <div className="mt-4 text-sm text-gray-500">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>

        <Dialog open={!!selectedBlog} onOpenChange={() => setSelectedBlog(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">{selectedBlog?.title}</DialogTitle>
            </DialogHeader>
            {selectedBlog?.image_url && (
              <img
                src={selectedBlog.image_url}
                alt={selectedBlog.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}
            <div className="space-y-4">
              <p className="text-gray-600 whitespace-pre-wrap">{selectedBlog?.content}</p>
              <p className="text-sm text-gray-500">
                Published on {selectedBlog && new Date(selectedBlog.created_at).toLocaleDateString()}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </>
  );
};

export default Blog;