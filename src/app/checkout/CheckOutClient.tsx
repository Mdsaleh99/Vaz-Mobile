"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckOutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const router = useRouter();

  console.log("paymentIntent", paymentIntent);
  console.log("clientSecret", clientSecret);

  useEffect(() => {
    // create payment intent as soon as the page loads
    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);

          if (!res.ok) {
            if (res.status === 401) {
              router.push("/login");
              return null;
            }
            console.log("paymentIntent", paymentIntent);
            console.log("clientSecret", clientSecret);
            throw new Error("Failed to create payment intent");
          }

          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data?.paymentIntent?.client_secret) {
            setClientSecret(data.paymentIntent.client_secret);
            handleSetPaymentIntent(data.paymentIntent.id);
          } else {
            throw new Error("Invalid payment intent data received");
          }
        //   setClientSecret(data.paymentIntent.client_secret)
        //   handleSetPaymentIntent(data.paymentIntent.id)
        })
        .catch((error) => {
          setError(true);

          console.log("Error", error);
          toast.error("Something went wrong");
        });
    }
  }, [cartProducts, paymentIntent, router, handleSetPaymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret: clientSecret || "",
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements
          options={options}
          stripe={stripePromise}
        >
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && <div className="text-center">Loading checkout....</div>}
      {error && (
        <div className="text-center text-rose-500">
          Something went wrong....
        </div>
      )}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-teal-600 text-center">Payment Success</div>
          <div className="max-w-[220px] w-full">
            <Button
              label="View Your Orders"
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOutClient;
