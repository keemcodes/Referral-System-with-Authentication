import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from '../Auth';


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export default function PlanSelect() {
    const { email } = useContext(AuthContext);

  return (
    <>
        <h1>hi {email} </h1>
        <CardGroup>            
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Bronze $50</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Select Plan</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Silver $100</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Select Plan</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Gold $150</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Select Plan</Button>
                </Card.Body>
            </Card>
        </CardGroup>
    </>
  );
}