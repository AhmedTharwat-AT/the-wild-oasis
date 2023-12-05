import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // : { field: "totalPrice", value: 5000, method: "gte" };

  //sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // pagination

  const page = +searchParams.get("page") || 1;

  const {
    data: { data: bookings = [], count = 0 } = {},
    error,
    isLoading,
    isPreviousData,
  } = useQuery(["bookings", filter, sortBy, page], () =>
    getBookings({ filter, sortBy, page })
  );

  //prefetch next page
  if (page < Math.ceil(count / PAGE_SIZE))
    queryClient.prefetchQuery(["bookings", filter, sortBy, page + 1], () =>
      getBookings({ filter, sortBy, page: page + 1 })
    );

  //prefetch previous page
  if (page > 1)
    queryClient.prefetchQuery(["bookings", filter, sortBy, page - 1], () =>
      getBookings({ filter, sortBy, page: page - 1 })
    );

  return { isLoading, bookings, error, count, isPreviousData };
}
