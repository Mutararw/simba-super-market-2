import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Sun, Moon, Languages, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Navbar = ({ theme, toggleTheme, lang, setLang, searchQuery, setSearchQuery }) => {
  const { cartCount } = useCart()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const translations = {
    en: { search: 'Search products...', home: 'Home', cart: 'Cart', checkout: 'Checkout' },
    fr: { search: 'Rechercher...', home: 'Accueil', cart: 'Panier', checkout: 'Paiement' },
    kn: { search: 'Shaka ibicuruzwa...', home: 'Ahabanza', cart: 'Ikarita', checkout: 'Kwishura' }
  }

  const t = translations[lang]
  const navItems = [
    { to: '/', label: t.home },
    { to: '/cart', label: t.cart },
    { to: '/checkout', label: t.checkout }
  ]

  return (
    <nav className="navbar glass sticky-top">
      <div className="container navbar-shell">
        <Link to="/" className="brand-mark" onClick={() => setIsMenuOpen(false)}>
          <div className="brand-logo">S</div>
          <span className="brand-text">
            SIMBA <span>2.0</span>
          </span>
        </Link>

        <form
          className="search-bar"
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/')
            setIsMenuOpen(false)
          }}
        >
          <Search size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
          />
        </form>

        <div className="nav-links desktop-only">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button onClick={toggleTheme} className="nav-btn" title="Toggle Theme">
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>

          <button className="nav-btn nav-cart-btn" onClick={() => navigate('/cart')} title={t.cart}>
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="badge cart-count-badge">
                {cartCount}
              </span>
            )}
          </button>

          <button className="nav-btn lang-btn" onClick={() => setLang(lang === 'en' ? 'fr' : lang === 'fr' ? 'kn' : 'en')}>
            <Languages size={22} />
            <span>{lang}</span>
          </button>

          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-panel">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
