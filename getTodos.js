"use strict";

const { DynamoDB } = require("aws-sdk")

const db = new DynamoDB.DocumentClient()
const TableName = process.env.DYNAMODB_TABLE

module.exports.execute = async (event) => {
  const params = {
    ExpressionAttributeValues: {
      ':user_id': { S: event.pathParameters.userId },
    },
    KeyConditionExpression: 'user_id = :s',
    TableName: TableName
  }

  const items = await db
    .scan(params)
    .promise()

  return { statusCode: 200, body: JSON.stringify(items) }
};