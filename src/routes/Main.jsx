import  { useContext } from 'react';
import { AuthContext } from '../Auth';
import Home from "../components/Home";
import AccessForm from "../components/AccessForm";


export default function Main() {
  const { isAuth } = useContext(AuthContext);

    return (
      <>
        <main>
          {isAuth ? (<Home />) : (<AccessForm />)}
        </main>
      </>
    );
}
