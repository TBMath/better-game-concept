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
  res.json({ message: "Hello from Express!j" });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
