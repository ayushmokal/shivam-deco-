import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";
import { Flower, LeafyGreen } from "lucide-react";

type VideoType = Database['public']['Tables']['gallery_videos']['Row'];

export const VideoGallery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        // Only redirect if we're on an admin page
        if (window.location.pathname.startsWith('/admin')) {
          navigate('/admin');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: videos = [], error } = useQuery<VideoType[]>({
    queryKey: ['gallery-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_videos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        if (error.message.includes('refresh_token_not_found')) {
          // Only redirect if we're on an admin page
          if (window.location.pathname.startsWith('/admin')) {
            navigate('/admin');
          }
        }
        throw error;
      }
      return data || [];
    },
    meta: {
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  });

  if (error) {
    return null;
  }

  return (
    <div className="py-16 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, rotate: -45 }}
        whileInView={{ opacity: 0.2, rotate: 0 }}
        transition={{ duration: 1 }}
        className="absolute left-10 top-1/4"
      >
        <LeafyGreen className="w-20 h-20 text-primary/30" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: 45 }}
        whileInView={{ opacity: 0.2, rotate: 0 }}
        transition={{ duration: 1 }}
        className="absolute right-10 bottom-1/4"
      >
        <Flower className="w-20 h-20 text-primary/30" />
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif mb-4">Recent Decorations</h2>
          <p className="text-muted-foreground">Explore our beautiful decorations</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="relative w-full"
              style={{ paddingBottom: "177.78%" }}
            >
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden" style={{ borderRadius: '3rem 3rem 3rem 3rem' }}>
                {video.url && (
                  <video
                    src={video.url}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};