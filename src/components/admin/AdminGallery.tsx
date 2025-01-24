import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Pencil, Trash2, X, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const AdminGallery = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [selectedRow, setSelectedRow] = useState<number>(1);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: images, refetch } = useQuery({
    queryKey: ["gallery_images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast({
        title: "Error",
        description: "Please select an image",
        variant: "destructive",
      });
      return;
    }

    try {
      const fileExt = image.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, image);
      if (uploadError) throw uploadError;

      const imageUrl = `${supabase.storage.from("gallery").getPublicUrl(fileName).data.publicUrl}`;

      const { error } = await supabase.from("gallery_images").insert({
        url: imageUrl,
        title,
        description,
        row_number: selectedRow,
      });
      if (error) throw error;

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
      setTitle("");
      setDescription("");
      setImage(null);
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const { error } = await supabase
        .from("gallery_images")
        .update({
          title: editTitle,
          description: editDescription,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image updated successfully",
      });
      setEditingImage(null);
      queryClient.invalidateQueries({ queryKey: ["gallery_images"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update image",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string, url: string) => {
    try {
      // Delete from storage
      const fileName = url.split("/").pop();
      if (fileName) {
        const { error: storageError } = await supabase.storage
          .from("gallery")
          .remove([fileName]);
        if (storageError) throw storageError;
      }

      // Delete from database
      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", id);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["gallery_images"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  const startEdit = (image: any) => {
    setEditingImage(image.id);
    setEditTitle(image.title || "");
    setEditDescription(image.description || "");
  };

  const cancelEdit = () => {
    setEditingImage(null);
    setEditTitle("");
    setEditDescription("");
  };

  const groupImagesByRow = (images: any[]) => {
    const rows: { [key: number]: any[] } = {};
    images?.forEach((image) => {
      const rowNumber = image.row_number || 1;
      if (!rows[rowNumber]) {
        rows[rowNumber] = [];
      }
      rows[rowNumber].push(image);
    });
    return rows;
  };

  const groupedImages = images ? groupImagesByRow(images) : {};

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-background rounded-lg border">
        <CardHeader>
          <CardTitle>Upload New Image</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              required
            />
            <select
              className="border rounded-md p-2"
              value={selectedRow}
              onChange={(e) => setSelectedRow(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((row) => (
                <option key={row} value={row}>
                  Row {row}
                </option>
              ))}
            </select>
          </div>
          <Input
            placeholder="Image Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-4"
          />
          <Textarea
            placeholder="Image Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-4"
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">Upload Image</Button>
        </CardFooter>
      </form>

      {[1, 2, 3, 4, 5].map((rowNumber) => (
        <Card key={rowNumber} className="overflow-hidden">
          <CardHeader>
            <CardTitle>Row {rowNumber}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedImages[rowNumber]?.map((image: any) => (
                <Card key={image.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <img 
                      src={image.url} 
                      alt={image.title || ""} 
                      className="w-full h-48 object-cover"
                    />
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2 p-4">
                    {editingImage === image.id ? (
                      <div className="space-y-2 w-full">
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          placeholder="Title"
                        />
                        <Textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="Description"
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleEdit(image.id)}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full">
                        <h4 className="font-semibold">{image.title}</h4>
                        <p className="text-sm text-gray-600">{image.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" onClick={() => startEdit(image)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(image.id, image.url)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
          <Separator className="my-4" />
        </Card>
      ))}
    </div>
  );
};