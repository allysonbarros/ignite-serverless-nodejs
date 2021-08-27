"use strict";

const { DynamoDB } = require("aws-sdk")
const { uuid } = require('uuidv4');

const db = new DynamoDB.DocumentClient()
const TableName = process.env.DYNAMODB_TABLE

module.exports.execute = async (event) => {
  const newTodo = {
    id: uuid(),
    user_id: event.pathParameters.userId,
    title: event.body.title,
    done: false,
    deadline: new Date(event.body.deadline),
  }

  await db
    .put({
      TableName,
      Item: newTodo,
    })
    .promise()

  return { statusCode: 200, body: JSON.stringify(newTodo) }
};