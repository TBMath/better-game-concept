// app/page.js (Server Component with SSR)
"use client";
import React from "react";

import { useEffect, useState } from "react";

const Home = () => {
  const [message, setMessage] = useState([]);
  const [id, setId] = useState(0);
  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch(`/api/questions/get/${id}`);
      const data = await response.json();
      setMessage(data); // Assuming the response contains a 'question' field
    };

    fetchMessage();
  }, [id]);

  return (
    <div>
      <h1>Message from Backend:</h1>
      {<div>{message}</div>}
    </div>
  );
};

export default Home;
