import '../styles/globals.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getCart, getCartItemCount } from '../utils/cart'

/**
 * Main App Component
 * Wraps all pages with layout and global state
 */
export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

/**
 * Layout Component
 * Provides consistent header, navigation, and footer
 */
function Layout({ children }) {
  const router = useRouter()
  const [cartCount, setCartCount] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Update cart count on mount and route changes
  useEffect(() => {
    updateCartCount()
    
    const handleRouteChange = () => {
      updateCartCount()
      setMobileMenuOpen(false)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  const updateCartCount = () => {
    const cart = getCart()
    setCartCount(getCartItemCount(cart))
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container-custom py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Mobilya</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className={`font-medium transition-colors ${
                  router.pathname === '/' 
                    ? 'text-primary-600' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Ürünler
              </Link>
              <Link 
                href="/cart" 
                className={`flex items-center space-x-2 font-medium transition-colors ${
                  router.pathname === '/cart' 
                    ? 'text-primary-600' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Sepet</span>
                {cartCount > 0 && (
                  <span className="bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <Link 
                href="/" 
                className={`block py-2 font-medium ${
                  router.pathname === '/' ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                Ürünler
              </Link>
              <Link 
                href="/cart" 
                className={`flex items-center space-x-2 py-2 font-medium ${
                  router.pathname === '/cart' ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Sepet</span>
                {cartCount > 0 && (
                  <span className="bg-primary-600 text-white text-xs font-bold rounded-full px-2 py-0.5 ml-2">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-2xl font-bold">Mobilya</span>
              </div>
              <p className="text-gray-400 text-sm">
                Modern ve şık mobilya çözümleri için güvenilir adresiniz.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Hızlı Bağlantılar</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Ürünler</Link></li>
                <li><Link href="/cart" className="hover:text-white transition-colors">Sepet</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">İletişim</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: info@mobilya.com</li>
                <li>Tel: +90 (212) 555 0000</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Mobilya. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
