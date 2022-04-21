import { generateRandomDataBatch } from './infrastructure/generateRandomDataBatch.js';
import { putRecordInKinesisFirehose } from './infrastructure/putRecordInKinesisFirehose.js';
import { addToQueue } from './infrastructure/addToQueue.js';
import { config } from './config.js';

/**
 * @description Generate test data and put data record in Kinesis Firehose or SQS.
 */
async function generateTestData(system) {
  const { region, streamName, messageCount, queueUrl } = config;

  // Get batch of data to test.
  const dataBatch = (() => {
    let batch = [];
    for (let count = 1; count <= messageCount; count++) batch.push(generateRandomDataBatch());
    return batch;
  })();

  // Create async promises from all data cases.
  const promises = dataBatch.map(async (data) => {
    /**
     * Use Kinesis Firehose.
     */
    if (system.toLowerCase() === 'kinesis')
      await putRecordInKinesisFirehose(region, streamName, data);
    else if (system.toLowerCase() === 'sqs') {
      /**
       * Use SQS.
       * Needs fixing since records are some kind of garbled strings.
       */
      const stringifiedData = JSON.stringify(data);
      const base64Data = Buffer.from(stringifiedData, 'base64').toString('ascii');
      const bufferedData = Buffer.from(base64Data, 'utf8').toString('base64');
      await addToQueue(region, queueUrl, bufferedData);
    } else {
      console.error('Unknown system... Please use either "kinesis" or "sqs"!');
    }
  });

  // Run all promises.
  return Promise.all(promises);
}

generateTestData('kinesis');
