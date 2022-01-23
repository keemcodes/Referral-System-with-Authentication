import React, { useState, useEffect } from "react";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';


export default function UncollectReferrals(props) {

    function uncollectAllReferrals(e) {
        e.preventDefault();
        fetch("/api/uncollectAll", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((result) => {
            props.updateTestCollectedResponse(() => " " + result)
            console.log(result)
        },
        (error) => {
            console.log(error)
        })
    }

    return (
        <>
            <OverlayTrigger overlay={<Tooltip id="tooltip">Reset all collected referrals so you can payout again!</Tooltip>}>
            <span className="d-inline-block justify-content-center">
                <Button onClick={(e) => uncollectAllReferrals(e)}>
                    Reset Collected Referrals
                </Button>
            </span>
            </OverlayTrigger>
            <p>{props.testCollectedResponse}</p>
        </>
    );
}