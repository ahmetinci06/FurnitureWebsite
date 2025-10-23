/**
 * Nasspay IQ Payment Integration Helper
 * 
 * This is a MOCK implementation for development and testing.
 * Replace these functions with actual Nasspay IQ API calls for production.
 */

/**
 * Initiates a payment request with Nasspay IQ
 * 
 * @param {Object} paymentData - Payment details
 * @param {number} paymentData.amount - Total amount in Turkish Lira
 * @param {Array} paymentData.items - Cart items
 * @param {Object} paymentData.customer - Customer information
 * @returns {Promise<Object>} Payment response with redirect URL
 */
export async function initiatePayment(paymentData) {
  // MOCK: Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // MOCK: Log payment data (remove in production)
  console.log('[MOCK] Nasspay Payment Initiated:', {
    amount: paymentData.amount,
    itemCount: paymentData.items?.length || 0,
    timestamp: new Date().toISOString()
  });

  // MOCK: Simulate successful response
  // In production, this will make actual API call to Nasspay IQ
  /*
  const response = await fetch('https://api.nasspay.iq/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NASS_API_KEY}`
    },
    body: JSON.stringify(paymentData)
  });
  return await response.json();
  */

  return {
    success: true,
    transaction_id: `MOCK-${Date.now()}`,
    redirect_url: '/success',
    message: 'Payment request processed successfully (MOCK)'
  };
}

/**
 * Verifies a payment transaction
 * 
 * @param {string} transactionId - Transaction ID from Nasspay
 * @returns {Promise<Object>} Verification result
 */
export async function verifyPayment(transactionId) {
  // MOCK: Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // MOCK: Always return success for testing
  return {
    success: true,
    verified: true,
    transaction_id: transactionId,
    status: 'completed',
    message: 'Payment verified successfully (MOCK)'
  };
}

/**
 * Cancels a pending payment transaction
 * 
 * @param {string} transactionId - Transaction ID to cancel
 * @returns {Promise<Object>} Cancellation result
 */
export async function cancelPayment(transactionId) {
  // MOCK: Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    success: true,
    cancelled: true,
    transaction_id: transactionId,
    message: 'Payment cancelled successfully (MOCK)'
  };
}

/**
 * Formats price to Turkish Lira currency format
 * 
 * @param {number} amount - Amount in TL
 * @returns {string} Formatted price string (e.g., "₺25,000")
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Configuration for Nasspay IQ
 * Update these values when integrating real API
 */
export const NASSPAY_CONFIG = {
  apiBaseUrl: 'https://api.nasspay.iq', // Placeholder URL
  apiKey: process.env.NASS_API_KEY || 'mock_api_key',
  environment: 'development', // Change to 'production' when ready
  currency: 'TRY',
  locale: 'tr-TR'
};
