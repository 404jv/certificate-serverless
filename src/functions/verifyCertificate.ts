import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from '../utils/dynamodbClient';

interface IUserCertificate {
  id: string;
  name: string;
  grade: string;
  created_at: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;

  const response = await document
    .query({
      TableName: 'users_certificates',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id
      },
    })
    .promise();

  const userCertificate = response.Items[0] as IUserCertificate;

  if (!userCertificate) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid certificate code!'
      }),
      headers: {
        "Content-type": "application/json"
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Valid certificate',
      name: userCertificate.name,
      grade: userCertificate.grade,
      date: userCertificate.created_at,
    })
  }
}