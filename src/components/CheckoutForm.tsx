import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

// api
import ApiService from "../pages/api/checkout";
// mui

export default function CheckoutForm() {
  //   const [error, setError] = useState(null);
  const error = null;
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { timeFrame, tier } = router.query;

  // Pass the appearance object to the Elements instance
  //   const elements = stripe!.elements({ clientSecret, appearance });

  //   const handleChange = (event: any) => {
  //     if (event.error) {
  //       setError(event.error.message);
  //     } else {
  //       setError(null);
  //     }
  //   };
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
          return_url: "http://localhost:3006/paymentStatus",
        },
        redirect: "if_required",
      })
      .then((result) => {
        ApiService.saveStripeInfo({
          email,
          company,
          tier,
          timeFrame,
          payment_method_id: result.setupIntent!.payment_method,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })

      .catch((errorHere) => {
        console.log(errorHere);
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
              className="block text-gray-700 text-sm font-bold mb-2 mt-4"
              htmlFor="card-element"
            >
              Credit or debit card
            </label>
            <PaymentElement />
            <div className="card-errors" role="alert">
              {error}
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
        </form>
      </div>
    </div>
  );
}
