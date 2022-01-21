import Payment from "../components/Payment";
import { useLocation } from 'react-router-dom';

export default function Checkout() {
  const { state } = useLocation();
    return (
      <>
        <main>
            <Payment tier={state}/>
        </main>
      </>
    );
}
