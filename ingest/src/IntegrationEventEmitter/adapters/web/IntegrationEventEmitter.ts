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

      const newImageString = record?.['dynamodb']?.['NewImage']?.['key']?.['S'];
      const data =
        newImageString && typeof newImageString === 'string' ? JSON.parse(newImageString) : '';
      if (!data) throw new Error('Missing data to parse!');

      return JSON.parse(data);
    });

    const promises = records.map(
      async (record: Record<string, any>) => await emitEvent('DataInserted', record)
    );

    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
}
