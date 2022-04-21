/**
 * @description Valid integration events that can be emitted.
 */
export const integrationEvents = {
  /**
   * Example of a simple custom event to emit.
   *
   * @param {Record<string, unknown>} data Object that contains data to emit
   */
  DataInserted: (data: Record<string, any> | string, eventBusName: string) => ({
    EventBusName: eventBusName,
    Source: 'datatoevents.insert',
    DetailType: 'DataInserted',
    Detail: typeof data === 'string' ? data : JSON.stringify(data)
  })
};
