import React from "react";

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
            props.updateTestCollectedResponse((result) => " " + result)
            console.log(result)
        },
        (error) => {
            console.log(error)
        })
    }

    return (
        <>
            <OverlayTrigger overlay={<Tooltip id="tooltip">Reset all collected referrals so you can payout again!</Tooltip>}>
                <Button onClick={(e) => uncollectAllReferrals(e)}>
                    Reset Collected Referrals
                </Button>
            </OverlayTrigger>
            <p>{props.testCollectedResponse}</p>
        </>
    );
}