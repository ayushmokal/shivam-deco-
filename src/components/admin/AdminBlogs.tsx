import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
          </div>
        ))}
      </div>
    </div>
  );
};