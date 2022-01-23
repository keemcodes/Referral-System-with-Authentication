import React, { useState, useEffect } from "react";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';


export default function PayoutButton(props) {

    function payout(e) {
        e.preventDefault();
        fetch("/api/pay/payout", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((result) => {
            if (result?.raw?.code) return props.updateResponse(result.raw.code)
            props.updateResponse(result)
            console.log(result)
        },
        (error) => {
            console.log(error)
        })
    }

    return (
        <>
            <OverlayTrigger overlay={<Tooltip id="tooltip">Payment will be sent to a pregenerated Stripe account!</Tooltip>}>
            <span className="d-inline-block justify-content-center">
                <Button onClick={(e) => payout(e)}>
                    Payout
                </Button>
            </span>
            </OverlayTrigger>
            <p>{props.response}</p>
        </>
    );
}