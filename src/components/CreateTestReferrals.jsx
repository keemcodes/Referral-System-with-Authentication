import React, { useState, useEffect } from "react";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';


export default function CreateTestReferrals(props) {

    function addTestReferredUsers(e) {
        e.preventDefault();
        fetch("/api/addTestReferredUsers", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((result) => {
            props.updateTestReferralsResponse((result) => " " + result)
            console.log(result)
        },
        (error) => {
            console.log(error)
        })
    }

    return (
        <>
            <OverlayTrigger overlay={<Tooltip id="tooltip">An account will refer you and subscribe with a random tier!</Tooltip>}>
            <span className="d-inline-block justify-content-center">
                <Button onClick={(e) => addTestReferredUsers(e)}>
                    Add Test Users
                </Button>
            </span>
            </OverlayTrigger>
            <p>{props.testReferralsResponse}</p>
        </>
    );
}