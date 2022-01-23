import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Auth";

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Main from "./routes/Main";
import Checkout from "./routes/Checkout";
import PlanSelection from "./routes/PlanSelection";
import AfterPayment from "./routes/AfterPayment";




export default function App() {
  const Pages = () => {
    return(
      <>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/plan" element={<PlanSelection />} />
          <Route path="/afterpayment" element={<AfterPayment />} />
          {/* <PrivateRoute path="/admin" element={<AdminRoute />} component={AdminRoute} /> */}
          {/* EOD COMMIT 1/19/2022 */}
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