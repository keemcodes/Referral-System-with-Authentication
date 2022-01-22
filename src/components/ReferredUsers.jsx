import React, { useState, useEffect } from "react";

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
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Collected</th>
                    <th>Referred User</th>
                    <th>Tier</th>
                </tr>
            </thead>
            <tbody>
                {referredUsers.map((referredUser, index) => (
                    <tr key={referredUser.id} className={''}>
                        <td>{index + 1}</td>
                        <td>{referredUser.collected===0?'Yes':'No'}</td>
                        <td>{referredUser.referred_email}</td>
                        <td>{printTier(referredUser.membership_tier)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    );
}