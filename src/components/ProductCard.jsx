import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  return (
    <div className="product-card glass fade-in" style={{ 
      borderRadius: '24px', 
      overflow: 'hidden', 
      transition: 'var(--transition)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition)' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <button style={{ 
          position: 'absolute', 
          top: '1rem', 
          right: '1rem', 
          background: 'white', 
          padding: '0.5rem', 
          borderRadius: '50%',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <Heart size={18} color="#ef4444" />
        </button>
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '1px' }}>
          {product.category}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', height: '2.8rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {product.name}
          </h3>
        </Link>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text)' }}>
              {product.price.toLocaleString()} <span style={{ fontSize: '0.8rem' }}>RWF</span>
            </span>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="btn-primary" 
            style={{ padding: '0.6rem 0.85rem', borderRadius: '12px' }}
          >
            <Plus size={18} /> Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
