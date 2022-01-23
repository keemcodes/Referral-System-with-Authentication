import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';


export default function TopUpButton() {
    let navigate = useNavigate();
    return (
        <>
            <OverlayTrigger overlay={<Tooltip id="tooltip">If you run out of funds, click this to add $1000!</Tooltip>}>
            <span className="d-inline-block justify-content-center">
                <Button onClick={() => navigate("/checkout", { state: -1 })}>
                    Add $1000
                </Button>
            </span>
            </OverlayTrigger>
        </>
    );
}