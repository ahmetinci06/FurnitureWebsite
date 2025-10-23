import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

/**
 * Payment Success Page
 * Displays confirmation after successful checkout
 */
export default function Success() {
  const [countdown, setCountdown] = useState(10)

  // Countdown timer to redirect to home
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  return (
    <>
      <Head>
        <title>Ödeme Başarılı - Mobilya</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-beige-50 to-white flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ödeme Başarılı!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Siparişiniz başarıyla alındı. Teşekkür ederiz!
            </p>

            {/* Mock Info Box */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-left">
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    Bu bir test ödeme sistemidir
                  </p>
                  <p className="text-sm text-blue-800">
                    Gerçek ödeme alınmamıştır. Bu sayfa, Nasspay IQ entegrasyonu 
                    tamamlandığında gerçek ödeme onayı gösterecektir.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Info */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
              <h2 className="font-semibold text-gray-900 mb-4 text-center">
                Sipariş Detayları
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sipariş No:</span>
                  <span className="font-semibold text-gray-900">
                    MOCK-{Date.now().toString().slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ödeme Yöntemi:</span>
                  <span className="font-semibold text-gray-900">Nasspay IQ (Mock)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Durum:</span>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    Onaylandı
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-br from-primary-50 to-beige-50 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-3 text-center">
                Sonraki Adımlar
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Sipariş onay e-postası gönderilecek</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ürünleriniz hazırlanıp kargoya verilecek</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Kargo takip numarası size iletilecek</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="btn-primary inline-flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Ana Sayfaya Dön</span>
              </Link>
              <Link
                href="/"
                className="btn-secondary inline-flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Alışverişe Devam Et</span>
              </Link>
            </div>

            {/* Auto Redirect Info */}
            {countdown > 0 && (
              <p className="text-sm text-gray-500 mt-6">
                {countdown} saniye sonra ana sayfaya yönlendirileceksiniz...
              </p>
            )}
            {countdown === 0 && (
              <script dangerouslySetInnerHTML={{ __html: "window.location.href = '/'" }} />
            )}
          </div>

          {/* Support Contact */}
          <div className="text-center mt-8 text-gray-600 text-sm">
            <p>
              Sorularınız için:{' '}
              <a href="mailto:destek@mobilya.com" className="text-primary-600 hover:text-primary-700 font-medium">
                destek@mobilya.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
