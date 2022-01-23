import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from "react-bootstrap/Alert";

import PlanSelect from './PlanSelect' 
import ReferralCodeInput from './ReferralCodeInput' 
import ReferredUsers from "./ReferredUsers";
import TotalPayout from "./TotalPayout";
import Payout from "./Payout";
import TopUpButton from "./TopUpButton";


export default function HomeAfterPayment() {
  const stripe = useStripe();
  const [ message, setMessage ] = useState(null);
  const [ userData, setUserData ] = useState();

  useEffect(() => {
    fetch("/api/getUserData")
        .then((res) => res.json())
        .then((result) => {
            const { id, email, referred, referral_code, membership_tier } = result
            const data = { id, email, referred, referral_code, membership_tier }
            setUserData(data)
            // console.log(data)
        },
        (error) => {
            console.log(error)

        })
        // .catch((r) =>
    
  }, [])  
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
          if (paymentIntent.description != -1) verifyPayment(paymentIntent.id).then(() => {

            setMessage("Payment succeeded!");
          })
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
      <h1>Home</h1>
      <Alert variant='dark'>{message}</Alert>
      <ReferralCodeInput userData={userData}/>
      <PlanSelect userData={userData}/>
      <ReferredUsers />
      <Payout />
      <Container>
        <Row>
          <Col><TopUpButton /></Col>
        </Row>
      </Container>
      
    </>
  );
}