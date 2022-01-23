import React, { useState, useEffect } from "react";

import Alert from 'react-bootstrap/Alert';


export default function TotalPayout() {
  const [totalPayout, setTotalPayout] = useState();
  useEffect(() => {
    fetch("/api/pay/get-payout")
        .then((res) => res.json())
        .then((result) => {
            setTotalPayout(result)
            console.log(result)
        },
        (error) => {
            console.log(error)
        })
        // .catch((r) =>
    
    }, [])


    return (
        <>
            <Alert variant='dark'>
                You currently have {totalPayout} available for payout!
            </Alert>
        </>
    );
}