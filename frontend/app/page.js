// app/page.js (Server Component with SSR)
"use client";
import React from "react";

import { useEffect, useState } from "react";

const Home = () => {
  const [message, setMessage] = useState([]);

 

  return (
    <div>
      <h1>Message from Backend:</h1>
     
    </div>
  );
};

export default Home;
