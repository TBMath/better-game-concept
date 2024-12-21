import express from 'express';

const question_router = express.Router();

question_router.get('/get', (req, res) => {
    res.json({ question: 'What is the capital of France?' });
    });

export default question_router;