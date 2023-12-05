import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../../features/bookings/useBooking";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const { settings: { breakfastPrice } = {} } = useSettings();

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
    status,
  } = booking || {};

  const optionalBreakfastPrice = breakfastPrice * numNights * numGuests;

  useEffect(() => {
    setConfirmPaid(isPaid ?? false);
    setAddBreakfast(hasBreakfast ?? false);
  }, [isPaid, hasBreakfast]);

  const { checkin, isCheckingIn } = useCheckin();

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: addBreakfast,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: optionalBreakfastPrice + totalPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          {status === "unconfirmed" ? "Check in " : "Check out "} booking #
          {bookingId}
        </Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((s) => !s);
              setConfirmPaid(false);
            }}
            id="breakfast"
            disabled={isCheckingIn}
          >
            Want to add break fast for ${optionalBreakfastPrice} ?
          </Checkbox>
        </Box>
      )}

      {status === "unconfirmed" && (
        <Box>
          <Checkbox
            checked={confirmPaid}
            onChange={() => setConfirmPaid((s) => !s)}
            disabled={confirmPaid || isCheckingIn}
            id="confirm"
          >
            I confirm that {guests.fullName} has paid the total amount of{" "}
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : formatCurrency(totalPrice + optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
