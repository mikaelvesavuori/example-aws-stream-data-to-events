import { APIGatewayProxyEvent } from 'aws-lambda';

import { emitEvent } from '../../infrastructure/EmitEvent';

/**
 * @description DynamoDB trigger function.
 * @see https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html
 *
 * @param {Object} event Lambda event
 */
export async function handler(event: APIGatewayProxyEvent): Promise<void> {
  try {
    // @ts-ignore
    const records = event['Records'].map((record: Record<string, any>) => {
      const eventId = record['eventID'];
      const eventName = record['eventName'].toUpperCase();
      console.log(`Event ID is ${eventId} and event name/type is ${eventName}`);
      if (eventName === 'REMOVE') return;

      const value = record?.['dynamodb']?.['NewImage']?.['value'];

      if (!value) {
        console.log('Missing value!');
        return;
      }

      if (isJsonString(value)) return JSON.parse(value);
      return value;
    });

    const promises = records.map(
      async (record: Record<string, any>): Promise<any> => await emitEvent('DataInserted', record)
    );

    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
}

const isJsonString = (str: string): Record<string, unknown> | boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
