import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

const formatRWF = (amount) =>
  new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0
  }).format(amount)

const Cart = ({ lang, user, onAuthRequest }) => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const translations = {
    en: {
      emptyTitle: 'Your cart is empty',
      emptyText: "Looks like you haven't added anything yet.",
      startShopping: 'Start shopping',
      cartTitle: 'Your cart',
      items: 'items',
      summary: 'Order summary',
      subtotal: 'Subtotal',
      delivery: 'Delivery',
      free: 'Free',
      total: 'Total',
      checkout: 'Checkout',
      continue: 'Continue shopping',
      clearCart: 'Clear cart',
      freeDeliveryHint: 'more for free delivery.',
      signinRequired: 'Sign in before checkout.'
    },
    fr: {
      emptyTitle: 'Votre panier est vide',
      emptyText: "Vous n'avez encore rien ajoute.",
      startShopping: 'Commencer vos achats',
      cartTitle: 'Votre panier',
      items: 'articles',
      summary: 'Resume de commande',
      subtotal: 'Sous-total',
      delivery: 'Livraison',
      free: 'Gratuite',
      total: 'Total',
      checkout: 'Passer a la caisse',
      continue: 'Continuer les achats',
      clearCart: 'Vider le panier',
      freeDeliveryHint: 'de plus pour la livraison gratuite.',
      signinRequired: 'Connectez-vous avant le paiement.'
    },
    kn: {
      emptyTitle: 'Ikarita yawe irimo ubusa',
      emptyText: 'Nta kintu urongeramo muri karita.',
      startShopping: 'Tangira guhaha',
      cartTitle: 'Ikarita yawe',
      items: 'ibintu',
      summary: 'Incamake y itegeko',
      subtotal: 'Igiteranyo fatizo',
      delivery: 'Kohereza',
      free: 'Ni ubuntu',
      total: 'Igiteranyo',
      checkout: 'Komeza wishyure',
      continue: 'Komeza guhaha',
      clearCart: 'Sukura ikarita',
      freeDeliveryHint: 'zisigaye ngo woherezwe ubuntu.',
      signinRequired: 'Banza winjire mbere yo kwishyura.'
    }
  }

  const t = translations[lang] || translations.en
  const delivery = cartTotal >= 30000 ? 0 : 2500

  if (cart.length === 0) {
    return (
      <div className="simba-cart-empty-wrap">
        <div className="simba-cart-empty-icon">
          <ShoppingBag size={40} />
        </div>
        <h1 className="simba-cart-empty-title">{t.emptyTitle}</h1>
        <p className="simba-cart-empty-text">{t.emptyText}</p>
        <Link to="/" className="simba-cart-primary-btn simba-cart-empty-btn">
          {t.startShopping}
        </Link>
      </div>
    )
  }

  return (
    <div className="simba-cart-page">
      <div className="simba-cart-shell">
        <h1 className="simba-cart-heading">
          {t.cartTitle} ({cart.length} {t.items})
        </h1>

        <div className="simba-cart-grid">
          <div className="simba-cart-list">
            {cart.map((item) => (
              <div key={item.id} className="simba-cart-card">
                <Link to={`/product/${item.id}`} className="simba-cart-image-link">
                  <img src={item.image} alt={item.name} className="simba-cart-image" />
                </Link>

                <div className="simba-cart-card-body">
                  <div className="simba-cart-category">{item.category}</div>
                  <Link to={`/product/${item.id}`} className="simba-cart-product-link">
                    {item.name}
                  </Link>
                  <div className="simba-cart-unit-price">
                    {formatRWF(item.price)} / {item.unit || 'Pcs'}
                  </div>

                  <div className="simba-cart-card-footer">
                    <div className="simba-cart-qty-control">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="simba-cart-qty-btn" aria-label="Decrease quantity">
                        <Minus size={14} />
                      </button>
                      <div className="simba-cart-qty-value">{item.quantity}</div>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="simba-cart-qty-btn" aria-label="Increase quantity">
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="simba-cart-line-total">{formatRWF(item.price * item.quantity)}</div>
                  </div>
                </div>

                <button type="button" onClick={() => removeFromCart(item.id)} className="simba-cart-remove-btn" aria-label="Remove item">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button type="button" onClick={clearCart} className="simba-cart-clear-btn">
              {t.clearCart}
            </button>
          </div>

          <aside className="simba-cart-summary">
            <h2 className="simba-cart-summary-title">{t.summary}</h2>

            <div className="simba-cart-summary-rows">
              <div className="simba-cart-summary-row">
                <span>{t.subtotal}</span>
                <span>{formatRWF(cartTotal)}</span>
              </div>

              <div className="simba-cart-summary-row">
                <span>{t.delivery}</span>
                <span className={delivery === 0 ? 'simba-cart-free' : ''}>
                  {delivery === 0 ? t.free : formatRWF(delivery)}
                </span>
              </div>

              {delivery > 0 && (
                <div className="simba-cart-delivery-note">
                  Add {formatRWF(30000 - cartTotal)} {t.freeDeliveryHint}
                </div>
              )}
            </div>

            <div className="simba-cart-total-row">
              <span>{t.total}</span>
              <span>{formatRWF(cartTotal + delivery)}</span>
            </div>

            {!user && <p className="simba-cart-auth-note">{t.signinRequired}</p>}

            <button
              type="button"
              className="simba-cart-primary-btn simba-cart-full-btn"
              onClick={() => {
                if (!user) {
                  onAuthRequest({ view: 'signin', redirectTo: '/checkout' })
                  return
                }
                navigate('/checkout')
              }}
            >
              {t.checkout} <ArrowRight size={16} />
            </button>

            <Link to="/" className="simba-cart-secondary-btn simba-cart-full-btn">
              {t.continue}
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Cart
