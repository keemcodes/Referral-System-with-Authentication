import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Payout() {
  const [totalPayout, setTotalPayout] = useState();
  const [response, setResponse] = useState();
  let navigate = useNavigate();

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
        
    }, [response])
    function payout(e) {
        e.preventDefault();
        fetch("/api/pay/payout", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((result) => {
            if (result?.raw?.code) return setResponse(result.raw.code)
            setResponse(result)
            console.log(result)
        },
        (error) => {
            console.log(error)
        })
    }

    return (
        <>
            <Alert variant='dark'>
                You currently have {totalPayout} available for payout!
            </Alert>
            <Container>
                <Row>
                    <Col>
                        <OverlayTrigger overlay={<Tooltip id="tooltip">Payment will be sent to a pregenerated Stripe account!</Tooltip>}>
                            <span className="d-inline-block justify-content-center">
                                <Button onClick={(e) => payout(e)}>
                                    Payout
                                </Button>
                            </span>
                        </OverlayTrigger>
                    </Col>
                    <Col>
                        <OverlayTrigger overlay={<Tooltip id="tooltip">If you run out of funds, click this to add $1000!</Tooltip>}>
                            <span className="d-inline-block justify-content-center">
                                <Button onClick={() => navigate("/checkout", { state: -1 })}>
                                    Add $1000
                                </Button>
                            </span>
                        </OverlayTrigger>
                        <p>{response}</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}