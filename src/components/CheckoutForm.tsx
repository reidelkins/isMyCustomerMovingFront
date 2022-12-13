import React, { useEffect, useState } from "react";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";

// api
import ApiService from "../pages/api/checkout";

interface Props {
  timeFrame: string | string[] | undefined;
  tier: string | string[] | undefined;
}

export default function CheckoutForm({ timeFrame, tier }: Props) {
  const router = useRouter();
  const [cardError, setCardError] = useState("");
  const [otherError, setOtherError] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {}, [cardError]);

  const handlePhoneError = () => {
    const err = isPossiblePhoneNumber(phone)
      ? undefined
      : "Invalid phone number";
    return phone ? err : "Phone number is required";
  };

  // Handle form submission.
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    stripe
      .confirmSetup({
        elements,
        confirmParams: {
          return_url: "/success/",
        },
        redirect: "if_required",
      })
      .then((result) => {
        ApiService.saveStripeInfo({
          email,
          company,
          phone,
          tier,
          timeFrame,
          payment_method_id: result.setupIntent!.payment_method,
        })
          .then(() => {
            router.push("/success/");
          })
          .catch((err) => {
            setOtherError(err.data);
          });
      })
      .catch((err) => {
        setCardError(`Error: ${err.message}`);
      });

    setIsProcessing(false);
  };

  return (
    <div>
      <div className="bg-background grid gap-y-16 overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="stripe-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="form-row">
            <label
              htmlFor="company"
              className="block text-gray-700 text-sm font-bold mb-2 mt-4"
            >
              Company Name
            </label>
            <input
              className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="company"
              name="name"
              type="string"
              placeholder="Is My Customer Moving"
              required
              value={company}
              onChange={(event) => {
                setCompany(event.target.value);
              }}
            />
          </div>
          <div className="form-row">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="name"
              type="email"
              placeholder="example@ismycustomermoving.com"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="form-row">
            <label
              htmlFor="phone-number"
              className="block text-gray-700 text-sm font-bold mb-2 mt-4"
            >
              Phone Number
            </label>
            <PhoneInput
              className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone-number"
              name="phone-number"
              defaultCountry="US"
              countrySelectProps={{ unicodeFlags: true }}
              placeholder="Enter phone number"
              required
              international
              value={phone}
              onChange={(event) => {
                setPhone(event as string);
              }}
              error={handlePhoneError()}
            />
          </div>
          <div className="form-row">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-4"
              htmlFor="card-element"
            >
              Credit or debit card
            </label>
            <PaymentElement />
            <div className="card-errors" role="alert">
              {cardError}
            </div>
          </div>
          <button
            disabled={isProcessing}
            type="submit"
            className="submit-btn mt-4 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10"
          >
            <span id="button-text">
              {isProcessing ? "Processing ..." : "Submit Payment"}
            </span>
          </button>
          {otherError && (
            <div className="text-red-500 text-sm mt-2" role="alert">
              {otherError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
