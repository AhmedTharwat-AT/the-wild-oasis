import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as apiDeleteBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId) => apiDeleteBooking(bookingId),
    onSuccess: (data) => {
      toast.success(`Booking was successfully deleted`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      toast.error(`There was an error while deleting !`);
    },
  });
  return { isDeleting, deleteBooking };
}
