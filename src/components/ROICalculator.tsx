import React, { useEffect, useState } from "react";
import config from "../config/index.json";

const ROICalculator = () => {
  const { pricing } = config;
  const [price, setPrice] = useState("SB");
  const [roiCallToActionLink, setRoiCallToActionLink] = useState(
    pricing.items[0]?.checkoutLink.Month
  );
  const [customers, setCustomers] = useState(10000);
  const [valPerCustomer, setValPerCustomer] = useState(1000);
  const [annualLeadGen, setAnnualLeadGen] = useState(0);
  const [day1LeadGen, setDay1LeadGen] = useState(0);
  const [newCustLeads, setNewCustLeads] = useState(0);
  const [revGen, setRevGen] = useState("0");
  const [revAfterCost, setRevAfterCost] = useState("0");
  const [recentlySoldData, setRecentlySoldData] = useState(false);

  const handleInputChange = (e: any, setFunction: any) => {
    const input = e.target.value;
    if (Number.isNaN(input)) {
      return;
    }
    setFunction(input);
  };

  const handleSliderChange = (e: any, setFunction: any) => {
    setFunction(e.target.value);
  };

  useEffect(() => {
    setDay1LeadGen(Math.round(customers * 0.015));
    setAnnualLeadGen(Math.round(customers * 0.05));
    let rev = Math.round(annualLeadGen * valPerCustomer * 0.1);
    let revString = rev.toString();
    // add commas after every 3 digits
    revString = revString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setRevGen(revString);
    if (customers <= 5000) {
      rev -= 1620;
      setPrice("SB");
    } else if (customers <= 10000) {
      rev -= 2700;
      setPrice("FR");
    } else if (customers <= 20000) {
      rev -= 4320;
      setPrice("LB");
    } else {
      rev = rev - 4320 - 1080 * Math.ceil((customers - 20000) / 10000);
      setPrice("LB");
    }
    pricing.items.forEach((item) => {
      if (item.tier === price) {
        setRoiCallToActionLink(item.checkoutLink.Month);
      }
    });
    revString = rev.toString();
    // add commas after every 3 digits
    revString = revString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setRevAfterCost(revString);
    setNewCustLeads(Math.round((customers / 50) * 52));
  }, [customers, valPerCustomer, annualLeadGen, day1LeadGen, newCustLeads]);

  return (
    <div className="bg-gray-50" id="roi">
      <div className="container flex justify-center mx-auto pt-16 mb-8">
        <div>
          <p className="mt-4 max-w-2xl text-2xl text-gray-900 lg:mx-auto text-center">
            How Much Money Are You Missing Out On?
          </p>
          <h1
            className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
          >
            Use Our ROI Calculator
          </h1>
        </div>
      </div>
      <div className="grid sm:grid-rows-2 lg:grid-rows-1 sm:grid-cols-1 lg:grid-cols-2 mx-11 gap-1">
        <div className="border border-gray-300 rounded-xl shadow bg-background">
          <h2 className="font-medium m-4 text-3xl"></h2>
          <div className="grid grid-rows-2 grid-cols-1 mx-10">
            <div className="row-span-1 flex flex-col my-8 ">
              <label className="row-span-1" htmlFor="input1">
                Customer Count
              </label>
              <input
                id="input1"
                type="text"
                className="row-span-1 bg-gray-100 p-4 text-xl rounded-xl my-2"
                value={customers}
                onChange={(e) => handleInputChange(e, setCustomers)}
              />
              <input
                type="range"
                className="row-span-1 accent-red"
                min="1000"
                max="250000"
                value={customers}
                onChange={(e) => handleSliderChange(e, setCustomers)}
              />
            </div>
            <div className="row-span-1 flex flex-col ">
              <label className="row-span-1" htmlFor="input2">
                Average Revenue Per Customer
              </label>

              <input
                id="input1"
                type="text"
                className="row-span-1 bg-gray-100 p-4 text-xl rounded-xl my-2"
                value={valPerCustomer}
                onChange={(e) => handleInputChange(e, setValPerCustomer)}
              />

              <input
                type="range"
                className="row-span-1 bg-primary"
                min="100"
                max="10000"
                value={valPerCustomer}
                onChange={(e) => handleSliderChange(e, setValPerCustomer)}
              />
              <div className="flex flex-row mt-8 text-xl">
                <p className="mr-4">With Recently Sold Homes Data</p>
                <label className="relative">
                  <input
                    type="checkbox"
                    checked={recentlySoldData}
                    onChange={() => setRecentlySoldData(!recentlySoldData)}
                  />
                  <span className="switch-label bg-white rounded-full w-10 h-6 shadow-md cursor-pointer" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-xl shadow bg-primary text-white font-bold">
          <h2 className="font-extrabold m-4 text-3xl">
            Your Return On Investment
          </h2>
          {!recentlySoldData ? (
            <div className="grid grid-rows-3 grid-cols-1 mx-10 text-xl sm:text-2xl">
              <div className="row-span-1 flex flex-col my-2">
                <div className="grid grid-rows-1 grid-cols-3">
                  <p className="col-span-2">Leads Generated Day 1</p>
                  <p className="col-span-1 justify-self-end">{day1LeadGen}</p>
                </div>
              </div>
              <div className="row-span-1 flex flex-col my-2">
                <div className="grid grid-rows-1 grid-cols-3">
                  <p className="col-span-2">Leads Generated Per Year</p>
                  <p className="col-span-1 justify-self-end">{annualLeadGen}</p>
                </div>
              </div>
              <div className="row-span-1 flex flex-col my-2">
                <div className="grid grid-rows-2 grid-cols-3 ">
                  <p className="col-span-2 row-span-2">Revenue Generated</p>
                  <p className="col-span-1 row-span-1 justify-self-end">
                    ${revGen}
                  </p>
                  <p className="col-span-2 row-span-2 sm:ml-20 sm:-mt-8 ">
                    After IMCM Cost
                  </p>
                  <p className="col-span-1 row-span-1 justify-self-end mt-8 sm:-mt-8">
                    ${revAfterCost}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-rows-4 grid-cols-1 mx-10 gap-1 text-l sm:text-2xl">
              <div className="row-span-1 flex flex-col my-4">
                <div className="grid grid-rows-1 grid-cols-3">
                  <p className="col-span-2">Day 1 Existing Customer Leads</p>
                  <p className="col-span-1 justify-self-end">{day1LeadGen}</p>
                </div>
              </div>
              <div className="row-span-1 flex flex-col my-4">
                <div className="grid grid-rows-1 grid-cols-3">
                  <p className="col-span-2">Annual Existing Customer Leads</p>
                  <p className="col-span-1 justify-self-end">{annualLeadGen}</p>
                </div>
              </div>
              <div className="row-span-1 flex flex-col my-4">
                <div className="grid grid-rows-1 grid-cols-3">
                  <p className="col-span-2">Newly Sold Home Leads Per Year</p>
                  <p className="col-span-1 justify-self-end">{newCustLeads}</p>
                </div>
              </div>
              <div className="row-span-1 flex flex-col">
                <div className="grid grid-rows-2 grid-cols-3 ">
                  <p className="col-span-2 row-span-2">Revenue Generated</p>
                  <p className="col-span-1 row-span-1 justify-self-end">
                    ${revGen}
                  </p>
                  <p className="col-span-2 row-span-2 sm:ml-20 sm:-mt-8 ">
                    After IMCM Cost
                  </p>
                  <p className="col-span-1 row-span-1 justify-self-end sm:-mt-8">
                    ${revAfterCost}
                  </p>
                </div>
              </div>
            </div>
          )}
          <p className=" text-xs mx-2 pt-8">
            Please note that all the numbers presented here are simply estimates
            based on the rates obtained from existing IMCM customers. These
            values are not guaranteed and should not be taken as such.
          </p>
        </div>
      </div>
      <div className=" flex justify-center items-center">
        <a href={roiCallToActionLink} target="_blank" rel="noreferrer">
          <button className="bg-primary text-white font-bold my-8 p-6 rounded-lg">
            SUBSCRIBE NOW
          </button>
        </a>
      </div>
    </div>
  );
};

export default ROICalculator;
