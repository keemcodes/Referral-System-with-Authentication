import React, { useState, useEffect } from "react";

import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';


export default function ReferredUsers() {
  const [referredUsers, setReferredUsers] = useState([]);
  useEffect(() => {
    fetch("/api/getReferredUsers")
        .then((res) => res.json())
        .then((result) => {
            setReferredUsers(result)
            console.log(result)
        },
        (error) => {
            console.log(error)
        })
        // .catch((r) =>
    
    }, [])

    function printTier(tier) {
        switch(tier) {
            default:
                return "None"
            case 0:
                return "None"
            case 1:
                return "Bronze"
            case 2:
                return "Silver"
            case 3:
                return "Gold"
        }        
    }

    return (
        <>
            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Click here to view everyone you referred!</Accordion.Header>
                    <Accordion.Body>
                        <p>A greyed row indicates a payed out referral</p>
                        <Table bordered hover size="sm" responsive="sm">
                            <thead>
                                <tr >
                                    <th>#</th>
                                    <th>Referred User</th>
                                    <th>Tier</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referredUsers.map((referredUser, index) => (
                                    <tr key={referredUser.id} className={''} style={{backgroundColor: referredUser.collected==0?'rgba(0, 0, 0, 0.075)':''}}>
                                        <td>{index + 1}</td>
                                        <td>{referredUser.referred_email}</td>
                                        <td>{printTier(referredUser.membership_tier)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}