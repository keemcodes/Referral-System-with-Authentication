import React, { useEffect, useState } from "react";
import  { useContext} from 'react';
import { AuthContext } from '../Auth';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import PlanSelect from './PlanSelect' 
import ReferralCodeInput from './ReferralCodeInput' 
import ReferredUsers from "./ReferredUsers";
import TotalPayout from "./TotalPayout";
import PayoutButton from "./PayoutButton";
import TopUpButton from "./TopUpButton";
import CreateTestReferrals from './CreateTestReferrals';
import UncollectedReferrals from './UncollectReferrals';

export default function Home() {
  const { logout } = useContext(AuthContext);
  const [ userData, setUserData ] = useState();
  const [ response, setResponse ] = useState("");
  const [ testReferralsResponse, setTestReferralsResponse ] = useState("");
  const [ testCollectedResponse, setTestCollectedResponse ] = useState("");
  function updateResponse(input) {
    setResponse(input)
  }
  function updateTestReferralsResponse(input) {
    setTestReferralsResponse(input)
  }
  function updateTestCollectedResponse(input) {
    setTestCollectedResponse(input)
  }
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
  return (
    <>
      <Container>
      <Row>

        <h1>Home</h1>
        <ReferralCodeInput userData={userData}/>
        <PlanSelect userData={userData}/>
        <ReferredUsers response= {response} testReferralsResponse={testReferralsResponse} testCollectedResponse={testCollectedResponse} />
        <TotalPayout response={response} testReferralsResponse={testReferralsResponse} testCollectedResponse={testCollectedResponse} />
      </Row>
      
        <Row>
          <Col><PayoutButton response={response} updateResponse={updateResponse} /></Col>
          <Col><TopUpButton /></Col>
          <Col><CreateTestReferrals  testReferralsResponse={testReferralsResponse} updateTestReferralsResponse={updateTestReferralsResponse}/></Col>
          <Col><UncollectedReferrals  testCollectedResponse={testCollectedResponse} updateTestCollectedResponse={updateTestCollectedResponse}/></Col>
          <Button onClick={() => logout()}>Logout</Button>
        </Row>
      </Container>
      
    </>
  );
}