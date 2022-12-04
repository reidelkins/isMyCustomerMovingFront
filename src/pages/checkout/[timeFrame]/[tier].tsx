import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Stack,
  Switch,
  Divider,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import Link from "next/link";
import { useRouter } from "next/router";

import CheckoutForm from "../../../components/CheckoutForm";
import config from "../../../config/index.json";
import { useResponsive } from "../../../hooks/useResponsiveSize";
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
  const smDown = useResponsive("down", "sm");
  // const mdUp = useResponsive("up", "md");
  const router = useRouter();
  const [timeFrame, setTimeFrame] = useState<string | string[] | undefined>("");
  const [tier, setTier] = useState<string | string[] | undefined>("");

  const [price, setPrice] = useState(0);
  const [annualPrice, setAnnualPrice] = useState(0);
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
          setAnnualPrice(item.prices.Annual);
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
        <div className="w-full sm:w-1/2 md:flex md:justify-center bg-primary border">
          <Stack spacing={3} sx={{ p: 3 }} className="my-10 md:my-auto">
            <Stack direction="row" spacing={2}>
              <Link href="/" className="cursor-pointer">
                <img
                  alt="logo"
                  className="h-8 md:h-16 w-auto cursor-pointer"
                  src={"/assets/images/logoBlack.svg"}
                />
              </Link>
            </Stack>
            <Container className="w-full mx-auto">
              <Typography className="mt-4 max-w-2xl text-xl text-gray-700">
                Subscribe to {tier}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Typography className="mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  {price}.00
                </Typography>
                <Typography className="mt-4 max-w-2xl text-l text-gray-700 lg:mx-auto">
                  per <br className="text-xl leading-snug" />
                  {timeFrame === "Month" ? "month" : "year"}
                </Typography>
              </Stack>
            </Container>
            <div className=" ">
              {!smDown && (
                <div className="border-2 rounded border-black border-opacity-20">
                  <Stack spacing={-0.25}>
                    <Stack direction="row" spacing={8} className="mt-4">
                      <Typography className="max-w-2xl text-xl text-black ml-4">
                        {tier}
                      </Typography>
                      <div />
                      <Typography className="max-w-2xl text-xl text-black">
                        {price}.00
                      </Typography>
                    </Stack>
                    <Typography className="mt-4 max-w-2xl text-l text-gray-700 pl-4">
                      Billed {timeFrame === "Month" ? "monthly" : "annually"}
                    </Typography>
                  </Stack>
                </div>
              )}
              {timeFrame === "Month" && (
                <div className="border rounded border-black border-opacity-20 bg-secondary">
                  {smDown ? (
                    <Stack
                      direction={"row"}
                      spacing={1}
                      className="h-16 my-auto"
                    >
                      <Switch onChange={() => setTimeFrame("Year")} />
                      <Typography className="text-sx text-black">
                        Switch To Annual Plan
                      </Typography>
                      <Box display="inline" className="bg-tertiary rounded">
                        <Typography
                          display="inline"
                          className="text-xs text-quaternary text-bold"
                        >
                          Free Month
                        </Typography>
                      </Box>
                      <Typography className="text-xs text-black">
                        {annualPrice}.00/year
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack direction={"row"} spacing={1} className="m-4">
                      <Switch
                        onChange={() => setTimeFrame("Year")}
                        className="mt-1"
                      />
                      <div className="w-40">
                        <Typography className="max-w-xl text-l text-black font-bold">
                          Save with annual billing
                          <span className="bg-tertiary rounded mx-1 p-1 text-quaternary ">
                            Free Month!
                          </span>
                        </Typography>
                      </div>
                      <Typography className="max-w-2xl text-xl text-black pl-8">
                        {annualPrice}.00/year
                      </Typography>
                    </Stack>
                  )}
                </div>
              )}
              {!smDown && (
                <>
                  <Stack direction="row" spacing={29} className="mt-4">
                    <Typography className="max-w-2xl text-xl text-black ml-4">
                      Subtotal
                    </Typography>
                    <Typography className="max-w-2xl text-xl text-black">
                      {price}.00
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={26} className="">
                    <Typography className="max-w-2xl text-xl text-black ml-4">
                      7 Day Trial
                    </Typography>
                    <Typography className="max-w-2xl text-xl text-red">
                      ({price}.00)
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: 3, borderBottomWidth: 5 }} />

                  <Stack direction="row" spacing={20} className="mt-4">
                    <Typography className="max-w-2xl text-xl text-black ml-4">
                      Total Due Today
                    </Typography>
                    <Typography className="max-w-2xl text-xl text-black">
                      $0.00
                    </Typography>
                  </Stack>
                </>
              )}
            </div>
          </Stack>
        </div>

        <div className="md:w-1/2 flex justify-center border">
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
