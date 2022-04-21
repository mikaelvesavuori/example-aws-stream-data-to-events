import { addToQueue } from '../../infrastructure/addToQueue';

const region = 'eu-north-1';
const queueUrl = 'https://sqs.eu-north-1.amazonaws.com/123412341234/data-events-queue.fifo';

/**
 * @description Function that transforms data coming into Kinesis Firehose delivery stream.
 */
export async function handler(event: any): Promise<any> {
  try {
    if (!event.records) throw new Error('Not an ingestion event');

    const promises = event.records.map(async (record: any) => {
      const recordId = record.recordId;
      const payload = record.data;
      const result = Buffer.from(payload, 'base64').toString('ascii');
      const data = Buffer.from(result, 'utf8').toString('base64');

      await addToQueue(region, queueUrl, JSON.stringify(data));

      return {
        result: 'Ok',
        recordId,
        data
      };
    });

    const output = await Promise.all(promises);

    console.log(`Processing successful for ${output?.length} records`);

    return { records: output };
  } catch (error: any) {
    const output = {
      recordId: event.id,
      result: 'Dropped',
      data: 'Dropped'
    };

    console.log(`Processed a dropped record...`);

    return { records: [output] };
  }
}
