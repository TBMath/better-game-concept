// index.mjs
import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    const params = {
        TableName: "QuestionsTable", // Ensure the table name is correct
    };

    try {
        const data = await docClient.scan(params).promise();
        
        // Check if there are items returned and handle accordingly
        if (!data.Items || data.Items.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'No items found in the table.',
                }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        };
    } catch (err) {
        console.error("Error fetching questions:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Error fetching questions from DynamoDB",
                details: err.message,
            }),
        };
    }
};

