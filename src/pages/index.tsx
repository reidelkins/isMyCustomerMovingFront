import React, { HTMLAttributes } from "react";

import About from "../components/About";
import Analytics from "../components/Analytics";
import Canvas from "../components/Canvas";
import ContactUs from "../components/ContactUs";
import Features from "../components/Features";
import Header from "../components/Header";
import HowTo from "../components/HowTo";
import LazyShow from "../components/LazyShow";
import MainHero from "../components/MainHero";
import MainHeroImage from "../components/MainHeroImage";
import PriceTable from "../components/PriceTable";
import Team from "../components/Team";

declare global {
  namespace JSX {
    interface StripePricingTableAttributes extends HTMLAttributes<HTMLElement> {
      "pricing-table-id": string;
      "publishable-key": string;
    }

    interface IntrinsicElements {
      "stripe-pricing-table": StripePricingTableAttributes;
    }
  }
}

const App = () => {
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
        <>
          <ContactUs />
          {/* <stripe-pricing-table
            pricing-table-id="prctbl_1M9f85AkLES5P4qQFKlOhCEH"
            publishable-key="pk_live_51M6hOpAkLES5P4qQffd8CGkONBH4nNdEfxbyhrMh4k73AVs6cVhjPnREG9u6emOKp0vocg4GK95NHov7IngdJJnB00vtJDrTb9"
          ></stripe-pricing-table> */}
        </>
      </LazyShow>
      <LazyShow>
        <PriceTable />
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
