import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminBlogs } from "@/components/admin/AdminBlogs";
import { AdminGallery } from "@/components/admin/AdminGallery";
import { AdminEnquiries } from "@/components/admin/AdminEnquiries";

export const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
      </div>

      <Tabs defaultValue="blogs" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
        </TabsList>
        <TabsContent value="blogs">
          <AdminBlogs />
        </TabsContent>
        <TabsContent value="gallery">
          <AdminGallery />
        </TabsContent>
        <TabsContent value="enquiries">
          <AdminEnquiries />
        </TabsContent>
      </Tabs>
    </div>
  );
};