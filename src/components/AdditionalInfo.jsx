import React, { useState, useEffect } from "react";

import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
// import Table from 'react-bootstrap/Table';


export default function AdditionalInfo() {
    return (
        <>
            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Click here to view additional information about this system!</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup>
                            <ListGroup.Item>
                                Payouts go to a <a href='https://dashboard.stripe.com/test/connect/accounts/overview'>Stripe Connect</a> account generated on your behalf during registration. Please note that test accounts made by "Add Test Users" don't have a Stripe Connect account attached. You could log into them, but the payout feature will not work on those accounts
                                </ListGroup.Item>
                            <ListGroup.Item>
                                If you want to view the <a href='https://dashboard.stripe.com/test/connect/accounts/overview'>Stripe Connect</a> account attached to your email, hit the setting wheel next to "Account" and set it to email. View screenshot below
                                <img src="/usethis.png" alt="email option on stripe dashboard" />
                            </ListGroup.Item>
                            <ListGroup.Item>Sometimes the main test account runs out of $$$ for payouts. If that's the case, use the "Add $1000" button with the magic card information to add money to the main account.</ListGroup.Item>
                            <ListGroup.Item>"Add Test User" will add a single user with a random subscription tier. The user will use your referral code when registering.</ListGroup.Item>
                            <ListGroup.Item>You can test the payout feature multiple times by using the "Reset Collected Referrals" button.</ListGroup.Item>
                            <ListGroup.Item>If a user subscribes to a tier with your referral code, you will receive 10% of the price for that tier. Example, if they subscribe to silver, you will receive $10.</ListGroup.Item>
                            <ListGroup.Item>Per the requirements of this project, you can only use a referral code on the initial registration of your account. Make sure the referral code you're using is in set on another account.</ListGroup.Item>
                            <ListGroup.Item>A good way to test the referral system is to set your referral code at the top. Log out, register a new account using the referral code you set. Subscribe to a tier using the magic card, log out, log back into your original account. You will see your dummy account listed in the referred users accordion.</ListGroup.Item>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}