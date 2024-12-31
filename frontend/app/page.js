// app/page.js (Server Component with SSR)
'use client'
import React from 'react';

import { useEffect, useState } from 'react';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch('/api');
      const data = await response.json();
      setMessage(data.message); // Assuming the response contains a 'question' field
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Message from Backend: {message}</h1>
      
    </div>
  );
};

export default Home;
