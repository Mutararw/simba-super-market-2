import React from 'react'
import { CheckCircle2, ShoppingBag, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CartToast = ({ lang }) => {
  const { toast, clearToast } = useCart()
  const navigate = useNavigate()

  if (!toast) return null

  const translations = {
    en: { title: 'Added to cart!', sub: 'Item added successfully', action: 'View Cart' },
    fr: { title: 'Ajouté au panier!', sub: 'Article ajouté avec succès', action: 'Voir le panier' },
    kn: { title: 'Byongewe mu ikarita!', sub: 'Byongewe neza', action: 'Reba ikarita' }
  }

  const t = translations[lang] || translations.en

  return (
    <div className="toast-popup-wrap">
      <div className="toast-popup fade-in-up">
        {/* Progress bar */}
        <div className="toast-progress-bar" />

        <div className="toast-popup-body">
          {/* Icon */}
          <div className="toast-popup-icon">
            <CheckCircle2 size={22} />
          </div>

          {/* Text */}
          <div className="toast-popup-text">
            <p>{t.title}</p>
            <span>{toast.name}</span>
          </div>

          {/* Actions */}
          <div className="toast-popup-actions">
            <button
              className="toast-view-btn"
              onClick={() => { clearToast(); navigate('/cart') }}
            >
              <ShoppingBag size={15} />
              {t.action}
            </button>
            <button className="toast-close-btn" onClick={clearToast}>
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartToast
