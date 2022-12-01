import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import Checkout from "../../../components/Checkout";

export default function CheckoutPage() {
  const stripePromise = loadStripe(
    "pk_test_51M6hOpAkLES5P4qQRx2fORUAAi49KDKe4ONatn8bOSK3J9nOyDPUsLmTfumYNt4YSHC3P80HEfpmt5vbezszrTXG00ii2eiDQx"
  );
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}
