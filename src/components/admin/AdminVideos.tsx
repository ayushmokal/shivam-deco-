import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

type VideoType = Database['public']['Tables']['gallery_videos']['Row'];

export const AdminVideos = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: videos = [] } = useQuery<VideoType[]>({
    queryKey: ['gallery-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_videos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const sanitizeFileName = (fileName: string) => {
    // Remove special characters (including # and ?), emojis, and spaces
    return fileName
      .replace(/[^\w\s.-]/g, '')  // Remove all non-word chars except dots and hyphens
      .replace(/\s+/g, '-')       // Replace spaces with hyphens
      .toLowerCase();
  };

  const handleVideoUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const videoFile = (form.querySelector('input[type="file"]') as HTMLInputElement).files?.[0];

    if (!videoFile) {
      toast({
        title: "Error",
        description: "Please select a video file",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      const fileExt = videoFile.name.split('.').pop();
      const sanitizedName = sanitizeFileName(videoFile.name);
      const fileName = `${Date.now()}-${sanitizedName}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('gallery')
        .upload(filePath, videoFile);

      if (uploadError) throw uploadError;

      const { data: videoUrl } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from('gallery_videos')
        .insert({
          url: videoUrl.publicUrl,
          title: title || sanitizedName,
          description,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Video uploaded successfully",
      });

      queryClient.invalidateQueries({ queryKey: ['gallery-videos'] });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_videos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Video deleted successfully",
      });

      queryClient.invalidateQueries({ queryKey: ['gallery-videos'] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('gallery_videos')
        .update({ featured: !currentFeatured })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: currentFeatured ? "Video unfeatured" : "Video set as featured",
      });

      queryClient.invalidateQueries({ queryKey: ['gallery-videos'] });
      queryClient.invalidateQueries({ queryKey: ['featured-video'] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleVideoUpload} className="space-y-4 p-4 border rounded-lg">
        <div>
          <Label htmlFor="video">Video File</Label>
          <Input
            id="video"
            type="file"
            accept="video/*"
            required
            disabled={uploading}
          />
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter video title"
            disabled={uploading}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter video description"
            disabled={uploading}
          />
        </div>
        <Button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Video"}
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="border rounded-lg p-4 space-y-2">
            <video
              src={video.url}
              className="w-full aspect-video rounded-lg"
              controls
            />
            <h3 className="font-medium">{video.title}</h3>
            <p className="text-sm text-gray-500">{video.description}</p>
            <div className="flex gap-2">
              <Button
                variant={video.featured ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFeatured(video.id, video.featured || false)}
              >
                {video.featured ? "Featured" : "Set as Featured"}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(video.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};