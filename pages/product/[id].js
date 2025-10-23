import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { formatPrice } from '../../utils/nasspay'
import { addToCart } from '../../utils/cart'
import productsData from '../../data/products.json'

/**
 * Product Detail Page
 * Displays detailed information about a single product
 */
export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  // Find product by ID
  const product = productsData.find(p => p.id === parseInt(id))

  // If product not found
  if (!product && id) {
    return (
      <div className="container-custom py-16 text-center">
        <Head>
          <title>Ürün Bulunamadı - Mobilya</title>
        </Head>
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ürün Bulunamadı</h1>
          <p className="text-gray-600 mb-6">
            Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Ürünlere Dön
          </Link>
        </div>
      </div>
    )
  }

  // Loading state
  if (!product) {
    return (
      <div className="container-custom py-16">
        <div className="flex justify-center">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  // Category display name
  const categoryNames = {
    'living-room': 'Oturma Odası',
    'bedroom': 'Yatak Odası',
    'dining-room': 'Yemek Odası',
    'outdoor': 'Bahçe Mobilyası'
  }

  // Handle add to cart
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setAddedToCart(true)
    
    // Reset after 3 seconds
    setTimeout(() => {
      setAddedToCart(false)
    }, 3000)
  }

  // Related products (same category, exclude current)
  const relatedProducts = productsData
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <Head>
        <title>{product.name} - Mobilya</title>
        <meta name="description" content={product.description} />
      </Head>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-custom py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Görsel yakında eklenecek
                  </p>
                </div>
              </div>
              {/* Image placeholder - will show actual images when uploaded */}
              {/* <Image src={product.image_url} alt={product.name} fill className="object-cover" /> */}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="badge-info">
                {categoryNames[product.category]}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-semibold text-gray-900 mb-2">Ürün Açıklaması</h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block font-semibold text-gray-900 mb-2">
                Adet
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                  disabled={quantity <= 1}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-xl font-semibold text-gray-900 w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {addedToCart ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Sepete Eklendi</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Sepete Ekle</span>
                  </span>
                )}
              </button>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Ürün Özellikleri</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Kaliteli malzeme</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>2 yıl garanti</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ücretsiz kargo</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Kolay montaj</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Benzer Ürünler</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(relProduct => (
                <Link
                  key={relProduct.id}
                  href={`/product/${relProduct.id}`}
                  className="card-product group"
                >
                  <div className="relative aspect-product bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm text-gray-900 mb-2 text-clamp-2 group-hover:text-primary-600 transition-colors">
                      {relProduct.name}
                    </h3>
                    <span className="text-base font-semibold text-primary-600">
                      {formatPrice(relProduct.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
