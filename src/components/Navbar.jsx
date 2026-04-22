import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Sun, Moon, Languages, Menu, X, UserRound, LogOut } from 'lucide-react'
import { useCart } from '../context/CartContext'
import simbaLogo from '../assets/simba-logo.png'

const Navbar = ({ theme, toggleTheme, lang, setLang, searchQuery, setSearchQuery, user, onAuthRequest, onSignOut }) => {
  const { cartCount } = useCart()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const translations = {
    en: {
      search: 'Search products...',
      home: 'Home',
      cart: 'Cart',
      checkout: 'Checkout',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      deliver: 'Deliver to',
      location: 'Kigali City Center'
    },
    fr: {
      search: 'Rechercher...',
      home: 'Accueil',
      cart: 'Panier',
      checkout: 'Paiement',
      signIn: 'Se connecter',
      signOut: 'Se deconnecter',
      deliver: 'Livrer a',
      location: 'Centre de Kigali'
    },
    kn: {
      search: 'Shaka ibicuruzwa...',
      home: 'Ahabanza',
      cart: 'Ikarita',
      checkout: 'Kwishura',
      signIn: 'Injira',
      signOut: 'Sohoka',
      deliver: 'Ohereza kuri',
      location: 'Hagati ya Kigali'
    }
  }

  const t = translations[lang]
  const navItems = [
    { to: '/', label: t.home },
    { to: '/cart', label: t.cart },
    { to: '/checkout', label: t.checkout }
  ]

  return (
    <nav className="navbar">
      <div className="container navbar-shell">

        {/* Brand */}
        <Link to="/" className="brand-mark" onClick={() => setIsMenuOpen(false)}>
          <img src={simbaLogo} alt="Simba logo" style={{ height: '42px', width: 'auto', display: 'block' }} />
        </Link>

        {/* Search */}
        <form
          className="search-bar"
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/')
            setIsMenuOpen(false)
          }}
        >
          <Search size={18} color="#888" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
          />
        </form>

        {/* Actions */}
        <div className="top-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>

          {/* Language */}
          <button
            className="nav-btn lang-btn desktop-only"
            onClick={() => setLang(lang === 'en' ? 'fr' : lang === 'fr' ? 'kn' : 'en')}
            title="Switch language"
          >
            <Languages size={17} />
            <span>{lang}</span>
          </button>

          {/* Theme toggle */}
          <button
            className="nav-btn desktop-only"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Sign In / User */}
          {user ? (
            <>
              <button className="signin-btn" onClick={() => navigate('/checkout')}>
                <UserRound size={16} />
                <span className="desktop-only">{(user.name || 'Account').split(' ')[0]}</span>
              </button>
              <button className="nav-btn" onClick={onSignOut} title={t.signOut}>
                <LogOut size={17} />
              </button>
            </>
          ) : (
            <button className="signin-btn" onClick={() => onAuthRequest({ view: 'signin' })}>
              <UserRound size={16} />
              <span>{t.signIn}</span>
            </button>
          )}

          {/* Cart */}
          <button className="cart-pill" onClick={() => navigate('/cart')} title={t.cart}>
            <ShoppingCart size={19} />
            <span>{cartCount > 0 ? cartCount : '0'}</span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Panel */}
      {isMenuOpen && (
        <div className="mobile-panel">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          {!user && (
            <button className="mobile-signin" onClick={() => { onAuthRequest({ view: 'signin' }); setIsMenuOpen(false) }}>
              <UserRound size={18} />
              {t.signIn}
            </button>
          )}
          <button
            style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 12, padding: '0.8rem 1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#111' }}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
