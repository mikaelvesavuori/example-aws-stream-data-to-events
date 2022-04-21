import { FirehoseClient, PutRecordCommand } from '@aws-sdk/client-firehose';

/**
 * @description Put batched data records in Kinesis Firehose.
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-firehose/index.html
 *
 * @param {Object} inputData Input data object
 *
 */
export async function putRecordInKinesisFirehose(region, streamName, inputData) {
  try {
    const client = new FirehoseClient({
      region
    });

    const encodedData = btoa(JSON.stringify(inputData));
    const bufferedData = Buffer.from(encodedData, 'base64');

    /**
     * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-firehose/classes/putrecordbatchcommand.html
     */
    const command = new PutRecordCommand({
      DeliveryStreamName: streamName,
      PartitionKey: 'something-here',
      Record: {
        Data: bufferedData
      }
    });

    const data = await client.send(command);
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    console.log('Kinesis process finished');
  }
}
