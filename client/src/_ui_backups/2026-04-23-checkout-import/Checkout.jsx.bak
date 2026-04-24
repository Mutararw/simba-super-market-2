import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { Phone, CheckCircle2, Loader2, ShoppingBag, MapPin, Clock, CreditCard, ChevronRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api'

const BRANCHES = [
  { id: 'remera', name: 'Simba Supermarket Remera', area: 'Gasabo' },
  { id: 'kimironko', name: 'Simba Supermarket Kimironko', area: 'Gasabo' },
  { id: 'kacyiru', name: 'Simba Supermarket Kacyiru', area: 'Gasabo' },
  { id: 'nyamirambo', name: 'Simba Supermarket Nyamirambo', area: 'Nyarugenge' },
  { id: 'gikondo', name: 'Simba Supermarket Gikondo', area: 'Kicukiro' },
  { id: 'kanombe', name: 'Simba Supermarket Kanombe', area: 'Kicukiro' },
  { id: 'kinyinya', name: 'Simba Supermarket Kinyinya', area: 'Gasabo' },
  { id: 'kibagabaga', name: 'Simba Supermarket Kibagabaga', area: 'Gasabo' },
  { id: 'nyanza', name: 'Simba Supermarket Nyanza', area: 'Kicukiro' }
]

const TIMES = [
  'As soon as possible (15-30 min)',
  'In 1 hour',
  'In 2 hours',
  'Later today',
  'Tomorrow morning'
]

const Checkout = ({ lang, user, token, onAuthRequest, onReviewPromptOpen }) => {
  const { cart, cartTotal, clearCart } = useCart()
  const [step, setStep] = useState(1) // 1: Details, 2: Payment, 3: Success
  const [selectedBranch, setSelectedBranch] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const DEPOSIT_AMOUNT = 500 // Small MoMo deposit in RWF

  useEffect(() => {
    if (step !== 3) return

    const timer = window.setTimeout(() => {
      onReviewPromptOpen?.('checkout-success')
    }, 900)

    return () => window.clearTimeout(timer)
  }, [step, onReviewPromptOpen])

  const translations = {
    en: { 
      title: 'Quick Pick-up Checkout', 
      phone: 'Momo Phone Number', 
      pay: 'Pay Deposit with MoMo', 
      success: 'Pick-up Confirmed!', 
      back: 'Back to Home', 
      empty: 'Your cart is empty', 
      signin: 'Sign in to continue checkout',
      selectBranch: 'Select Pick-up Branch',
      selectTime: 'Select Pick-up Time',
      depositInfo: 'Pay a small deposit now to confirm your order. Pay the balance at the branch.'
    },
    // Add other languages if needed, keeping it simple for now
  }

  const t = translations[lang] || translations.en
  const cleanPhone = phone.replace(/\D/g, '')
  const isPhoneValid = cleanPhone.length >= 9 && cleanPhone.startsWith('07')

  const handlePayment = async () => {
    if (!isPhoneValid || !selectedBranch || !selectedTime || !token) return

    const items = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity
    }))

    try {
      setErrorMessage('')
      setIsSubmitting(true)
      // Simulate API call for order creation with branch/time metadata
      await api.createOrder({ 
        token, 
        items, 
        metadata: { 
          type: 'pickup', 
          branch: selectedBranch, 
          time: selectedTime,
          deposit: DEPOSIT_AMOUNT 
        } 
      })
      setStep(3)
      clearCart()
    } catch (error) {
      setErrorMessage(error.message || 'Failed to place order')
    } finally {
      setIsSubmitting(false)
    }
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
    const branchName = BRANCHES.find(b => b.id === selectedBranch)?.name
    return (
      <div className="container section-padding fade-in" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <div className="glass" style={{ padding: '4rem', borderRadius: '40px', background: 'white' }}>
          <CheckCircle2 size={100} color="#22c55e" style={{ marginBottom: '2rem' }} />
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1rem', color: '#111827' }}>Ready for Pick-up!</h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', marginBottom: '3rem' }}>
            Your order has been sent to <strong>{branchName}</strong>. <br/>
            The staff is already preparing your items. See you in <strong>{selectedTime}</strong>!
          </p>
          
          <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '24px', textAlign: 'left', marginBottom: '3rem', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <MapPin className="text-primary" />
              <div>
                <strong style={{ display: 'block', color: '#111827' }}>Pick-up Location</strong>
                <span style={{ color: '#64748b' }}>{branchName}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Clock className="text-primary" />
              <div>
                <strong style={{ display: 'block', color: '#111827' }}>Scheduled Time</strong>
                <span style={{ color: '#64748b' }}>{selectedTime}</span>
              </div>
            </div>
          </div>

          <button onClick={() => navigate('/')} className="btn-primary" style={{ width: '100%', py: '1.5rem' }}>
            {t.back}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container section-padding fade-in">
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#111827', marginBottom: '1rem' }}>{t.title}</h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center', color: 'var(--primary)', fontWeight: '700' }}>
            <ShoppingBag size={20} />
            <span>Kigali Direct Service</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
          {/* Left Column: Selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Step 1: Branch */}
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '32px', background: 'white' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <MapPin className="text-primary" /> {t.selectBranch}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {BRANCHES.map(branch => (
                  <button
                    key={branch.id}
                    onClick={() => setSelectedBranch(branch.id)}
                    style={{
                      padding: '1.2rem',
                      borderRadius: '16px',
                      border: selectedBranch === branch.id ? '2px solid var(--primary)' : '1px solid #e2e8f0',
                      background: selectedBranch === branch.id ? '#fff7ed' : 'white',
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <strong style={{ display: 'block', color: selectedBranch === branch.id ? 'var(--primary)' : '#111827', fontSize: '0.95rem' }}>{branch.name}</strong>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{branch.area}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Time */}
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '32px', background: 'white' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Clock className="text-primary" /> {t.selectTime}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {TIMES.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    style={{
                      padding: '0.8rem 1.5rem',
                      borderRadius: '100px',
                      border: selectedTime === time ? '2px solid var(--primary)' : '1px solid #e2e8f0',
                      background: selectedTime === time ? 'var(--primary)' : 'white',
                      color: selectedTime === time ? 'white' : '#111827',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order & Payment */}
          <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '32px', background: 'white', boxShadow: '0 30px 60px rgba(0,0,0,0.08)' }}>
              <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: '#64748b' }}>Order Total</span>
                  <span style={{ fontWeight: '700' }}>{cartTotal.toLocaleString()} RWF</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary)', fontWeight: '800', fontSize: '1.2rem' }}>
                  <span>MoMo Deposit</span>
                  <span>{DEPOSIT_AMOUNT} RWF</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '1rem' }}>
                  * This small deposit prevents no-shows. Pay the rest ({ (cartTotal - DEPOSIT_AMOUNT).toLocaleString() } RWF) at the branch.
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.8rem', color: '#111827' }}>{t.phone}</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input
                    type="tel"
                    placeholder="078X XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '1.2rem 1.2rem 1.2rem 3.5rem',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      fontSize: '1.1rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!isPhoneValid || !selectedBranch || !selectedTime || isSubmitting}
                className="btn-primary"
                style={{ 
                  width: '100%', 
                  justifyContent: 'center', 
                  padding: '1.5rem', 
                  fontSize: '1.2rem',
                  opacity: (!isPhoneValid || !selectedBranch || !selectedTime || isSubmitting) ? 0.5 : 1
                }}
              >
                {isSubmitting ? (
                  <Loader2 className="spinner" />
                ) : (
                  <>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/MTN_Logo.svg/1200px-MTN_Logo.svg.png"
                      alt="MoMo"
                      style={{ height: '24px', marginRight: '0.8rem' }}
                    />
                    {t.pay}
                  </>
                )}
              </button>

              {errorMessage && <p style={{ color: '#dc2626', marginTop: '1rem', textAlign: 'center' }}>{errorMessage}</p>}
              
              {!selectedBranch && <p style={{ color: '#f59e0b', fontSize: '0.85rem', marginTop: '1.5rem', textAlign: 'center' }}>Please select a branch first.</p>}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  )
}

export default Checkout
