import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import productData from '../assets/products.json'
import { useCart } from '../context/CartContext'
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import LoadingScreen from '../components/LoadingScreen'
import { api } from '../api'

const ProductDetail = ({ lang }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const item = await api.getProductById(id)
        setProduct(item)
      } catch (_error) {
        const fallback = (productData.products || []).find((p) => Number(p.id) === Number(id))
        if (fallback) {
          setProduct(fallback)
          setError('')
        } else {
          setError('Product not found')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return <LoadingScreen />
  if (error || !product) return <div className="container section-padding">Product not found</div>

  const translations = {
    en: { addToCart: 'Add to Cart', inStock: 'In Stock', fastDelivery: 'Fast Delivery', securePayment: 'Secure Payment', easyReturn: '7 Days Return' },
    fr: { addToCart: 'Ajouter au Panier', inStock: 'En Stock', fastDelivery: 'Livraison Rapide', securePayment: 'Paiement Securise', easyReturn: 'Retour en 7 Jours' },
    kn: { addToCart: 'Ongerera mu Ikarita', inStock: 'Birahari', fastDelivery: 'Kugezwaho vuba', securePayment: 'Kwishura mu mutekano', easyReturn: 'Gusubiza mu minsi 7' }
  }

  const t = translations[lang]

  const relatedProducts = (productData.products || [])
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 12)

  return (
    <div className="product-detail-page" style={{ background: 'var(--secondary-dark)', color: 'white', minHeight: '100vh' }}>
      <div className="container section-padding fade-in" style={{ paddingLeft: 'clamp(1rem, 5vw, 4rem)' }}>
        {/* Premium Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="back-btn-cinematic"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.6rem', 
            marginBottom: '3.5rem', 
            padding: '0.9rem 1.6rem',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white', 
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          <ArrowLeft size={18} /> Back to Shopping
        </button>

        <div className="product-detail-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.2fr) 1fr', gap: '5rem', alignItems: 'start' }}>
          {/* Hero Image Container */}
          <div className="product-image-container" style={{ position: 'relative' }}>
            <div 
              style={{ 
                background: 'white', 
                borderRadius: '24px', 
                padding: '1.5rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain' }} 
              />
            </div>

            {/* Background Glow */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', height: '90%', background: 'var(--primary)', filter: 'blur(150px)', opacity: 0.08, zIndex: -1 }} />
          </div>

          {/* Product Info Container */}
          <div className="product-info-container" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span className="badge" style={{ alignSelf: 'flex-start', background: 'var(--primary)', color: 'white', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', padding: '0.5rem 1.2rem' }}>
                {product.category}
              </span>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '800', lineHeight: 1.0, letterSpacing: '-0.04em' }}>
                {product.name}
              </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.02em' }}>
                {product.price.toLocaleString()} <span style={{ fontSize: '1.2rem', opacity: 0.6 }}>RWF</span>
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#4ade80', fontWeight: '800', fontSize: '0.9rem', background: 'rgba(74, 222, 128, 0.08)', padding: '0.5rem 1.2rem', borderRadius: '99px', border: '1px solid rgba(74, 222, 128, 0.2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80' }} />
                {t.inStock}
              </div>
            </div>

            <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '1.2rem', lineHeight: 1.8, maxWidth: '580px', fontWeight: '400' }}>
              Experience the pinnacle of freshness with Simba's hand-selected {product.name}. A testament to our commitment to quality, delivered with care to your home in Kigali.
            </p>

            <button 
              onClick={() => addToCart(product)} 
              className="btn-primary" 
              style={{ width: '100%', maxWidth: '420px', padding: '1.6rem', fontSize: '1.2rem', borderRadius: '24px', boxShadow: '0 25px 50px rgba(245, 130, 32, 0.4)', fontFamily: 'var(--font-display)', fontWeight: '700' }}
            >
              <ShoppingCart size={24} /> {t.addToCart}
            </button>

            <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem' }}>
              {[
                { icon: <Truck size={22} />, label: t.fastDelivery },
                { icon: <ShieldCheck size={22} />, label: t.securePayment },
                { icon: <RotateCcw size={22} />, label: t.easyReturn }
              ].map((benefit, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', transition: 'all 0.3s ease' }}>
                  <div style={{ color: 'var(--primary)' }}>{benefit.icon}</div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{benefit.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Discovery Section */}
        {relatedProducts.length > 0 && (
          <div className="related-section" style={{ marginTop: '10rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6rem' }}>
            <h2 className="discovery-title">Recommended for you</h2>
            <div className="product-grid" style={{ gap: '2rem' }}>
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail

