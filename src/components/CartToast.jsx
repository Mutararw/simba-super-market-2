import React from 'react'
import { CheckCircle2, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CartToast = ({ lang }) => {
  const { toast, clearToast } = useCart()
  const navigate = useNavigate()

  if (!toast) return null

  const translations = {
    en: {
      title: 'Added to cart',
      action: 'View Cart'
    },
    fr: {
      title: 'Ajoute au panier',
      action: 'Voir le panier'
    },
    kn: {
      title: 'Byongewe mu ikarita',
      action: 'Reba ikarita'
    }
  }

  const t = translations[lang]

  return (
    <div className="cart-toast-wrap">
      <div className="cart-toast glass fade-in">
        <div className="cart-toast-icon">
          <CheckCircle2 size={20} />
        </div>
        <div className="cart-toast-content">
          <p>{t.title}</p>
          <span>{toast.name}</span>
        </div>
        <button
          onClick={() => {
            clearToast()
            navigate('/cart')
          }}
          className="cart-toast-action"
        >
          <ShoppingBag size={16} />
          {t.action}
        </button>
      </div>
    </div>
  )
}

export default CartToast
