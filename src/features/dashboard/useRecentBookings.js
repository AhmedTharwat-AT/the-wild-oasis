import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = +searchParams.get("last") || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery(
    ["bookings", `last-${numDays}-days`],
    () => getBookingsAfterDate(queryDate)
  );

  return { isLoading, bookings };
}
