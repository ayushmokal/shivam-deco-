import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";

const sampleBlogs = [
  {
    title: "The Art of Wedding Photography",
    content: "Capturing the perfect wedding moment requires more than just technical skill. It's about understanding the emotions, the timing, and the unique story of each couple. Our experienced photographers blend traditional techniques with modern creativity to create timeless memories that will last a lifetime.",
    image_url: "https://kzeyhboppdnrkwyuhbbn.supabase.co/storage/v1/object/public/gallery/wedding-photography.jpg"
  },
  {
    title: "Planning Your Dream Wedding",
    content: "Every detail matters when planning your perfect day. From selecting the venue to choosing the right flowers, we guide you through each decision with expertise and care. Our team of wedding planners ensures that your vision becomes reality while keeping the process stress-free and enjoyable.",
    image_url: "https://kzeyhboppdnrkwyuhbbn.supabase.co/storage/v1/object/public/gallery/dream-wedding.jpg"
  },
  {
    title: "Wedding Decor Trends 2024",
    content: "This year's wedding trends embrace both elegance and sustainability. From eco-friendly centerpieces to minimalist table settings, couples are choosing decor that reflects their values while creating stunning visual impact. Discover how to incorporate these trends into your special day.",
    image_url: "https://kzeyhboppdnrkwyuhbbn.supabase.co/storage/v1/object/public/gallery/decor-trends.jpg"
  }
];

export const AdminBlogs = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [editingBlog, setEditingBlog] = useState<any>(null);
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

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        toast({
          title: "Error",
          description: "You must be logged in to edit blog posts",
          variant: "destructive",
        });
        return;
      }

      let imageUrl = editingBlog.image_url;
      if (image) {
        const fileExt = image.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(fileName, image);
        if (uploadError) throw uploadError;
        imageUrl = `${supabase.storage.from("gallery").getPublicUrl(fileName).data.publicUrl}`;
      }

      const { error } = await supabase
        .from("blogs")
        .update({
          title: editingBlog.title,
          content: editingBlog.content,
          image_url: imageUrl,
        })
        .eq("id", editingBlog.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      setEditingBlog(null);
      setImage(null);
      refetch();
    } catch (error) {
      console.error("Error updating blog post:", error);
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
    }
  };

  const addRandomBlog = async () => {
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

      // Add all sample blogs
      for (const blog of sampleBlogs) {
        const { error } = await supabase.from("blogs").insert(blog);
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Sample blog posts added successfully",
      });
      refetch();
    } catch (error) {
      console.error("Error adding sample blogs:", error);
      toast({
        title: "Error",
        description: "Failed to add sample blog posts",
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
        <h3 className="text-xl font-semibold">Blog Management</h3>
        <Button onClick={addRandomBlog} variant="outline">
          Add Sample Blogs
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
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold">{blog.title}</h4>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setEditingBlog(blog)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Blog Post</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleEdit} className="space-y-4">
                    <Input
                      placeholder="Blog Title"
                      value={editingBlog?.title}
                      onChange={(e) =>
                        setEditingBlog({ ...editingBlog, title: e.target.value })
                      }
                      required
                    />
                    <Textarea
                      placeholder="Blog Content"
                      value={editingBlog?.content}
                      onChange={(e) =>
                        setEditingBlog({ ...editingBlog, content: e.target.value })
                      }
                      required
                      className="min-h-[200px]"
                    />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                    {blog.image_url && (
                      <img
                        src={blog.image_url}
                        alt="Current blog image"
                        className="w-full h-32 object-cover rounded"
                      />
                    )}
                    <Button type="submit">Update Blog Post</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {blog.content.substring(0, 100)}...
            </p>
            {blog.image_url && (
              <img
                src={blog.image_url}
                alt={blog.title}
                className="mt-2 w-full h-48 object-cover rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
