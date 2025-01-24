import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const sampleBlogs = [
  {
    title: "The Art of Wedding Decoration",
    content: "Transform your special day into a magical experience with our expert wedding decoration tips. From elegant centerpieces to stunning backdrops, discover how to create the perfect ambiance for your celebration.",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop"
  },
  {
    title: "Latest Wedding Decor Trends 2024",
    content: "Stay ahead of the curve with our curated list of the hottest wedding decoration trends. From sustainable decor to personalized touches, we explore what's making waves in the world of wedding design.",
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop"
  },
  {
    title: "Planning Your Dream Wedding",
    content: "Your wedding day should reflect your unique style and love story. Discover our comprehensive guide to planning the perfect wedding, from choosing the right theme to coordinating with vendors.",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop"
  }
];

export const AdminBlogs = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { toast } = useToast();

  const { data: blogs, refetch, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        toast({
          title: "Error",
          description: "You must be logged in to create blog posts",
          variant: "destructive",
        });
        return;
      }

      let imageUrl = null;
      if (image) {
        const fileExt = image.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(fileName, image);
        if (uploadError) throw uploadError;
        imageUrl = `${supabase.storage.from("gallery").getPublicUrl(fileName).data.publicUrl}`;
      }

      const { error } = await supabase.from("blogs").insert({
        title,
        content,
        image_url: imageUrl,
      });
      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      setTitle("");
      setContent("");
      setImage(null);
      refetch();
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
    }
  };

  const addRandomBlog = async () => {
    try {
      const randomBlog = sampleBlogs[Math.floor(Math.random() * sampleBlogs.length)];
      
      const { error } = await supabase.from("blogs").insert({
        title: randomBlog.title,
        content: randomBlog.content,
        image_url: randomBlog.imageUrl,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Random blog post added successfully",
      });
      refetch();
    } catch (error) {
      console.error("Error adding random blog:", error);
      toast({
        title: "Error",
        description: "Failed to add random blog post",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading blogs...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading blogs: {error instanceof Error ? error.message : "Unknown error"}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Blog Posts</h2>
        <Button onClick={addRandomBlog} variant="outline">
          Add Random Blog
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="min-h-[200px]"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <Button type="submit">Create Blog Post</Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Recent Blog Posts</h3>
        {blogs?.map((blog) => (
          <div key={blog.id} className="border p-4 rounded-lg">
            <h4 className="font-semibold">{blog.title}</h4>
            <p className="text-sm text-gray-600 mt-2">{blog.content.substring(0, 100)}...</p>
            {blog.image_url && (
              <img 
                src={blog.image_url} 
                alt={blog.title}
                className="mt-2 w-full h-40 object-cover rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};