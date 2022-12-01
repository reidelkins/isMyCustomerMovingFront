import React, { useState, useEffect } from "react";
import Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
//api
import ApiService from "../pages/api/checkout";
//mui
import { Stack, TextField } from "@mui/material";

export default function CheckoutForm() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  // Pass the appearance object to the Elements instance
  //   const elements = stripe!.elements({ clientSecret, appearance });

  const handleChange = (event: any) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };
  // Handle form submission.
  const handleSubmit = async (event: any) => {
    console.log("final submit");
    event.preventDefault();
    const card = elements!.getElement(CardElement);

    // add these lines
    if (card) {
      const { error, paymentMethod } = await stripe!.createPaymentMethod({
        type: "card",
        card,
      });
      ApiService.saveStripeInfo({
        email,
        payment_method_id: paymentMethod!.id,
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      if (error) {
        console.log("[error]", error);
      } else {
        console.log("[PaymentMethod]", paymentMethod);
      }
    }
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
            <CardElement id="card-element" onChange={handleChange} />
            <div className="card-errors" role="alert">
              {error}
            </div>
          </div>
          <button
            type="submit"
            className="submit-btn mt-4 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
}
