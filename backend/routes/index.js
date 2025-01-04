import express from 'express';
import question_router from './questions.js';
import cors from 'cors';
const router = express.Router();

// Use the user-related routes under '/users'
router.use('/questions', question_router);
// Enable CORS for all routes
router.use(cors({ origin: 'http://localhost:3001' }));

router.get('/questions', (req, res) => {
    res.json({ message: 'You have connected to the questions API' });
    });

export default router;
