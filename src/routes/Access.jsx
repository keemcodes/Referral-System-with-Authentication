import  { useContext } from 'react';
import { AuthContext } from '../Auth';


import Home from "../components/Home";
import AccessForm from "../components/AccessForm";

export default function Access() {
  const { isAuth, logout } = useContext(AuthContext);
  console.log("App auth: ", isAuth);
    return (
      <>
        <main>
          {isAuth ? (<Home />) : (<AccessForm />)}
        </main>
      </>
    );
}
