import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";

import About from "../components/About";
import Analytics from "../components/Analytics";
import Canvas from "../components/Canvas";
import Features from "../components/Features";
import Header from "../components/Header";
import HowTo from "../components/HowTo";
import LazyShow from "../components/LazyShow";
import MainHero from "../components/MainHero";
import MainHeroImage from "../components/MainHeroImage";
import Pricing from "../components/Pricing";
// import Product from '../components/Product';
import Team from "../components/Team";
import CheckoutForm from "../components/CheckoutForm";

const App = () => {
  const stripePromise = loadStripe(
    "pk_test_51M6hOpAkLES5P4qQRx2fORUAAi49KDKe4ONatn8bOSK3J9nOyDPUsLmTfumYNt4YSHC3P80HEfpmt5vbezszrTXG00ii2eiDQx"
  );
  return (
    <div className={`bg-background grid gap-y-16 overflow-hidden`}>
      <div className={`relative bg-background`}>
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}
          >
            <Header parent="home" />
            <MainHero />
          </div>
        </div>
        <MainHeroImage />
      </div>
      <Canvas />

      <LazyShow>
        <>
          <Features />
          <HowTo />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <Team />
          <Canvas />
        </>
      </LazyShow>

      <LazyShow>
        <Pricing />
      </LazyShow>
      <LazyShow>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </LazyShow>
      <LazyShow>
        <>
          <Canvas />
          <About />
        </>
      </LazyShow>
      <Analytics />
    </div>
  );
};

export default App;
