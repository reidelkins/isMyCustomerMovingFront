import React from "react";

import About from "../components/About";
import Analytics from "../components/Analytics";
import Blog from "../components/Blog";
import Canvas from "../components/Canvas";
import ContactUs from "../components/ContactUs";
import Features from "../components/Features";
import Header from "../components/Header";
// import HowTo from "../components/HowTo";
import FAQ from "../components/FAQ";
import LazyShow from "../components/LazyShow";
import MainHero from "../components/MainHero";
import MainHeroImage from "../components/MainHeroImage";
import PriceTable from "../components/PriceTable";
import Team from "../components/Team";
import ROICalculator from "../components/ROICalculator";

import { getPosts } from "./api/posts";

const App = ({ blogs }: any) => {
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
          <ROICalculator />

          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          {/* <HowTo /> */}
          <Team />
          <Blog blogs={blogs} />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <ContactUs />
          <PriceTable />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <FAQ />
          <Canvas />
          <About />
        </>
      </LazyShow>
      <Analytics />
    </div>
  );
};

export default App;

export async function getStaticProps() {
  const blogs = await getPosts();
  return {
    props: {
      blogs,
    },
  };
}
