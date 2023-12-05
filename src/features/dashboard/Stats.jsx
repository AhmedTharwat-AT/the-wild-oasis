import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  //1.
  const numBookings = bookings.length;

  //2.
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  //3.
  const checkins = confirmedStays.length;

  //4.
  //occupation = num of checked in nights / num of all nights if all cabins were checked in in that period
  const occupation =
    (confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
      (numDays * cabinsCount)) *
    100;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Check ins"
        color="indigo"
        value={checkins}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupency rate"
        color="yellow"
        value={Math.round(occupation) + "%"}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
