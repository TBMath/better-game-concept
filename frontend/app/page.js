// frontend/pages/index.js
'use client'
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState('loading...');
  useEffect(() => {
    setLoading('loading...');
    // Direct API call to the backend
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
      setLoading('');
  }, []);

  return (
    <div>
      <h1>Message from Backend: {message}{loading}</h1>
    </div>
  );
}