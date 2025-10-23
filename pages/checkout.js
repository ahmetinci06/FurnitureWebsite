import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { formatPrice } from '../utils/nasspay'
import { getCart, calculateTotal, clearCart } from '../utils/cart'

/**
 * Checkout Page
 * Handles customer information and payment initiation
 */
export default function Checkout() {
  const router = useRouter()
  const [cart, setCart] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  })

  // Load cart on mount
  useEffect(() => {
    const currentCart = getCart()
    
    if (currentCart.length === 0) {
      router.push('/cart')
    } else {
      setCart(currentCart)
    }
  }, [router])

  // Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('') // Clear error on input change
  }

  // Validate form
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Lütfen ad soyad giriniz')
      return false
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Lütfen geçerli bir e-posta adresi giriniz')
      return false
    }
    if (!formData.phone.trim()) {
      setError('Lütfen telefon numarası giriniz')
      return false
    }
    if (!formData.address.trim()) {
      setError('Lütfen adres giriniz')
      return false
    }
    if (!formData.city.trim()) {
      setError('Lütfen şehir giriniz')
      return false
    }
    return true
  }

  // Handle checkout submission
  const handleCheckout = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    if (cart.length === 0) {
      setError('Sepetiniz boş')
      return
    }

    setIsLoading(true)

    try {
      // Prepare payment data
      const paymentData = {
        amount: calculateTotal(cart),
        items: cart,
        customer: formData
      }

      // Call checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      })

      const result = await response.json()

      if (result.success) {
        // Clear cart after successful checkout
        clearCart()
        
        // Redirect to success page
        router.push(result.redirect_url || '/success')
      } else {
        setError(result.message || 'Ödeme işlemi başarısız oldu')
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
      setIsLoading(false)
    }
  }

  const total = calculateTotal(cart)

  return (
    <>
      <Head>
        <title>Ödeme - Mobilya</title>
      </Head>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Ödeme</h1>
              <p className="text-gray-600">Siparişinizi tamamlamak için bilgilerinizi girin</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Teslimat Bilgileri
                  </h2>

                  <form onSubmit={handleCheckout} className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="input"
                        placeholder="Ahmet Yılmaz"
                        required
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          E-posta *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="input"
                          placeholder="ornek@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input"
                          placeholder="+90 555 123 4567"
                          required
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        Adres *
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className="input"
                        placeholder="Sokak, mahalle, bina no, daire no"
                        required
                      />
                    </div>

                    {/* City & Postal Code */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                          Şehir *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="input"
                          placeholder="İstanbul"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                          Posta Kodu
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className="input"
                          placeholder="34000"
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-red-800 text-sm font-medium">{error}</span>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full btn-primary py-4 text-lg shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="spinner border-2 border-white border-t-transparent w-5 h-5"></div>
                          <span>İşleminiz Gerçekleştiriliyor...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span>Nasspay IQ ile Öde</span>
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      Bu bir test ödeme sayfasıdır. Gerçek ödeme alınmayacaktır.
                    </p>
                  </form>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Sipariş Özeti
                  </h2>

                  {/* Cart Items */}
                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="relative w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                          <Image 
                            src={item.image_url} 
                            alt={item.name} 
                            fill 
                            className="object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Ara Toplam</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Kargo</span>
                      <span className="text-green-600 font-medium">Ücretsiz</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Toplam</span>
                      <span className="text-2xl font-bold text-primary-600">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/cart"
                    className="block text-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    ← Sepete Dön
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
