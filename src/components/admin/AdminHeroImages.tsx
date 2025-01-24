import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export const AdminHeroImages = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const { data: heroImages, refetch } = useQuery({
    queryKey: ["hero_images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_images")
        .select("*")
        .order("position");
      if (error) throw error;
      return data;
    },
  });

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    position: string
  ) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      // Upload image to storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      const imageUrl = `${
        supabase.storage.from("gallery").getPublicUrl(fileName).data.publicUrl
      }`;

      // Update or insert the hero image
      const existingImage = heroImages?.find((img) => img.position === position);
      if (existingImage) {
        const { error } = await supabase
          .from("hero_images")
          .update({ url: imageUrl, updated_at: new Date().toISOString() })
          .eq("position", position);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("hero_images").insert({
          position,
          url: imageUrl,
        });
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Hero image updated successfully",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update hero image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Image */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Main Image</h3>
          <div className="aspect-[3/4] mb-4 bg-gray-100 rounded-lg overflow-hidden">
            {heroImages?.find((img) => img.position === "main")?.url && (
              <img
                src={heroImages.find((img) => img.position === "main")?.url}
                alt="Main hero"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "main")}
            disabled={uploading}
          />
        </div>

        {/* Left Image */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Left Image</h3>
          <div className="aspect-[3/4] mb-4 bg-gray-100 rounded-lg overflow-hidden">
            {heroImages?.find((img) => img.position === "left")?.url && (
              <img
                src={heroImages.find((img) => img.position === "left")?.url}
                alt="Left hero"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "left")}
            disabled={uploading}
          />
        </div>

        {/* Right Image */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Right Image</h3>
          <div className="aspect-[3/4] mb-4 bg-gray-100 rounded-lg overflow-hidden">
            {heroImages?.find((img) => img.position === "right")?.url && (
              <img
                src={heroImages.find((img) => img.position === "right")?.url}
                alt="Right hero"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "right")}
            disabled={uploading}
          />
        </div>
      </div>
    </div>
  );
};