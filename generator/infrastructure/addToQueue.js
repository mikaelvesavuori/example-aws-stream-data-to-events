import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

/**
 * @description Use AWS SQS to add something to a queue.
 */
export async function addToQueue(region, queueUrl, data) {
  const client = new SQSClient({ region });
  const command = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: data,
    MessageGroupId: 'TestMessageGroup'
  });

  const response = await client.send(command);
}
