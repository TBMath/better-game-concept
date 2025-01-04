import AWS from '../utils/aws-config.js'; // Import the AWS SDK
import express from 'express'; // Import express

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

const docClient = new AWS.DynamoDB.DocumentClient();

async function getQuestion(_, res) {
    const params = {
        TableName: "QuestionsTable", // Ensure the table name is correct
    };

    try {
        const data = await docClient.scan(params).promise();
        res.status(200).send(data.Items);
    } catch (err) {
        res.status(400).send({
            error: "Error fetching questions from DynamoDB",
            details: err.message,
        });
    }
}

async function getQuestionbyID(req, res) {
    const params = {
        TableName: "QuestionsTable",
        Key: {
            index: req.params.id,
        },
    };

    try {
        const data = await docClient.get(params).promise();
        if (data.Item) {
            res.status(200).send(data.Item);
        } else {
            res.status(404).send({ error: "Question not found" });
        }
    } catch (err) {
        res.status(400).send({
            error: "Error fetching question from DynamoDB",
            details: err.message,
        });
    }
}

async function createQuestion(req, res) {
    console.log(req.body)
    const {index, answer, hint1, hint2, hint3, l1, l2, l3, l4, l5,l6, l7, l8} = req.body;

    

    const params = {
        TableName: "QuestionsTable",
        Item: {
            index,
            answer,
            hint1,
            hint2,
            hint3,
            l1,
            l2,
            l3,
            l4,
            l5,
            l6,
            l7,
            l8,
           
        },
    };

    try {
        await docClient.put(params).promise();
        res.status(201).send({ message: "Question created successfully" });
    } catch (err) {
        res.status(400).send({
            error: "Error creating question in DynamoDB",
            details: err.message,
        });
    }
}

export { createQuestion, getQuestion, getQuestionbyID };