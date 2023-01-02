import { useEffect, useState } from "react";

import { Stack, Switch, Divider, Grid } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import Link from "next/link";
import { useRouter } from "next/router";

import CheckoutDetails from "../../../components/CheckoutDetails";
import CheckoutForm from "../../../components/CheckoutForm";
import config from "../../../config/index.json";
import ApiService from "../../api/checkout";

const ContentStyle = styled("div")(() => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

export default function CheckoutPage() {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up(640));
  const smDown = useMediaQuery(theme.breakpoints.down(640));

  const router = useRouter();
  const [timeFrame, setTimeFrame] = useState<string | string[] | undefined>("");
  const [tier, setTier] = useState<string | string[] | undefined>("");

  const [price, setPrice] = useState(0);
  const [annualPrice, setAnnualPrice] = useState(0);
  const discount = "10% OFF";
  const { pricing } = config;
  useEffect(() => {
    setTimeFrame(router.query.timeFrame);
    setTier(router.query.tier);
  }, [router.query]);

  useEffect(() => {
    pricing.items.forEach((item: any) => {
      if (item.name === tier) {
        if (timeFrame === "Month") {
          setPrice(item.prices.Month);
          setAnnualPrice(item.prices.AnnualMonth);
        } else {
          setPrice(item.prices.Annual);
        }
      }
    });
  }, [timeFrame, tier, pricing.items]);

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
      <div className="sm:flex">
        <div className="w-full md:w-1/2 bg-primary flex justify-center">
          {!smUp && <CheckoutDetails price={price} timeFrame={timeFrame} />}
          <Stack spacing={3} sx={{ p: 3 }} className="m-auto">
            <Stack
              direction={"row"}
              className="flex justify-start sm:justify-center"
            >
              <Link href="/" className="cursor-pointer">
                <img
                  alt="logo"
                  className="h-12 md:h-16 w-auto cursor-pointer"
                  src={"/assets/images/logoBlack.svg"}
                />
              </Link>
            </Stack>
            <div>
              <p className="mt-4 max-w-2xl text-l md:text-xl text-gray-700">
                Subscribe to {tier}
              </p>
              <Stack direction="row" spacing={2}>
                <p className="mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  {price}.00
                </p>
                <p className="mt-4 max-w-2xl text-l text-gray-700 lg:mx-auto">
                  per <br className="text-xl leading-snug" />
                  {timeFrame === "Month" ? "month" : "year"}
                </p>
              </Stack>
            </div>
            <div>
              {smUp && (
                <Grid
                  container
                  className="border-2 rounded border-black border-opacity-20 p-2"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid
                    spacing={-1}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Grid>
                      <p className="text-l md:text-xl lg:text-2xl text-black font-bold ">
                        {tier}
                      </p>
                    </Grid>
                    <Grid>
                      <p className="mt-4 max-w-2xl text-md md:text-l lg:text-xl text-gray-700">
                        Billed {timeFrame === "Month" ? "monthly" : "annually"}
                      </p>
                    </Grid>
                  </Grid>
                  <Grid>
                    <p className="pt-2 pl-4 md:pl-8 text-l lg:text-xl">
                      {price}.00
                    </p>
                  </Grid>
                </Grid>
              )}
              {timeFrame === "Month" && (
                <div className="border-2 rounded border-black border-opacity-20 bg-secondary p-2">
                  {smDown ? (
                    <Grid
                      container
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                      spacing={0}
                    >
                      <Switch onChange={() => setTimeFrame("Year")} />
                      <p className="p-2 text-md lg:text-l">
                        Annual Billing
                        <br />
                        <span className="bg-tertiary rounded text-quaternary ">
                          {discount}
                        </span>
                      </p>
                      <Grid className="w-2/5 text-right">
                        <p className="text-md p-2 lg:text-l">
                          {annualPrice}.00/ month
                        </p>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid
                      container
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                      spacing={0}
                    >
                      <Grid
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                        className="w-3/5"
                      >
                        <Switch onChange={() => setTimeFrame("Year")} />
                        <p className="p-2 text-md lg:text-l">
                          Annual Billing
                          <br />
                          <span className="bg-tertiary rounded text-quaternary ">
                            {discount}
                          </span>
                        </p>
                      </Grid>
                      <Grid className="w-2/5 text-right">
                        <p className="text-md p-2 lg:text-l">
                          {annualPrice}.00/ month
                        </p>
                      </Grid>
                    </Grid>
                  )}
                </div>
              )}
              {smUp && (
                <>
                  <Grid
                    container
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "1rem",
                    }}
                  >
                    <Grid>
                      <p className=" text-l lg:text-xl text-black ml-4">
                        Subtotal
                      </p>
                    </Grid>
                    <Grid>
                      <p className=" text-l lg:text-xl text-black mr-4">
                        {price}.00
                      </p>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid>
                      <p className="max-w-2xl text-l lg:text-xl text-black ml-4">
                        7 Day Trial
                      </p>
                    </Grid>
                    <Grid>
                      <p className="max-w-2xl text-l lg:text-xl text-red mr-4">
                        ({price}.00)
                      </p>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 3, borderBottomWidth: 5 }} />
                  <Grid
                    container
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid>
                      <p className="max-w-2xl text-l lg:text-xl text-black ml-4">
                        Total Due Today
                      </p>
                    </Grid>
                    <Grid>
                      <p className="max-w-2xl text-l lg:text-xl text-black mr-4">
                        $0.00
                      </p>
                    </Grid>
                  </Grid>
                </>
              )}
            </div>
          </Stack>
        </div>

        <div className="w-full md:w-1/2 flex justify-center border">
          <ContentStyle>
            {stripePromise && clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm timeFrame={timeFrame} tier={tier} />
              </Elements>
            )}
          </ContentStyle>
        </div>
      </div>
    </section>
  );
}
