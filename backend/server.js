// backend/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

// Enable CORS for the frontend

app.use(cors({
    origin: "http://localhost:3000", // The frontend's URL
  }));
// Example API route
app.get("/api", (req, res) => {
  res.json({ message: "this is a test" });
});


app.listen(5000, '0.0.0.0', () => {
  console.log('Backend running at http://0.0.0.0:5000');
});
