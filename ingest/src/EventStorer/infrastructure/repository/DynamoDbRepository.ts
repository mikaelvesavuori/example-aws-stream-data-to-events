import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const REGION = process.env.REGION;
const TABLE_NAME = process.env.TABLE_NAME;
if (!REGION || !TABLE_NAME) throw new Error('Missing REGION and/or TABLE_NAME!');

const dynamoDb = new DynamoDBClient({
  region: process.env.REGION
});

/**
 * @description Factory function to create a DynamoDB repository.
 */
export function createNewDynamoRepository() {
  return new DynamoRepository();
}

/**
 * @description Concrete implementation of DynamoDB repository.
 * @see https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-table-read-write.html
 */
class DynamoRepository {
  /**
   * @description Create or update item.
   * @returns {void}
   */
  async updateItem(data: any) {
    try {
      // Set up required fields
      const params = {
        TableName: TABLE_NAME,
        Item: {
          key: { S: `${Date.now().toString()}` },
          value: { S: JSON.stringify(data) }
        }
      };

      await dynamoDb.send(new PutItemCommand(params));
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      console.log('Done');
    }
  }
}
