import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import CheckoutForm from "../../../components/CheckoutForm";
import ApiService from "../../api/checkout";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

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
    <section title="Checkout">
      <RootStyle>
        <div className="lg:w-1/2 flex items-center justify-center bg-primary border">
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Welcome Back
          </Typography>
        </div>

        <Container maxWidth="sm">
          <ContentStyle>
            {stripePromise && clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </section>
  );
}
