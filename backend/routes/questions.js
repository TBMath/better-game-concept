import express from 'express';
import {getQuestion,} from '../functions/questions.js';
const question_router = express.Router();

question_router.get('/get', getQuestion);


export default question_router;