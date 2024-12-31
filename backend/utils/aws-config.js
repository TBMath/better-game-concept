import AWS from 'aws-sdk';
import dotenv from 'dotenv'; // Import the dotenv module
dotenv.config(); // Load environment variables from .env file
// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.ACCESSKEYID, // Use the environment variables
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: 'ap-southeast-2'
});

export default AWS // Export the configured AWS SDK