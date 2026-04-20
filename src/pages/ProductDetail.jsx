import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import productData from '../assets/products.json'
import { useCart } from '../context/CartContext'
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw } from 'lucide-react'

const ProductDetail = ({ lang }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const product = productData.products.find((p) => p.id === parseInt(id, 10))

  if (!product) return <div className="container">Product not found</div>

  const translations = {
    en: { addToCart: 'Add to Cart', inStock: 'In Stock', fastDelivery: 'Fast Delivery', securePayment: 'Secure Payment', easyReturn: '7 Days Return' },
    fr: { addToCart: 'Ajouter au Panier', inStock: 'En Stock', fastDelivery: 'Livraison Rapide', securePayment: 'Paiement Securise', easyReturn: 'Retour en 7 Jours' },
    kn: { addToCart: 'Ongerera mu Ikarita', inStock: 'Birahari', fastDelivery: 'Kugezwaho vuba', securePayment: 'Kwishura mu mutekano', easyReturn: 'Gusubiza mu minsi 7' }
  }

  const t = translations[lang]

  return (
    <div className="container section-padding fade-in">
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)', fontWeight: '600' }}>
        <ArrowLeft size={20} /> Back to Shopping
      </button>

      <div className="product-detail-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        <div className="glass" style={{ borderRadius: '32px', overflow: 'hidden', height: 'fit-content' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <span className="badge" style={{ alignSelf: 'flex-start' }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4.8vw, 3rem)', fontWeight: '800', lineHeight: 1.1 }}>{product.name}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)' }}>{product.price.toLocaleString()} RWF</span>
            <span style={{ color: '#22c55e', fontWeight: '700', fontSize: '1.1rem' }}>{t.inStock}</span>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Premium quality {product.name} available now at Simba Supermarket. Experience dependable delivery, secure checkout, and top value on every order.
          </p>

          <button onClick={() => addToCart(product)} className="btn-primary" style={{ padding: '1.25rem 2rem', fontSize: '1.05rem', justifyContent: 'center' }}>
            <ShoppingCart size={22} /> {t.addToCart}
          </button>

          <div className="detail-benefits" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            {[
              { icon: <Truck size={20} />, label: t.fastDelivery },
              { icon: <ShieldCheck size={20} />, label: t.securePayment },
              { icon: <RotateCcw size={20} />, label: t.easyReturn }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: '16px', background: 'var(--card)', border: '1px solid var(--border)' }}>
                <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
