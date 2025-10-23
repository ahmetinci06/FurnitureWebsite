import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { formatPrice } from '../utils/nasspay'
import { 
  getCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  calculateTotal 
} from '../utils/cart'

/**
 * Shopping Cart Page
 * Displays cart items with quantity controls and checkout option
 */
export default function Cart() {
  const router = useRouter()
  const [cart, setCart] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Load cart on mount
  useEffect(() => {
    setCart(getCart())
    setIsLoading(false)
  }, [])

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = updateQuantity(productId, newQuantity)
    setCart(updatedCart)
  }

  // Handle remove item
  const handleRemove = (productId) => {
    const updatedCart = removeFromCart(productId)
    setCart(updatedCart)
  }

  // Handle clear cart
  const handleClearCart = () => {
    if (confirm('Sepeti tamamen temizlemek istediğinize emin misiniz?')) {
      clearCart()
      setCart([])
    }
  }

  // Calculate total
  const total = calculateTotal(cart)

  // Loading state
  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <div className="flex justify-center">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <>
        <Head>
          <title>Sepet - Mobilya</title>
        </Head>
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sepetiniz Boş</h1>
            <p className="text-gray-600 mb-6">
              Henüz sepetinize ürün eklemediniz. Alışverişe başlamak için ürünlerimizi inceleyin.
            </p>
            <Link href="/" className="btn-primary inline-block">
              Ürünleri İncele
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Sepet ({cart.length} ürün) - Mobilya</title>
      </Head>

      <div className="container-custom py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Alışveriş Sepeti
            </h1>
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center space-x-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Sepeti Temizle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/product/${item.id}`}
                      className="font-semibold text-gray-900 hover:text-primary-600 transition-colors block mb-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-600 text-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-2">
                      <span className="text-lg font-semibold text-primary-600">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end space-y-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="quantity-btn"
                        disabled={item.quantity <= 1}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="text-lg font-semibold text-gray-900 w-10 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Kaldır</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Sipariş Özeti
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Ürünler ({cart.length})</span>
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

                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full btn-primary py-4 text-lg shadow-lg hover:shadow-xl"
                >
                  Ödemeye Geç
                </button>

                <Link
                  href="/"
                  className="block text-center mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  ← Alışverişe Devam Et
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Güvenli Ödeme</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Ücretsiz Kargo</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>2 Yıl Garanti</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
