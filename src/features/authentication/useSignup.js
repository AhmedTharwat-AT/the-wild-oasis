import { useMutation } from "@tanstack/react-query";
import { signup as ApiSignup } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ApiSignup,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! Please verify new account from the user's email address"
      );
    },
  });

  return { signup, isLoading };
}
