import React from "react";

//mui
import { styled } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";

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

interface Props {
  clientSecret: string;
}

export default function Checkout({ clientSecret }: Props) {
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
            <CheckoutForm clientSecret={clientSecret} />
          </ContentStyle>
        </Container>
      </RootStyle>
    </section>
  );
}

{
  /* <div className="bg-background grid gap-y-16 overflow-hidden">
       <Header parent="checkout" />
       <form onSubmit={handleSubmit} className="stripe-form">
        <div className="form-row">
          <label htmlFor="email">Email Address</label>
          <input
            className="form-input"
            id="email"
            name="name"
            type="email"
            placeholder="jenny.rosen@example.com"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="form-row">
          <label htmlFor="card-element">Credit or debit card</label>
          <CardElement id="card-element" onChange={handleChange} />
          <div className="card-errors" role="alert">
            {error}
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Submit Payment
        </button>
       </form>
       <About />
     </div> */
}
