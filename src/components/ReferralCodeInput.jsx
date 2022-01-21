import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export default function PlanSelect(props) {

    let navigate = useNavigate();
    return (
        <>
            <h1>hi {props.userData?.email} </h1>
            <CardGroup>            
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Bronze $50</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant={props.userData?.membership_tier === 1 ? "'primary' disabled" : "primary"} onClick={() => navigate("/checkout", { state: 1 })}>
                            {props.userData?.membership_tier === 1 ? "Selected" : "Select Plan"}
                        </Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Silver $100</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant={props.userData?.membership_tier === 2 ? "'primary' disabled" : "primary"} onClick={() => navigate("/checkout", { state: 2 })} >
                            {props.userData?.membership_tier === 2 ? "Selected" : "Select Plan"}
                        </Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Gold $150</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant={props.userData?.membership_tier === 3 ? "'primary' disabled" : "primary"} onClick={() => navigate("/checkout", { state: 3 })}>
                            {props.userData?.membership_tier === 3 ? "Selected" : "Select Plan"}
                        </Button>
                    </Card.Body>
                </Card>
            </CardGroup>
        </>
    );
}