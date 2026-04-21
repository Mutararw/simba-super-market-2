import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'

const Cart = ({ lang, user, onAuthRequest }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()
  const navigate = useNavigate()

  const translations = {
    en: {
      title: 'Your Cart',
      empty: 'Your cart is empty',
      subtotal: 'Subtotal',
      summary: 'Summary',
      shipping: 'Shipping',
      total: 'Total',
      checkout: 'Proceed to Checkout',
      continue: 'Continue Shopping',
      signinRequired: 'Sign in before checkout'
    },
    fr: {
      title: 'Votre Panier',
      empty: 'Votre panier est vide',
      subtotal: 'Sous-total',
      summary: 'Resume',
      shipping: 'Livraison',
      total: 'Total',
      checkout: 'Passer a la Caisse',
      continue: 'Continuer les Achats',
      signinRequired: 'Connectez-vous avant le paiement'
    },
    kn: {
      title: 'Ikarita yawe',
      empty: 'Ikarita yawe irimo ubusa',
      subtotal: 'Iteranyirizo',
      summary: 'Incamake',
      shipping: 'Kohereza',
      total: 'Igiteranyo',
      checkout: 'Komeza Kwishura',
      continue: 'Komeza Gura',
      signinRequired: 'Injira mbere yo kwishyura'
    }
  }

  const t = translations[lang]

  if (cart.length === 0) {
    return (
      <div className="container section-padding fade-in" style={{ textAlign: 'center' }}>
        <ShoppingBag size={80} style={{ color: 'var(--text-muted)', marginBottom: '2rem' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>{t.empty}</h2>
        <Link to="/" className="btn-primary">
          {t.continue}
        </Link>
      </div>
    )
  }

  return (
    <div className="container section-padding fade-in">
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '3rem' }}>{t.title}</h1>

      <div className="cart-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {cart.map((item) => (
            <div key={item.id} className="glass cart-item" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', borderRadius: '24px', alignItems: 'center', background: '#ffffff', color: '#111827' }}>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '16px' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{item.name}</h3>
                <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{item.price.toLocaleString()} RWF</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg)', padding: '0.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Minus size={18} />
                </button>
                <span style={{ fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus size={18} />
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={{ color: '#ef4444', padding: '0.5rem' }}>
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="glass cart-summary" style={{ padding: '2rem', borderRadius: '32px', height: 'fit-content', position: 'sticky', top: '100px', background: '#ffffff', color: '#111827' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>{t.summary}</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
            <span>{t.subtotal}</span>
            <span style={{ fontWeight: '700' }}>{cartTotal.toLocaleString()} RWF</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.1rem' }}>
            <span>{t.shipping}</span>
            <span style={{ color: '#22c55e', fontWeight: '700' }}>FREE</span>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '1.5rem' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '800' }}>
            <span>{t.total}</span>
            <span style={{ color: 'var(--primary)' }}>{cartTotal.toLocaleString()} RWF</span>
          </div>
          {!user && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{t.signinRequired}</p>}
          <button
            onClick={() => {
              if (!user) {
                onAuthRequest({ view: 'signin', redirectTo: '/checkout' })
                return
              }
              navigate('/checkout')
            }}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
          >
            {t.checkout} <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
