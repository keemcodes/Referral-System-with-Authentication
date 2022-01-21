import React, { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';

import PlanSelect from './PlanSelect'


export default function Home() {
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
const [ userData, setUserData ] = React.useState();
  return (
    <>
      <h1>Home</h1>
      <PlanSelect userData={userData}/>
    </>
  );
}