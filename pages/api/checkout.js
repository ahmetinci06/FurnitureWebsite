import { initiatePayment } from '../../utils/nasspay'

/**
 * Checkout API Endpoint
 * Handles payment initiation with Nasspay IQ (currently mock)
 * 
 * POST /api/checkout
 * Body: { amount, items, customer }
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    })
  }

  try {
    const { amount, items, customer } = req.body

    // Validate request data
    if (!amount || !items || !customer) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: amount, items, or customer'
      })
    }

    if (items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      })
    }

    // Validate customer information
    if (!customer.fullName || !customer.email || !customer.phone || !customer.address) {
      return res.status(400).json({
        success: false,
        message: 'Incomplete customer information'
      })
    }

    // Log checkout attempt (for development)
    console.log('=== CHECKOUT REQUEST ===')
    console.log('Amount:', amount)
    console.log('Items count:', items.length)
    console.log('Customer:', customer.email)
    console.log('========================')

    // Initiate payment with Nasspay IQ (currently mock)
    const paymentResult = await initiatePayment({
      amount,
      items,
      customer,
      metadata: {
        timestamp: new Date().toISOString(),
        source: 'mobilya-web'
      }
    })

    // Return payment result
    if (paymentResult.success) {
      return res.status(200).json({
        success: true,
        transaction_id: paymentResult.transaction_id,
        redirect_url: paymentResult.redirect_url,
        message: 'Payment initiated successfully'
      })
    } else {
      return res.status(400).json({
        success: false,
        message: paymentResult.message || 'Payment initiation failed'
      })
    }

  } catch (error) {
    console.error('Checkout API Error:', error)
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error during checkout'
    })
  }
}
