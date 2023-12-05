import BookingRow from "./BookingRow";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

import useBookings from "./useBookings";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty resource="bookings" />;

  return (
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 2.2rem">
      {/* <p>{isPreviousData ? "Fetching data ..." : ""}</p> */}
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>
      <Menus>
        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Menus>
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default BookingTable;
