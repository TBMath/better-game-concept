import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    const { body } = JSON.parse(event.body);  // Parse the incoming stringified body
    const {
        index, answer, hint1, hint2, hint3, 
        l1, l2, l3, l4, l5, l6, l7, l8,l9,l10
    } = JSON.parse(body); // Parse the question data

    const params = {
        TableName: "QuestionsTable",
        Item: {
            index,  // Keep it as a string
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
            l9,
            l10,

        },
    };

    try {
        await docClient.put(params).promise();

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Question created successfully"
            }),
        };
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: "Error creating question in DynamoDB",
                details: err.message,
            }),
        };
    }
};
