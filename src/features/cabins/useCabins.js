import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery(["cabins"], getCabins, {
    staleTime: 50000,
  });

  return { isLoading, cabins, error };
}

export default useCabins;
