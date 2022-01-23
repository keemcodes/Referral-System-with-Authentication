import React, { useEffect, useState } from "react";

import PlanSelect from './PlanSelect' 
import ReferralCodeInput from './ReferralCodeInput' 
import ReferredUsers from "./ReferredUsers";
import Payout from "./Payout";



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
      <ReferralCodeInput userData={userData}/>
      <PlanSelect userData={userData}/>
      <ReferredUsers />
      <Payout />

      
    </>
  );
}