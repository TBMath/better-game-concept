var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand,GetCommand,PutCommand,DeleteCommand,UpdateCommand } = require("@aws-sdk/lib-dynamodb");
AWS.config.update({
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-2', 
});
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

async function getQuestions(_, res) {
  const params = {
    TableName: 'QuestionsTable',
    
  };
  const questions = await docClient.send(new ScanCommand(params));
  return res.json(questions.Items);
}
async function getQuestionsbyID(req, res) {
  const params = {
    TableName: 'QuestionsTable',
    Key: {
      index: req.params.id
    }
  };
  const questions = await docClient.send(new GetCommand(params));
  return res.json(questions.Item);
}
async function createQuestion(req, res) {
  try {
    // List of required fields
    const requiredFields = [
      'index', 'answer', 'hint1', 'hint2', 'hint3',
      'l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10'
    ];

    // Find missing fields
    const missingFields = requiredFields.filter(field => !req.body[field]);

    // If there are missing fields, return an error
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        missingFields
      });
    }

    // Construct the parameters for the PutCommand
    const params = {
      TableName: 'QuestionsTable',
      Item: {
        index: req.body.index,
        answer: req.body.answer,
        hint1: req.body.hint1,
        hint2: req.body.hint2,
        hint3: req.body.hint3,
        l1: req.body.l1,
        l2: req.body.l2,
        l3: req.body.l3,
        l4: req.body.l4,
        l5: req.body.l5,
        l6: req.body.l6,
        l7: req.body.l7,
        l8: req.body.l8,
        l9: req.body.l9,
        l10: req.body.l10,
      },
    };

    // Sending the command to DynamoDB
    const result = await docClient.send(new PutCommand(params));

    // Sending the result back to the client
    return res.status(201).json({ message: 'Question created successfully', result });
  } catch (error) {
    console.error('Error creating question:', error);

    // Sending the error back to the client
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
async function deleteQuestionbyID(req, res) {
  const params = {
    TableName: 'QuestionsTable',
    Key: {
      index: req.params.id
    }
  };
  const questions = await docClient.send(new DeleteCommand(params));
  return res.send('Sucessfully deleted');
}
async function deleteQuestionbyAnswer(req, res) {
  const params = {
    TableName: 'QuestionsTable',
    Key: {
      answer: req.params.id
    }
  };
  const questions = await docClient.send(new DeleteCommand(params));
  return res.json(questions.Item);
}

async function editQuestion(req, res) {
  try {
    // List of required fields
    const requiredFields = [
      'index', 'answer', 'hint1', 'hint2', 'hint3',
      'l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10'
    ];

    // Find missing or invalid fields
    const missingFields = requiredFields.filter(field => !req.body[field] || req.body[field].trim() === '');

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing or invalid required fields',
        missingFields,
      });
    }

    const {
      index, answer, hint1, hint2, hint3,
      l1, l2, l3, l4, l5, l6, l7, l8, l9, l10,
    } = req.body;

    // Construct the update expression and attribute values
    const updateExpression = 'SET answer = :answer, hint1 = :hint1, hint2 = :hint2, hint3 = :hint3, l1 = :l1, l2 = :l2, l3 = :l3, l4 = :l4, l5 = :l5, l6 = :l6, l7 = :l7, l8 = :l8, l9 = :l9, l10 = :l10';
    const expressionAttributeValues = {
      ':answer': answer,
      ':hint1': hint1,
      ':hint2': hint2,
      ':hint3': hint3,
      ':l1': l1, ':l2': l2, ':l3': l3, ':l4': l4, ':l5': l5,
      ':l6': l6, ':l7': l7, ':l8': l8, ':l9': l9, ':l10': l10,
    };

    const params = {
      TableName: 'QuestionsTable',
      Key: { index }, // Primary key to find the item
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'UPDATED_NEW', // Returns the updated attributes
    };

    // Send the UpdateCommand to DynamoDB
    const result = await docClient.send(new UpdateCommand(params));

    return res.status(200).json({
      message: 'Question updated successfully',
      updatedAttributes: result.Attributes,
    });
  } catch (error) {
    console.error('Error updating question:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

router.get('/', getQuestions);
router.get('/:id', getQuestionsbyID);
router.post('/', createQuestion);
router.delete('/:id', deleteQuestionbyID);
router.delete('answer/:id', deleteQuestionbyAnswer);
router.put('/', editQuestion);
module.exports = router;
