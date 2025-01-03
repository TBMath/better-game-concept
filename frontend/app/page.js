// app/page.js (Server Component with SSR)
'use client'
import React from 'react';

import { useEffect, useState } from 'react';

const Home = () => {
  const [message, setMessage] = useState([]);
  
  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch('/api/questions/get');
      const data = await response.json();
      setMessage(data.Items); // Assuming the response contains a 'question' field
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Message from Backend:</h1>
      {message.length > 0 && (
        <div>{message[0].answer}</div>
      )}
     
      
    </div>
  );
};

export default Home;
