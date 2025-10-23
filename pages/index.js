import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '../utils/nasspay'
import { addToCart } from '../utils/cart'
import productsData from '../data/products.json'

/**
 * Home Page - Product Listing with Category Filters
 */
export default function Home() {
  const [products, setProducts] = useState(productsData)
  const [filteredProducts, setFilteredProducts] = useState(productsData)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [addedToCart, setAddedToCart] = useState(null)

  const categories = [
    { id: 'all', name: 'Tümü', nameEn: 'All' },
    { id: 'living-room', name: 'Oturma Odası', nameEn: 'Living Room' },
    { id: 'bedroom', name: 'Yatak Odası', nameEn: 'Bedroom' },
    { id: 'dining-room', name: 'Yemek Odası', nameEn: 'Dining Room' },
    { id: 'outdoor', name: 'Bahçe Mobilyası', nameEn: 'Outdoor' },
  ]

  // Filter products by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory))
    }
  }, [selectedCategory, products])

  // Handle add to cart with feedback
  const handleAddToCart = (product, e) => {
    e.preventDefault() // Prevent navigation
    e.stopPropagation()
    
    addToCart(product)
    setAddedToCart(product.id)
    
    // Reset feedback after 2 seconds
    setTimeout(() => {
      setAddedToCart(null)
    }, 2000)
  }

  return (
    <>
      <Head>
        <title>Mobilya - Modern Furniture Store</title>
        <meta name="description" content="Modern ve şık mobilya çözümleri. Yatak odası, oturma odası ve daha fazlası." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-beige-100 via-beige-50 to-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Modern Mobilya Koleksiyonları
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Evinizi daha güzel ve konforlu hale getiren mobilyalar
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="container-custom py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? 'category-btn-active'
                    : 'category-btn-inactive'
                }
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container-custom py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Bu kategoride ürün bulunamadı.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{filteredProducts.length}</span> ürün bulundu
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="card-product group"
                >
                  {/* Product Image */}
                  <div className="relative aspect-product bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-500">
                          {product.name}
                        </p>
                      </div>
                    </div>
                    {/* Image placeholder - will be replaced with actual images */}
                    {/* <Image src={product.image_url} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" /> */}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 text-clamp-2 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 text-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="price-small">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                          addedToCart === product.id
                            ? 'bg-green-600 text-white'
                            : 'bg-primary-600 text-white hover:bg-primary-700'
                        }`}
                      >
                        {addedToCart === product.id ? (
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Eklendi</span>
                          </span>
                        ) : (
                          'Sepete Ekle'
                        )}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Info Section */}
      <section className="bg-gradient-to-br from-primary-50 to-beige-50 py-16 mt-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Kaliteli Ürünler</h3>
              <p className="text-gray-600 text-sm">Uzun ömürlü ve dayanıklı mobilyalar</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Güvenli Ödeme</h3>
              <p className="text-gray-600 text-sm">Nasspay IQ ile güvenli alışveriş</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Hızlı Teslimat</h3>
              <p className="text-gray-600 text-sm">Siparişleriniz güvenle kapınıza</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
