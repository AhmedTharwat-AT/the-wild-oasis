import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as apiLogin } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    error,
    isLoading,
    mutate: login,
  } = useMutation({
    mutationFn: apiLogin,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
      toast.success("Successfully loged in");
    },
    onError: (err) => {
      console.log("Error ", err.message);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { isLoading, login };
}
