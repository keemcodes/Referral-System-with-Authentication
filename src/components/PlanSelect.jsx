import React from "react";


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export default function PlanSelect() {
    const data = localStorage.getItem('user-data');
    const [ userData ] = React.useState(JSON.parse(data));
  return (
    <>
        <h1>hi {userData.email} </h1>
        <CardGroup>            
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Bronze $50</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant={userData.membership_tier === 1 ? "'primary' disabled" : "primary"}>{userData.membership_tier === 1 ? "Selected" : "Select Plan"}</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Silver $100</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant={userData.membership_tier === 2 ? "'primary' disabled" : "primary"}>{userData.membership_tier === 2 ? "Selected" : "Select Plan"}</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Gold $150</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant={userData.membership_tier === 3 ? "'primary' disabled" : "primary"}>{userData.membership_tier === 3 ? "Selected" : "Select Plan"}</Button>
                </Card.Body>
            </Card>
        </CardGroup>
    </>
  );
}