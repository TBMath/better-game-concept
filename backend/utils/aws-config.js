import AWS from 'aws-sdk';

// Import the dotenv module
 // Load environment variables from .env file
// Configure AWS SDK
AWS.config.update({
    accessKeyId: 'AKIA4T4OCBRAS6OUPJWO', // Use the environment variables
    secretAccessKey: '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',
    region: 'ap-southeast-2'
});

export default AWS // Export the configured AWS SDK