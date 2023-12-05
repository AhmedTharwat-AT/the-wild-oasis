import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sortBy") || "";

  function handleSelecting(e) {
    searchParams.set("sortBy", e.target.value);

    searchParams.get("page") && searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortValue}
      onChange={handleSelecting}
      type="white"
    />
  );
}

export default SortBy;
