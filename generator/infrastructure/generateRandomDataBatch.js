import {
  generateOrderData,
  generateDeviceData,
  generateInventoryData,
  generateSecurityData
} from './dataGenerators.js';

/**
 * @description Generates test data that is taken from a random batch (order, device, inventory, security).
 */
export function generateRandomDataBatch() {
  const batchNumber = (Math.random() * 3).toFixed();

  if (batchNumber === '0') return generateOrderData();
  if (batchNumber === '1') return generateDeviceData();
  if (batchNumber === '2') return generateInventoryData();
  if (batchNumber === '3') return generateSecurityData();

  // Fallback
  return generateSecurityData();
}
