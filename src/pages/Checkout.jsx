import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, CreditCard, MapPin, Phone, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { api } from '../api'

const BRANCHES = ['Simba Remera', 'Simba Kimironko', 'Simba Kacyiru', 'Simba Nyamirambo', 'Simba Gikondo', 'Simba Kanombe']

const formatRWF = (amount) =>
  new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0
  }).format(amount)

const Checkout = ({ lang, user, token, onAuthRequest, onReviewPromptOpen }) => {
  const { cart, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [done, setDone] = useState(false)
  const [orderRef, setOrderRef] = useState('')
  const [name, setName] = useState(user?.name ?? '')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [branch, setBranch] = useState('Simba Remera')
  const [payment, setPayment] = useState('momo')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const delivery = cartTotal >= 30000 ? 0 : 2500
  const total = cartTotal + delivery

  const translations = {
    en: {
      title: 'Checkout',
      nothingTitle: 'Nothing to checkout',
      startShopping: 'Start shopping',
      deliveryDetails: 'Delivery details',
      fullName: 'Full name',
      phone: 'Phone',
      address: 'Address',
      pickupBranch: 'Pickup branch',
      payment: 'Payment',
      orderTitle: 'Your order',
      subtotal: 'Subtotal',
      delivery: 'Delivery',
      free: 'Free',
      total: 'Total',
      placeOrder: 'Place order',
      orderConfirmed: 'Order confirmed!',
      orderThanksPrefix: 'Thanks',
      orderThanksFallback: 'for shopping',
      continueShopping: 'Continue shopping',
      signInToCheckout: 'Sign in to continue checkout',
      emptyCart: 'Your cart is empty',
      moreForFreeDelivery: 'more for free delivery.',
      addressPlaceholder: 'Street, area, landmark...',
      phonePlaceholder: '+250...',
      mobileMoney: 'Mobile Money (MTN / Airtel)',
      card: 'Credit / Debit Card',
      cod: 'Cash on Delivery'
    },
    fr: {
      title: 'Paiement',
      nothingTitle: 'Rien a payer',
      startShopping: 'Commencer vos achats',
      deliveryDetails: 'Details de livraison',
      fullName: 'Nom complet',
      phone: 'Telephone',
      address: 'Adresse',
      pickupBranch: 'Agence de retrait',
      payment: 'Paiement',
      orderTitle: 'Votre commande',
      subtotal: 'Sous-total',
      delivery: 'Livraison',
      free: 'Gratuite',
      total: 'Total',
      placeOrder: 'Passer la commande',
      orderConfirmed: 'Commande confirmee !',
      orderThanksPrefix: 'Merci',
      orderThanksFallback: 'pour vos achats',
      continueShopping: 'Continuer les achats',
      signInToCheckout: 'Connectez-vous pour continuer',
      emptyCart: 'Votre panier est vide',
      moreForFreeDelivery: 'de plus pour la livraison gratuite.',
      addressPlaceholder: 'Rue, quartier, point de repere...',
      phonePlaceholder: '+250...',
      mobileMoney: 'Mobile Money (MTN / Airtel)',
      card: 'Carte bancaire',
      cod: 'Paiement a la livraison'
    },
    kn: {
      title: 'Kwishyura',
      nothingTitle: 'Nta cyo kwishyura',
      startShopping: 'Tangira guhaha',
      deliveryDetails: 'Aho bizagezwa',
      fullName: 'Amazina yose',
      phone: 'Telefone',
      address: 'Aderesi',
      pickupBranch: 'Ishami ryo gufatiraho',
      payment: 'Uburyo bwo kwishyura',
      orderTitle: 'Itegeko ryawe',
      subtotal: 'Igiteranyo fatizo',
      delivery: 'Kohereza',
      free: 'Ubuntu',
      total: 'Igiteranyo',
      placeOrder: 'Emeza itegeko',
      orderConfirmed: 'Itegeko ryemejwe!',
      orderThanksPrefix: 'Murakoze',
      orderThanksFallback: 'guhaha',
      continueShopping: 'Komeza guhaha',
      signInToCheckout: 'Banza winjire ngo ukomeze',
      emptyCart: 'Ikarita yawe irimo ubusa',
      moreForFreeDelivery: 'zisigaye kugira ngo woherezwe ubuntu.',
      addressPlaceholder: 'Umuhanda, agace, ikimenyetso...',
      phonePlaceholder: '+250...',
      mobileMoney: 'Mobile Money (MTN / Airtel)',
      card: 'Ikarita ya banki',
      cod: 'Kwishyura bakuzaniye'
    }
  }

  const t = translations[lang] || translations.en

  useEffect(() => {
    if (done) {
      const timer = window.setTimeout(() => {
        onReviewPromptOpen?.('checkout-success')
      }, 900)

      return () => window.clearTimeout(timer)
    }
  }, [done, onReviewPromptOpen])

  useEffect(() => {
    setName(user?.name ?? '')
  }, [user])

  const submit = async (event) => {
    event.preventDefault()

    if (!user || !token) {
      onAuthRequest?.({ view: 'signin', redirectTo: '/checkout' })
      return
    }

    try {
      setErrorMessage('')
      setIsSubmitting(true)
      await api.createOrder({
        token,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity
        }))
      })
      setOrderRef(`SIM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`)
      clearCart()
      setDone(true)
    } catch (error) {
      console.error('Checkout error:', error);
      setErrorMessage(error.toString())
      setIsSubmitting(false)
    }
    }
  }

  if (!user) {
    return (
      <div className="simba-checkout-empty-wrap">
        <div className="simba-checkout-empty-icon">
          <ShoppingBag size={40} />
        </div>
        <h1 className="simba-checkout-empty-title">{t.signInToCheckout}</h1>
        <button className="simba-checkout-primary-btn" onClick={() => onAuthRequest?.({ view: 'signin', redirectTo: '/checkout' })}>
          {t.startShopping}
        </button>
      </div>
    )
  }

  if (cart.length === 0 && !done) {
    return (
      <div className="simba-checkout-empty-wrap">
        <div className="simba-checkout-empty-icon">
          <ShoppingBag size={40} />
        </div>
        <h1 className="simba-checkout-empty-title">{t.nothingTitle}</h1>
        <p className="simba-checkout-empty-text">{t.emptyCart}</p>
        <Link to="/" className="simba-checkout-primary-btn">
          {t.startShopping}
        </Link>
      </div>
    )
  }

  if (done) {
    return (
      <div className="simba-checkout-success-wrap">
        <div className="simba-checkout-success-icon">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="simba-checkout-success-title">{t.orderConfirmed}</h1>
        <p className="simba-checkout-success-text">
          {t.orderThanksPrefix} {name || t.orderThanksFallback}. Your order <span className="simba-checkout-order-ref">{orderRef}</span> is on its way.
        </p>
        <button type="button" className="simba-checkout-primary-btn simba-checkout-success-btn" onClick={() => navigate('/')}>
          {t.continueShopping}
        </button>
      </div>
    )
  }

  return (
    <div className="simba-checkout-page">
      <div className="simba-checkout-shell">
        <h1 className="simba-checkout-heading">{t.title}</h1>

        <form onSubmit={submit} className="simba-checkout-grid">
          <div className="simba-checkout-main">
            <section className="simba-checkout-section">
              <h2 className="simba-checkout-section-title">
                <MapPin size={20} className="simba-checkout-section-icon" /> {t.deliveryDetails}
              </h2>

              <div className="simba-checkout-two-col">
                <div className="simba-checkout-field">
                  <label htmlFor="checkout-name">{t.fullName}</label>
                  <input id="checkout-name" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="simba-checkout-field">
                  <label htmlFor="checkout-phone">{t.phone}</label>
                  <input id="checkout-phone" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phonePlaceholder} />
                </div>
              </div>

              <div className="simba-checkout-field">
                <label htmlFor="checkout-address">{t.address}</label>
                <textarea id="checkout-address" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t.addressPlaceholder} />
              </div>

              <div className="simba-checkout-field">
                <label htmlFor="checkout-branch">{t.pickupBranch}</label>
                <select id="checkout-branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
                  {BRANCHES.map((branchName) => (
                    <option key={branchName} value={branchName}>
                      {branchName}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            <section className="simba-checkout-section">
              <h2 className="simba-checkout-section-title">
                <CreditCard size={20} className="simba-checkout-section-icon" /> {t.payment}
              </h2>

              <div className="simba-checkout-payment-list">
                {[
                  { id: 'momo', label: t.mobileMoney, Icon: Phone },
                  { id: 'card', label: t.card, Icon: CreditCard },
                  { id: 'cod', label: t.cod, Icon: MapPin }
                ].map(({ id, label, Icon }) => (
                  <label key={id} htmlFor={`payment-${id}`} className={`simba-checkout-payment-option ${payment === id ? 'is-active' : ''}`}>
                    <input id={`payment-${id}`} type="radio" name="payment" value={id} checked={payment === id} onChange={(e) => setPayment(e.target.value)} />
                    <Icon size={20} className="simba-checkout-payment-icon" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <aside className="simba-checkout-summary">
            <h2 className="simba-checkout-summary-title">{t.orderTitle}</h2>

            <div className="simba-checkout-order-list">
              {cart.map((item) => (
                <div key={item.id} className="simba-checkout-order-item">
                  <img src={item.image} alt={item.name} className="simba-checkout-order-image" />
                  <div className="simba-checkout-order-info">
                    <div className="simba-checkout-order-name">{item.name}</div>
                    <div className="simba-checkout-order-meta">
                      {item.quantity} x {formatRWF(item.price)}
                    </div>
                  </div>
                  <div className="simba-checkout-order-total">{formatRWF(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="simba-checkout-summary-rows">
              <div className="simba-checkout-summary-row">
                <span>{t.subtotal}</span>
                <span>{formatRWF(cartTotal)}</span>
              </div>
              <div className="simba-checkout-summary-row">
                <span>{t.delivery}</span>
                <span>{delivery === 0 ? t.free : formatRWF(delivery)}</span>
              </div>
              {delivery > 0 && (
                <div className="simba-checkout-delivery-note">
                  Add {formatRWF(30000 - cartTotal)} {t.moreForFreeDelivery}
                </div>
              )}
            </div>

            <div className="simba-checkout-total-row">
              <span>{t.total}</span>
              <span>{formatRWF(total)}</span>
            </div>

            {errorMessage && <p className="simba-checkout-error">{errorMessage}</p>}

            <button type="submit" className="simba-checkout-primary-btn simba-checkout-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : t.placeOrder}
            </button>
          </aside>
        </form>
      </div>
    </div>
  )
}

export default Checkout
