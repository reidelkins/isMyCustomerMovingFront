import React from "react";

// mui
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import CheckoutForm from "./CheckoutForm";

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

export default function Checkout() {
  // Handle real-time validation errors from the CardElement.

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
            <CheckoutForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </section>
  );
}
