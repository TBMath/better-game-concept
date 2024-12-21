import express from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
const app = express();
const port = 443;

// Enable CORS for the frontend
app.use(cors());

// Example API route
app.get("/api", (_, res) => {
  res.json({ message: "your a genius" });
});

// SSL certificate and key
const options = {
  key: fs.readFileSync("private.key"),
  cert: fs.readFileSync("certificate.crt")
};

https.createServer(options, app).listen(port, '0.0.0.0', () => {
  console.log(`Backend running at https://0.0.0.0:${port}`);
});
