import express from 'express';
import question_router from './questions.js';
const router = express.Router();

// Use the user-related routes under '/users'
router.use('/questions', question_router);
router.get('/questions', (req, res) => {
    res.json({ message: 'You have connected to the questions API' });
    });

export default router;
