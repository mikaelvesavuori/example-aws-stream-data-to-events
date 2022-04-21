import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * @description Function that responds on a given EventBridge rule.
 */
export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    console.log(event);

    return {
      statusCode: 200,
      body: JSON.stringify('Hey!')
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    };
  }
}
