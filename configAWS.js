require("dotenv").config();
const AWS = require("aws-sdk");

const config = new AWS.Config({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.REGION,
});

AWS.config = config;

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;
