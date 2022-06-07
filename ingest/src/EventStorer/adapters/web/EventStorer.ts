import { createNewDynamoRepository } from '../../infrastructure/repository/DynamoDbRepository';

/**
 * @description Event storer function.
 */
export async function handler(event: any) {
  if (!event['Records']) throw new Error('Missing records');
  const records = event['Records'];

  try {
    const dynamo = createNewDynamoRepository();

    const promises = records.map(async (record: any) => {
      const payload = record.body;
      const result = Buffer.from(payload, 'base64').toString('ascii');
      return await dynamo.updateItem(JSON.stringify(result));
    });

    await Promise.all(promises).then(() => {
      return { status: 204, body: '' };
    });
  } catch (error) {
    console.error(error);

    return { status: 500, body: '' };
  }
}
