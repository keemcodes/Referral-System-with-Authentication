import React, { useState, useEffect } from "react";

import Container from 'react-bootstrap/Container';        
import Row from 'react-bootstrap/Row';        
import Col from 'react-bootstrap/Col';       
import Alert from 'react-bootstrap/Alert';       


export default function TotalPayout(props) {
  const [totalPayout, setTotalPayout] = useState('');

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
    
    }, [props.response, props.testReferralsResponse, props.testCollectedResponse])


    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Alert variant='dark'>
                            You currently have {totalPayout} available for payout!
                        </Alert>
                    </Col>
                </Row>
            </Container>
        </>
    );
}