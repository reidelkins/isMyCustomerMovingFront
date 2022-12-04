import React from "react";

import config from "../config/index.json";

const ContactUs = () => {
  const { pricing } = config;
  const { title, subtitle } = pricing;
  // const [firstPlan, secondPlan, thirdPlan] = items;

  return (
    <section className={`bg-background py-8`} id="contact">
      <div className={`container mx-auto px-2 pt-4 pb-12 text-primary `}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-2xl text-gray-900 lg:mx-auto text-center">
          {subtitle}
        </p>
        <div className="flex flex-row justify-center items-center">
          <iframe
            src="https://letsmeet.io/jonathanbrewster/ismycustomermoving-demo"
            // style="border:none; min-height: 700px; width: 1px; min-width: 100%; *width: 100%;"
            style={{
              border: "none",
              minHeight: "700px",
              // width: "1px",
              minWidth: "100%",
              width: "100%",
            }}
            name="booking"
            scrolling="no"
            frameBorder="0"
            width="100%"
            height="100%"
            referrerPolicy="unsafe-url"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
