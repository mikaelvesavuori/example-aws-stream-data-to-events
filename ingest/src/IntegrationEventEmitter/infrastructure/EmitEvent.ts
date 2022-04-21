import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

import { integrationEvents } from '../domain/events/IntegrationEvents';

const EVENT_BUS_NAME = process.env.EVENT_BUS_NAME;
if (!EVENT_BUS_NAME) throw new Error('Missing EVENT_BUS_NAME!');

const eventBridge = new EventBridgeClient({ region: 'eu-north-1' });

/**
 * @description Utility to emit events with AWS EventBridge library.
 *
 * @see https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_PutEvents.html
 * @see https://www.npmjs.com/package/@aws-sdk/client-eventbridge
 *
 * @param {string} eventName Name of event to emit
 * @param {Record<string, unknown>} data Object that contains data to emit
 */
export async function emitEvent(eventName: string, data: Record<string, any>) {
  // @ts-ignore
  const command = integrationEvents[eventName](data, EVENT_BUS_NAME);
  const event = new PutEventsCommand({ Entries: [command] });
  if (!event) throw new Error('No such event name!');

  return await eventBridge.send(event);
}
