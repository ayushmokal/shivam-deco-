import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Login } from "./Login";
import { AdminBlogs } from "../components/admin/AdminBlogs";
import { AdminEnquiries } from "../components/admin/AdminEnquiries";
import { AdminGallery } from "../components/admin/AdminGallery";
import { AdminHeroImages } from "../components/admin/AdminHeroImages";
import { AdminVideos } from "../components/admin/AdminVideos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Images, Video, FileText, MessageSquare, Layout } from "lucide-react";

export const Admin = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif">Admin Dashboard</h1>
          <Button
            variant="destructive"
            onClick={() => {
              supabase.auth.signOut();
              navigate("/");
            }}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-transparent h-auto p-0">
            <TabsTrigger 
              value="hero" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-2 py-3"
            >
              <Layout className="h-4 w-4" />
              Hero Images
            </TabsTrigger>
            <TabsTrigger 
              value="gallery" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-2 py-3"
            >
              <Images className="h-4 w-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger 
              value="videos" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-2 py-3"
            >
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger 
              value="blogs" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-2 py-3"
            >
              <FileText className="h-4 w-4" />
              Blogs
            </TabsTrigger>
            <TabsTrigger 
              value="enquiries" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-2 py-3"
            >
              <MessageSquare className="h-4 w-4" />
              Enquiries
            </TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <TabsContent value="hero" className="mt-0">
              <AdminHeroImages />
            </TabsContent>
            <TabsContent value="gallery" className="mt-0">
              <AdminGallery />
            </TabsContent>
            <TabsContent value="videos" className="mt-0">
              <AdminVideos />
            </TabsContent>
            <TabsContent value="blogs" className="mt-0">
              <AdminBlogs />
            </TabsContent>
            <TabsContent value="enquiries" className="mt-0">
              <AdminEnquiries />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};