import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get("discount") ?? "all";

  // 1) Filter
  let filterCabins;
  switch (filterValue) {
    case "no-discounts":
      filterCabins = cabins.filter((cabin) => !cabin.discount);
      break;
    case "with-discounts":
      filterCabins = cabins.filter((cabin) => cabin.discount);
      break;
    default:
      filterCabins = cabins;
  }

  // 2) Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const sortedCabins =
    direction === "asc"
      ? filterCabins.sort((a, b) => a[field] - b[field])
      : filterCabins.sort((a, b) => b[field] - a[field]);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
