// app/page.js (Server Component with SSR)
import React from 'react';

async function fetchMessage() {
  const response = await fetch('http://ec2-3-107-189-224.ap-southeast-2.compute.amazonaws.com/api/questions/');
  const data = await response.json();
  return data.message; // Assuming the response contains a 'question' field
}

const Home = async () => {
  const message = await fetchMessage(); // This runs on the server

  return (
    <div>
      <h1>Message from Backend: {message}</h1>
    </div>
  );
};

export default Home;
