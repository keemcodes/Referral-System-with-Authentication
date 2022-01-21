import React, { useEffect, useState } from "react";

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default function ReferralCodeInput(props) {
    const [data, setData] = useState({
        code: "",
    });
    // console.log(data)
    const [response, setResponse] = useState('');
    useEffect(() => {
        setData({ code: props.userData?.referral_code});
     }, [props.userData?.referral_code])
    function submit(e) {
        e.preventDefault();
        fetch("/api/updateRefCode", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((result) => {
            setResponse(result)
            console.log(result)
        },
        (error) => {
            console.log(error)
        })
    }
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
    return (
        <>
            <Form >                
                <InputGroup className="mb-3">
                    <FormControl
                    defaultValue={props.userData?.referral_code}
                    aria-label="Referral code"
                    aria-describedby="basic-addon2"
                    name='code'
                    onChange={(e) => handle(e)}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={(e) => submit(e)}>
                    Save
                    </Button>
                </InputGroup>      
                <Form.Text className="text-muted">
                    {response? response : ''}
                </Form.Text>
            </Form>
        </>
    );
}