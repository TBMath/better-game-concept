import express from "express";
import cors from "cors";
import logRequest from "./middleware/logger.js";
import router from "./routes/index.js";
const app = express();
const port = 5000;

// Enable CORS for the frontend
app.use(cors());
app.use(logRequest);
app.use('/api', router);

app.get('/api', (req, res) => {res.json({ message: 'You have connected to the API' });});

app.use(cors());
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
