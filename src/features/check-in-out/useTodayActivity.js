import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery(
    ["today-activity"],
    getStaysTodayActivity
  );
  return { activities, isLoading };
}
