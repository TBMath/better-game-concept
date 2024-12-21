import clientPromise from '../utils/mongodb.js';

async function getQuestion(_, res) {
  const client = await clientPromise;
  const db = client.db("questions");
  const questions = db.collection("the questions");
  const result = await questions.find({}).toArray();
  return res.json(result);
}

async function getQuestionbyIndex(req, res) {
  const client = await clientPromise;
  const db = client.db("questions");
  const questions = db.collection("the questions");
  var result = await questions.findOne({ index: parseInt(req.params.id) });
  if (result == null) {
    result = { message: "No question with that index" };
  }
  return res.json(result);
}

async function createQuestion(req, res) {
  const client = await clientPromise;
  const db = client.db("questions");
  const questions = db.collection("the questions");
  const result = await questions.insertOne(req.body);
 
  
  return res.json(result);
  
}

export { getQuestion, getQuestionbyIndex, createQuestion };