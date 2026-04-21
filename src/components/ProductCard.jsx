import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  return (
    <div className="product-card glass fade-in" style={{ 
      borderRadius: '20px', 
      overflow: 'hidden', 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      background: '#ffffff'
    }}>
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <button
          className="card-wish-btn"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={15} color="#ef4444" />
        </button>
      </div>

      <div style={{ padding: '0.9rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: '#5d3ebc', letterSpacing: '0.8px' }}>
          {product.category}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: '700', height: '2.5rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', color: '#111827', lineHeight: 1.3 }}>
            {product.name}
          </h3>
        </Link>
        <div style={{ marginTop: 'auto', paddingTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#111827' }}>
            {product.price.toLocaleString()} <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>RWF</span>
          </span>
          <button 
            onClick={() => addToCart(product)}
            className="card-add-btn"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
