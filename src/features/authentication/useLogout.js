import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as apiLogut } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: apiLogut,
    onSuccess: () => {
      // remove all queries
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { logout, isLoading };
}
