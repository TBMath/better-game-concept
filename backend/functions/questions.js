import AWS from '../utils/aws-config.js'// Import the AWS SDK
const docClient = new AWS.DynamoDB.DocumentClient();

async function getQuestion(_, res) {
    const params = {
        TableName: "QuestionsTable", // Ensure the table name is correct
    };

    try {
        // Using await to handle the asynchronous scan operation
        const data = await docClient.scan(params).promise();
        res.status(200).send(data); // Send the retrieved data as the response
    } catch (err) {
        // Handle any errors from the scan operation
        res.status(400).send({
            error: "Error fetching questions from DynamoDB",
            details: err.message, // Return the error details in the response
        });
    }
}
async function createQuestion(req, res) {
    const { question, answer } = req.body; // Extract the question and answer from the request body
    const params = {
        TableName: "QuestionsTable", // Ensure the table name is correct
        Item: {
            index: index,
            question_id: question_id,
            answer: answer,
            hint1: hint1,
            hint2: hint2,
            hint3: hint3,
        },
    };

    try {
        // Using await to handle the asynchronous put operation
        await docClient.put(params).promise();
        res.status(201).send({ message: "Question created successfully" }); // Send a success message
    } catch (err) {
        // Handle any errors from the put operation
        res.status(400).send({
            error: "Error creating question in DynamoDB",
            details: err.message, // Return the error details in the response
        });
    }
}

export { getQuestion };
