import express from 'express';
import {getQuestion, getQuestionbyIndex, createQuestion} from '../functions/questions.js';
const question_router = express.Router();

question_router.get('/get', getQuestion);
question_router.get('/get/:id',getQuestionbyIndex);
question_router.post('/post', createQuestion);

export default question_router;