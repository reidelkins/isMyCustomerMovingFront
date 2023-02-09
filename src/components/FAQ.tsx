import React, { useState } from "react";

import config from "../config/index.json";

const FAQ = () => {
  const { faqs } = config;
  const [open, setOpen] = useState(
    Array.from({ length: faqs.length }, () => false)
  );

  const handleOpenFAQ = (index: number) => {
    const newOpen = [...open];
    newOpen[index] = !newOpen[index];
    setOpen(newOpen);
  };

  return (
    <div className="mt-40" id="faq">
      <h1 className="text-4xl font-bold text-center">FAQs</h1>
      {faqs.map((faq, index) => {
        return (
          <div
            key={index}
            className=" border border-black rounded-lg mx-28 my-1"
          >
            <div
              className="flex items-center justify-between cursor-pointer p-4"
              onClick={() => handleOpenFAQ(index)}
            >
              <p className="text-2xl font-medium mr-4">{faq.question}</p>
              <div className={`${open[index] ? "rotate-180" : "rotate-0"}`}>
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {open[index] && (
              <div className="flex items-center cursor-pointer mx-28 p-4">
                <p className="text-l font-medium mt-2">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FAQ;
