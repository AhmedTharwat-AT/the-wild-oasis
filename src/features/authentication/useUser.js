import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery(["user"], getCurrentUser);

  return { isLoading, user, isAuth: user?.role === "authenticated" };
}
