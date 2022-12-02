import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { useEffect, useState } from "react";
import Checkout from "../../../components/Checkout";
import ApiService from "../../api/checkout";

export default function CheckoutPage() {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    ApiService.getStripePK().then((response) => {
      setStripePromise(loadStripe(response.data.data.publishable_key));
    });
  }, []);

  useEffect(() => {
    ApiService.getClientSecret().then((response) => {
      setClientSecret(response.data.data.client_secret);
    });
  }, []);

  return (
    <div>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkout clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
}
