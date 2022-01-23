import React, { useContext, useState } from "react";
import { AuthContext } from '../Auth';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function AccessForm() {

  const { setIsAuth } = useContext(AuthContext)
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
      email: "",
      password: "",
  });
  const [response, setResponse] = useState('');
  function Login(e) {
      e.preventDefault();
      setLoading(true);
      fetch("/api/auth/login", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((result) => {
          const { id, email, membership_tier, referred, referral_code } = result;
          const store = { id, email, membership_tier, referred, referral_code };
          console.log(store);
          setResponse(store);
          setIsAuth(true);
      },
      (error) => {
          setResponse("Login failed")
          setLoading(false);
          console.log(error)

      })
  }
  function Register(e) {
      e.preventDefault();
      setLoading(true);
      fetch("/api/auth/register", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((result) => {
          console.log(result)
          if (result.id === undefined) {
            setResponse("Register failed, make sure the information is valid");
            setLoading(false);
            return
          }
          const { id, email, membership_tier, referred, referral_code } = result;
          const store = { id, email, membership_tier, referred, referral_code };
          console.log(store);
          setResponse("Register success");
          setIsAuth(true);
      },
      (error) => {
          setResponse("Register failed")
          setLoading(false);
          console.log(error)

      })
  }

  function handle(e) {
      const newdata = { ...data }
      newdata[e.target.id] = e.target.value
      setData(newdata)
      console.log(newdata)
  }
  return (
      <>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={(e) => handle(e)} name='email' type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(e) => handle(e)} name='password' type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="code">
              <Form.Label>Referral code</Form.Label>
              <Form.Control onChange={(e) => handle(e)} name='code' type="code" placeholder="Enter code" />
            </Form.Group>
            <Form.Text className="text-muted">
                {response.id ? "Access Successful" : response}
            </Form.Text>
            <Row>
                <Col>
                    <Button variant="primary" type="submit" disabled={isLoading} onClick={(e) => Login(e)}>
                    {isLoading ? 'Loading…' : 'Login'}
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" type="submit" disabled={isLoading} onClick={(e) => Register(e)}>
                    {isLoading ? 'Loading…' : 'Register'}
                    </Button>
                </Col>
            </Row>

          </Form>      

      </>

  );
}