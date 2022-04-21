import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

export async function addToQueue(region: string, queueUrl: string, data: any) {
  /**
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sqs/index.html
   */
  const client = new SQSClient({ region });
  const command = new SendMessageCommand({
    QueueUrl: queueUrl,
    // The minimum size is one character. The maximum size is 256 KB. A message can include only XML, JSON, and unformatted text.
    MessageBody: data,
    /**
     * This parameter applies only to FIFO (first-in-first-out) queues.
     * @see https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/using-messagegroupid-property.html
     */
    MessageGroupId: 'TestMessageGroup'
  });

  return await client.send(command);
}
