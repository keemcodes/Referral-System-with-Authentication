import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Auth";

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Main from "./routes/Main";
import Checkout from "./routes/Checkout";
import AfterPayment from "./routes/AfterPayment";




export default function App() {
  const Pages = () => {
    return(
      <>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/afterpayment" element={<AfterPayment />} />
        </Routes>
      </>
    );
  }
  return (
    <>
    <Router>
      <AuthProvider>
        <Pages />
      </AuthProvider>
    </Router>
    </>
  );
}