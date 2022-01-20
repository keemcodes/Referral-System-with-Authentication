import React, { useContext, useState } from "react";
import { AuthContext } from '../Auth';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AccessForm() {

  const { setIsAuth } = useContext(AuthContext)
  const [data, setData] = useState({
      email: "",
      password: "",
  });
  const [response, setResponse] = useState('');
  function submit(e) {
      e.preventDefault();
      fetch("/api/auth/login", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((result) => {
          const { id, email, membership_tier, referred, referral_code } = result;
          const store = { id, email, membership_tier, referred, referral_code };
          setResponse(store);
          setIsAuth(true);
          localStorage.setItem('user-data', JSON.stringify(store));
          console.log(store);
      },
      (error) => {
          setResponse("Login failed")
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
          <Form onSubmit={(e) => submit(e)}>
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
            <Form.Group className="mb-3" controlId="checkbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Form.Text className="text-muted">
                {response.id ? "Access Successful" : response}
            </Form.Text>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>      
          {/* <div className="access-form">
              <div className="access-form-header">
                  <h2>Login</h2>
              </div>
              <form onSubmit={(e) => submit(e)}>
                  <label htmlFor="name">Email</label>
                  <div className="input-icon-wrap">
                      <input onChange={(e) => handle(e)} id='email' name='email' placeholder='' type="text" value={data.email}/>
                  </div>
                  <label htmlFor="email">Password</label>
                  <div className="input-icon-wrap">
                      <input onChange={(e) => handle(e)} id='password' name='password' placeholder='' type="password" value={data.password}/>
                  </div>
                  <input type="submit" value="Login" />
                  <div className="success-message">
                      <p>{response.id ? "Access Successful" : response}</p>
                  </div>
              </form>
          </div> */}

      </>

  );
}