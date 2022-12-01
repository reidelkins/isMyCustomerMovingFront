import React, { useState, useEffect } from "react";

import config from "../config/index.json";

type PriceTableProps = {
  plan: any;
  timeSpan: string;
};

const PriceCard = ({ plan, timeSpan }: PriceTableProps) => {
  let checkoutLink =
    plan?.name !== "Enterprise"
      ? "/checkout/" + timeSpan + "/" + plan?.name
      : "/#contact";
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 px-4">
      <div
        className="
            bg-white
            rounded-xl
            relative
            z-10
            overflow-hidden
            border border-primary border-opacity-20
            shadow-pricing
            py-10
            px-8
            sm:p-12
            lg:py-10 lg:px-6
            xl:p-12
            mb-10
            shadow-xl
            "
      >
        <span className="text-primary font-semibold text-lg block mb-4">
          {plan?.name}
        </span>
        {timeSpan === "Monthly" ? (
          <h2 className="font-bold text-dark mb-5 text-[42px]">
            {plan?.prices?.month}
            {plan?.name !== "Enterprise" && (
              <span className="text-base text-body-color font-medium">
                / {timeSpan}
              </span>
            )}
          </h2>
        ) : (
          <h2 className="font-bold text-dark mb-5 text-[42px]">
            {plan?.prices?.year}
            {plan?.name !== "Enterprise" && (
              <span className="text-base text-body-color font-medium">
                / {timeSpan}
              </span>
            )}
          </h2>
        )}
        <p
          className="
              text-base text-body-color
              pb-8
              mb-8
              border-b border-[#F2F2F2]
              "
        >
          {plan?.description}
        </p>
        {/* <div className="mb-7">
          <p className="text-base text-body-color leading-loose mb-1">
            Unlimited Users
          </p>
          <p className="text-base text-body-color leading-loose mb-1">
            All UI components
          </p>
          <p className="text-base text-body-color leading-loose mb-1">
            Lifetime access
          </p>
          <p className="text-base text-body-color leading-loose mb-1">
            Free updates
          </p>
          <p className="text-base text-body-color leading-loose mb-1">
            Use on Unlimited project
          </p>
          <p className="text-base text-body-color leading-loose mb-1">
            12 Months support
          </p>
        </div> */}
        <a
          href={checkoutLink}
          className="
              w-full
              block
              text-base
              font-semibold
              text-primary
              bg-transparent
              border border-[#D4DEFF]
              rounded-md
              text-center
              p-4
              hover:text-white hover:bg-primary hover:border-primary
              transition
              "
        >
          {plan?.callToAction?.text}
        </a>
        <div>
          <span className="absolute right-0 top-7 z-[-1]">
            <svg
              width="77"
              height="172"
              viewBox="0 0 77 172"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="86"
                  y1="0"
                  x2="86"
                  y2="172"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#3056D3" stop-opacity="0.09" />
                  <stop offset="1" stop-color="#C4C4C4" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="absolute right-4 top-4 z-[-1]">
            <svg
              width="41"
              height="89"
              viewBox="0 0 41 89"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="38.9138"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 38.9138 87.4849)"
                fill="#3056D3"
              />
              <circle
                cx="38.9138"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 38.9138 74.9871)"
                fill="#3056D3"
              />
              <circle
                cx="38.9138"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 38.9138 62.4892)"
                fill="#3056D3"
              />
              <circle
                cx="38.9138"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 38.9138 38.3457)"
                fill="#3056D3"
              />
              <circle
                cx="38.9138"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 38.9138 13.634)"
                fill="#3056D3"
              />
              <circle
                cx="38.9138"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 38.9138 50.2754)"
                fill="#3056D3"
              />
              <circle
                cx="38.9138"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 38.9138 26.1319)"
                fill="#3056D3"
              />
              <circle
                cx="38.9138"
                cy="1.42021"
                r="1.42021"
                transform="rotate(180 38.9138 1.42021)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 26.4157 87.4849)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 26.4157 74.9871)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 26.4157 62.4892)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 26.4157 38.3457)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 26.4157 13.634)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 26.4157 50.2754)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 26.4157 26.1319)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="1.4202"
                r="1.42021"
                transform="rotate(180 26.4157 1.4202)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 13.9177 87.4849)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 13.9177 74.9871)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 13.9177 62.4892)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 13.9177 38.3457)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 13.9177 13.634)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 13.9177 50.2754)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 13.9177 26.1319)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="1.42019"
                r="1.42021"
                transform="rotate(180 13.9177 1.42019)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 1.41963 87.4849)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 1.41963 74.9871)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 1.41963 62.4892)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 1.41963 38.3457)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 1.41963 13.634)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 1.41963 50.2754)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 1.41963 26.1319)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="1.4202"
                r="1.42021"
                transform="rotate(180 1.41963 1.4202)"
                fill="#3056D3"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default function PriceTable() {
  const { pricing } = config;
  const { items } = pricing;
  const [timeSpan, setTimeSpan] = useState("Monthly");
  const selectedClass = `w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`;
  const unselectedClass = `w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-background hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`;

  const handleTimeSpan = (timeSpan: string) => {
    setTimeSpan(timeSpan);
    console.log(timeSpan);
  };

  return (
    <>
      <section className={`bg-background py-8`} id="pricing">
        <div className={`container mx-auto px-2 pt-4 pb-12 `}>
          <div className="container">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4">
                <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                  {/* <span className="font-semibold text-lg text-primary mb-2 block">
                    Pricing Table
                  </span> */}
                  <h2
                    className="
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[40px]
                  text-dark
                  mb-4
                  "
                  >
                    Our Pricing Options
                  </h2>
                  {/* <p className="text-base text-body-color">
                    There are many variations of passages of Lorem Ipsum
                    available but the majority have suffered alteration in some
                    form.
                  </p> */}
                </div>
                <div className="flex justify-center items-center mb-8">
                  {timeSpan === "Monthly" ? (
                    <div className="flex items-center">
                      <button
                        className="rounded-md shadow m-2"
                        onClick={() => handleTimeSpan("Monthly")}
                      >
                        <p className={selectedClass}>Monthly</p>
                      </button>
                      <button
                        className="rounded-md shadow m-2"
                        onClick={() => handleTimeSpan("Annually")}
                      >
                        <p className={unselectedClass}>Annually</p>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <button
                        className="rounded-md shadow m-2"
                        onClick={() => handleTimeSpan("Monthly")}
                      >
                        <p className={unselectedClass}>Monthly</p>
                      </button>
                      <button
                        className="rounded-md shadow m-2"
                        onClick={() => handleTimeSpan("Annually")}
                      >
                        <p className={selectedClass}>Annually</p>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center -mx-4">
              {items?.map((plan: any) => (
                <PriceCard key={plan.id} plan={plan} timeSpan={timeSpan} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
