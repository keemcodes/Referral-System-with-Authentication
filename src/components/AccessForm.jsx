import React, { useContext, useState } from "react";
import { AuthContext } from '../Auth';

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
          setResponse(result)
          setIsAuth(true);
          console.log(result)
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
          <div className="access-form">
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
          </div>

      </>

  );
}