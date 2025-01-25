import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Login } from "./Login";
import AdminBlogs from "../components/admin/AdminBlogs";
import AdminEnquiries from "../components/admin/AdminEnquiries";
import AdminGallery from "../components/admin/AdminGallery";
import AdminHeroImages from "../components/admin/AdminHeroImages";
import AdminVideos from "../components/admin/AdminVideos";

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
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif">Admin Dashboard</h1>
        <button
          onClick={() => {
            supabase.auth.signOut();
            navigate("/");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
      <div className="space-y-8">
        <AdminHeroImages />
        <AdminGallery />
        <AdminVideos />
        <AdminBlogs />
        <AdminEnquiries />
      </div>
    </div>
  );
};