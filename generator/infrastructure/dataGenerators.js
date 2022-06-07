/**
 * @example
 * @description Order data.
 * @see https://www.ibm.com/docs/en/datapower-gateway/7.5.0?topic=json-examples
 */
 export function generateOrderData() {
  const sku = Math.floor(Math.random() * 1000);

  return {
    name: 'John Smith',
    sku: `${sku}`,
    price: 23.95,
    shipTo: {
      name: 'Jane Smith',
      address: '123 Maple Street',
      city: 'Pretendville',
      state: 'NY',
      zip: '12345'
    },
    billTo: {
      name: 'John Smith',
      address: '123 Maple Street',
      city: 'Pretendville',
      state: 'NY',
      zip: '12345'
    }
  };
}

/**
 * @example
 * @description Device data demo.
 * @see https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-simple-example.html
 */
export function generateDeviceData() {
  const readingId = Math.floor(Math.random() * 1000);

  return {
    motorid: 'Fulton-A32',
    sensorData: {
      readingId: `${readingId}`,
      pressure: 23,
      temperature: 47
    }
  };
}

/**
 * @example
 * @description Inventory file in JSON format.
 * @see https://aws.amazon.com/blogs/awsforsap/maintain-an-sap-landscape-inventory-with-aws-systems-manager-and-amazon-athena/
 */
export function generateInventoryData() {
  const id = Math.floor(Math.random() * 1000);

  return {
    SchemaVersion: '1.0',
    TypeName: 'Custom:SAPInstanceList',
    Id: `${id}`,
    Content: [
      {
        SID: 'SC3',
        SystemNumber: '02',
        VirtualHostname: 'sc3gw',
        InstanceName: 'G02'
      },
      {
        SID: 'SC2',
        SystemNumber: '01',
        VirtualHostname: 'sc2wd',
        InstanceName: 'W01'
      },
      {
        SID: 'SC1',
        SystemNumber: '10',
        VirtualHostname: 'sc1ers',
        InstanceName: 'ERS10'
      }
    ]
  };
}

/**
 * @example
 * @description Security Hub Insight Results.
 * @see https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-event-formats.html
 */
export function generateSecurityData() {
  const something = Math.floor(Math.random() * 1000);

  return {
    version: '0',
    something: `${something}`,
    id: '1a1111a1-b22b-3c33-444d-5555e5ee5555',
    'detail-type': 'Security Hub Insight Results',
    source: 'aws.securityhub',
    account: '111122223333',
    time: '2017-12-22T18:43:48Z',
    region: 'us-west-1',
    resources: [
      'arn:aws:securityhub:us-west-1:111122223333::product/aws/macie:us-west-1:222233334444:test/trigger/1ec9cf700ef6be062b19584e0b7d84ec/alert/f2893b211841'
    ],
    detail: {
      actionName: 'name of the action',
      actionDescription: 'description of the action',
      insightArn: 'ARN of the insight',
      insightName: 'Name of the insight',
      resultType: 'ResourceAwsIamAccessKeyUserName',
      'number of results': 'number of results, max of 100',
      insightResults: [{ 'result 1': 5 }, { 'result 2': 6 }]
    }
  };
}
