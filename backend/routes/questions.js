import express from 'express';

const question_router = express.Router();

import { createQuestion, getQuestion,getQuestionbyID, } from '../functions/questions.js';
question_router.post('/create', createQuestion);
question_router.get('/get', getQuestion);
question_router.get('/get/:id', getQuestionbyID);



export default question_router;