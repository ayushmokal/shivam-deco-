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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOAD_TIMEOUT = 30000; // 30 seconds

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
  const [isUploading, setIsUploading] = useState(false);
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

  const uploadImage = async (file: File): Promise<string | null> => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size must be less than 5MB");
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT);

    try {
      const { error: uploadError, data } = await supabase.storage
        .from("gallery")
        .upload(fileName, file, {
          abortSignal: controller.signal,
        });

      if (uploadError) throw uploadError;

      return supabase.storage.from("gallery").getPublicUrl(fileName).data.publicUrl;
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

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
        try {
          imageUrl = await uploadImage(image);
        } catch (error) {
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to upload image",
            variant: "destructive",
          });
          return;
        }
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
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

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
        try {
          imageUrl = await uploadImage(image);
        } catch (error) {
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to upload image",
            variant: "destructive",
          });
          return;
        }
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
    } finally {
      setIsUploading(false);
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
        <Button onClick={addRandomBlog} variant="outline" disabled={isUploading}>
          Add Sample Blogs
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isUploading}
        />
        <Textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="min-h-[200px]"
          disabled={isUploading}
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && file.size > MAX_FILE_SIZE) {
              toast({
                title: "Error",
                description: "File size must be less than 5MB",
                variant: "destructive",
              });
              e.target.value = '';
              return;
            }
            setImage(file || null);
          }}
          disabled={isUploading}
        />
        <Button type="submit" disabled={isUploading}>
          {isUploading ? "Creating..." : "Create Blog Post"}
        </Button>
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
                    disabled={isUploading}
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
                      disabled={isUploading}
                    />
                    <Textarea
                      placeholder="Blog Content"
                      value={editingBlog?.content}
                      onChange={(e) =>
                        setEditingBlog({ ...editingBlog, content: e.target.value })
                      }
                      required
                      className="min-h-[200px]"
                      disabled={isUploading}
                    />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && file.size > MAX_FILE_SIZE) {
                          toast({
                            title: "Error",
                            description: "File size must be less than 5MB",
                            variant: "destructive",
                          });
                          e.target.value = '';
                          return;
                        }
                        setImage(file || null);
                      }}
                      disabled={isUploading}
                    />
                    {blog.image_url && (
                      <img
                        src={blog.image_url}
                        alt="Current blog image"
                        className="w-full h-32 object-cover rounded"
                      />
                    )}
                    <Button type="submit" disabled={isUploading}>
                      {isUploading ? "Updating..." : "Update Blog Post"}
                    </Button>
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
