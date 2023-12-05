import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = +searchParams.get("last") || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery(
    ["stays", `last-${numDays}-days`],
    () => getStaysAfterDate(queryDate)
  );

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isLoading, stays, confirmedStays, numDays };
}
