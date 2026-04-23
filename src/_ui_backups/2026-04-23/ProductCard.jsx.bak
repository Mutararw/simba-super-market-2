import React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  return (
    <div className="product-card product-card-modern fade-in">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>

      <div className="product-card-content">
        <span className="product-card-category">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-card-name">{product.name}</h3>
        </Link>
        <button onClick={() => addToCart(product)} className="product-card-cta">
          <Plus size={16} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
