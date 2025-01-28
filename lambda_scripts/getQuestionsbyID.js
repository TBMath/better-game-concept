import AWS from 'aws-sdk';  // Correct import statement for mjs
const docClient = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    const questionId = event.pathParameters.id;  // This accesses the {id} parameter from the URL
    const params = {
        TableName: "QuestionsTable",
        Key: {
            index: questionId,
        },
    };

    try {
        const data = await docClient.get(params).promise();
        if (data.Item) {
            return {
                statusCode: 200,
                body: JSON.stringify(data.Item),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Question not found" }),
            };
        }
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: "Error fetching question from DynamoDB",
                details: err.message,
            }),
        };
    }
};
