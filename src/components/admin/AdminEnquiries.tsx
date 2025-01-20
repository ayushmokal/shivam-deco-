import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const AdminEnquiries = () => {
  const { toast } = useToast();

  const { data: enquiries, refetch } = useQuery({
    queryKey: ["enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("enquiries")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
      toast({
        title: "Success",
        description: "Enquiry status updated",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enquiries?.map((enquiry) => (
            <TableRow key={enquiry.id}>
              <TableCell>{enquiry.name}</TableCell>
              <TableCell>{enquiry.email}</TableCell>
              <TableCell>{enquiry.message}</TableCell>
              <TableCell>{enquiry.status}</TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStatus(enquiry.id, "responded")}
                  >
                    Mark Responded
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStatus(enquiry.id, "archived")}
                  >
                    Archive
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};