import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";


export default function HomeAfterPayment() {
  const stripe = useStripe();
  const [ message, setMessage ] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          console.log(paymentIntent)
          setMessage("Payment succeeded!");
          if (paymentIntent.description != -1) {
            verifyPayment(paymentIntent.id).then(() => navigate('/'))
          }
          else {
            navigate('/')
          }
          // verifyPayment(paymentIntent.id);
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);
  const verifyPayment = async (id) => {
    await fetch("/api/pay/confirm-payment", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ paymentId: id })
    })
    .then((res) => res.json())
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })
  }
    return (
    <>
      <h1>Payment Status</h1>
      <Alert variant='dark'>{message}</Alert>
      
    </>
  );
}