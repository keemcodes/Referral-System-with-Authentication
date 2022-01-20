import React, { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';

import PlanSelect from './PlanSelect'


export default function Home() {

  return (
    <>
      <h1>Home</h1>
      <PlanSelect />
    </>
  );
}