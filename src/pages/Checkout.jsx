import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Phone, CheckCircle2, Loader2, ShoppingBag } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const Checkout = ({ lang, user, onAuthRequest }) => {
  const { cart, cartTotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  const translations = {
    en: { title: 'Checkout', phone: 'Phone Number', pay: 'Pay with MoMo', success: 'Order Successful!', back: 'Back to Home', empty: 'Your cart is empty', signin: 'Sign in to continue checkout' },
    fr: { title: 'Paiement', phone: 'Numero de Telephone', pay: 'Payer avec MoMo', success: 'Commande Reussie!', back: "Retour a l'Accueil", empty: 'Votre panier est vide', signin: 'Connectez-vous pour continuer' },
    kn: { title: 'Kwishura', phone: 'Nimero ya Telefone', pay: 'Ishura na MoMo', success: 'Byagenze neza!', back: 'Subira Ahabanza', empty: 'Ikarita yawe irimo ubusa', signin: 'Injira kugira ngo ukomeze' }
  }

  const t = translations[lang]
  const cleanPhone = phone.replace(/\D/g, '')
  const isPhoneValid = cleanPhone.length >= 9

  const handlePayment = () => {
    if (!isPhoneValid || cartTotal <= 0) return

    setStep(2)
    setTimeout(() => {
      setStep(3)
      clearCart()
    }, 2500)
  }

  if (!user) {
    return (
      <div className="container section-padding fade-in" style={{ textAlign: 'center' }}>
        <ShoppingBag size={80} style={{ color: 'var(--text-muted)', marginBottom: '2rem' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>{t.signin}</h2>
        <button className="btn-primary" onClick={() => onAuthRequest({ view: 'signin', redirectTo: '/checkout' })}>
          Sign In
        </button>
      </div>
    )
  }

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="container section-padding fade-in" style={{ textAlign: 'center' }}>
        <ShoppingBag size={80} style={{ color: 'var(--text-muted)', marginBottom: '2rem' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>{t.empty}</h2>
        <Link to="/" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="container section-padding fade-in" style={{ textAlign: 'center' }}>
        <CheckCircle2 size={80} color="#22c55e" style={{ marginBottom: '2rem' }} />
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>{t.success}</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Thank you for shopping with Simba 2.0. Your order is being processed.</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          {t.back}
        </button>
      </div>
    )
  }

  return (
    <div className="container section-padding fade-in">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '3rem', textAlign: 'center' }}>{t.title}</h1>

        <div className="glass" style={{ padding: '3rem', borderRadius: '32px', background: '#ffffff', color: '#111827' }}>
          {step === 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Amount to Pay</span>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)' }}>{cartTotal.toLocaleString()} RWF</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '600', color: 'var(--text-muted)' }}>{t.phone}</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="tel"
                    placeholder="078X XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '1rem 1rem 1rem 3rem',
                      borderRadius: '16px',
                      border: '1px solid var(--border)',
                      background: '#ffffff',
                      color: '#111827',
                      fontSize: '1.1rem'
                    }}
                  />
                </div>
                {!isPhoneValid && phone && <small style={{ color: '#dc2626' }}>Enter a valid phone number.</small>}
              </div>

              <button
                onClick={handlePayment}
                disabled={!isPhoneValid}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '1.25rem', opacity: isPhoneValid ? 1 : 0.5 }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/MTN_Logo.svg/1200px-MTN_Logo.svg.png"
                  alt="MoMo"
                  style={{ height: '24px', marginRight: '0.5rem' }}
                />
                {t.pay}
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <Loader2 size={60} className="spinner" style={{ color: 'var(--primary)', marginBottom: '2rem', animation: 'spin 2s linear infinite' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Processing Payment...</h2>
              <p style={{ color: 'var(--text-muted)' }}>Please check your phone for the MoMo prompt.</p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

export default Checkout
