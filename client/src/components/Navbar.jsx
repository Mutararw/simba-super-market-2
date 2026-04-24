import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Sun, Moon, Languages, Menu, X, UserRound, LogOut, MapPin, House } from 'lucide-react'
import { useCart } from '../context/CartContext'
import simbaLogo from '../assets/simba-logo.png'

const Navbar = ({ isCinematic, theme, toggleTheme, lang, setLang, searchQuery, setSearchQuery, user, onAuthRequest, onSignOut }) => {
  const { cartCount } = useCart()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const languageMenuRef = useRef(null)

  const translations = {
    en: {
      search: 'Search products...',
      home: 'Home',
      cart: 'Cart',
      checkout: 'Checkout',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      pickupAt: 'Pick-up at'
    },
    fr: {
      search: 'Rechercher...',
      home: 'Accueil',
      cart: 'Panier',
      checkout: 'Paiement',
      signIn: 'Se connecter',
      signOut: 'Se deconnecter',
      pickupAt: 'Retrait a'
    },
    kn: {
      search: 'Shaka ibicuruzwa...',
      home: 'Ahabanza',
      cart: 'Ikarita',
      checkout: 'Kwishura',
      signIn: 'Injira',
      signOut: 'Sohoka',
      pickupAt: 'Gukura kuri'
    }
  }

  const t = translations[lang]
  const navItems = [
    { to: '/', label: t.home },
    { to: '/cart', label: t.cart },
    { to: '/checkout', label: t.checkout }
  ]

  const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Francais' },
    { code: 'kn', label: 'Kinyarwanda' }
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setIsLanguageOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className={`navbar ${isCinematic ? 'is-cinematic' : ''}`}>
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
            window.setTimeout(() => {
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 80)
            setIsMenuOpen(false)
          }}
        >
          <span className="search-icon-wrap" aria-hidden="true">
            <Search size={18} />
          </span>
          <span className="search-bar-motion" aria-hidden="true">
            <span className="search-bar-lane" />
            <span className="search-bar-bike">
              <svg viewBox="0 0 24 24" className="search-bar-bike-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 16a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M16 16a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4" />
                <path d="M13 6h2l1.5 3l2 4" />
              </svg>
            </span>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
          />
        </form>

        {/* Actions */}
        <div className="top-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <Link
            to="/"
            className="nav-btn home-btn desktop-only"
            onClick={() => {
              setIsMenuOpen(false)
              setIsLanguageOpen(false)
            }}
            title={t.home}
            aria-label={t.home}
          >
            <House size={17} />
            <span>{t.home}</span>
          </Link>

          {/* Language */}
          <div className="language-menu desktop-only" ref={languageMenuRef}>
            <button
              className="nav-btn lang-btn"
              onClick={() => setIsLanguageOpen((open) => !open)}
              title="Choose language"
              aria-haspopup="menu"
              aria-expanded={isLanguageOpen}
              type="button"
            >
              <Languages size={17} />
              <span>{lang}</span>
            </button>

            {isLanguageOpen && (
              <div className="language-dropdown" role="menu" aria-label="Language options">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    className={`language-option ${lang === option.code ? 'is-active' : ''}`}
                    onClick={() => {
                      setLang(option.code)
                      setIsLanguageOpen(false)
                    }}
                    role="menuitemradio"
                    aria-checked={lang === option.code}
                  >
                    <span>{option.label}</span>
                    {lang === option.code && <span className="language-option-check">Selected</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

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
          <div className="mobile-language-group">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                type="button"
                className={`mobile-language-btn ${lang === option.code ? 'is-active' : ''}`}
                onClick={() => {
                  setLang(option.code)
                  setIsMenuOpen(false)
                }}
              >
                <Languages size={16} />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
