import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
    accessKeyId: 'AKIA4T4OCBRAWAJSPPIL',
    secretAccessKey: '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',
    region: 'ap-southeast-2'
});

export default AWS // Export the configured AWS SDK