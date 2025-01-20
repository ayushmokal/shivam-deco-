import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-serif text-center mb-8">Admin Login</h1>
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: {
            button: { fontFamily: 'Playfair Display, serif' },
            anchor: { display: 'none' }, // Hides the "Forgot password" and "Sign up" links
            input: { fontFamily: 'Montserrat, sans-serif' },
            label: { fontFamily: 'Montserrat, sans-serif' }
          },
        }}
        providers={[]}
        theme="light"
        showLinks={false} // Disables all auth links
      />
    </div>
  );
};