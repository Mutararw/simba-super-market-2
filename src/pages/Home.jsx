import React, { useState, useEffect } from 'react'
import productData from '../assets/products.json'
import ProductCard from '../components/ProductCard'
import { Filter, ChevronRight, UserRound, MapPin, Clock3, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import food1 from '../assets/hero/food_1.png'
import food2 from '../assets/hero/food_2.png'
import food3 from '../assets/hero/food_3.png'

const Home = ({ lang, user, searchQuery, setSearchQuery, onAuthRequest }) => {
  const [products, setProducts] = useState(productData.products)
  const [category, setCategory] = useState('All')
  const [heroIndex, setHeroIndex] = useState(0)
  const heroImages = [food1, food2, food3]

  const categories = ['All', ...new Set(productData.products.map((p) => p.category))]

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const translations = {
    en: {
      heroTitle: 'Groceries in minutes, delivered smart',
      heroSub: 'Pick your essentials, keep your cart ready, and sign in now or at checkout.',
      featured: 'Featured Products',
      categories: 'Shop by Category',
      empty: 'No products found for your search.',
      startOrder: 'Start your order',
      signin: 'Sign in first',
      continueAsGuest: 'Continue as guest',
      eta: 'Estimated delivery',
      location: 'Kigali Heights',
      items: 'products found'
    },
    fr: {
      heroTitle: 'Vos courses en minutes, livrees rapidement',
      heroSub: 'Ajoutez des articles, puis connectez-vous maintenant ou au paiement.',
      featured: 'Produits Vedettes',
      categories: 'Acheter par Categorie',
      empty: 'Aucun produit trouve pour cette recherche.',
      startOrder: 'Commencer la commande',
      signin: 'Se connecter',
      continueAsGuest: 'Continuer en invite',
      eta: 'Livraison estimee',
      location: 'Kigali Heights',
      items: 'produits trouves'
    },
    kn: {
      heroTitle: 'Ibiribwa mu minota mike, byihuse',
      heroSub: 'Ongeramo ibicuruzwa, winjire ubu cyangwa igihe cyo kwishyura.',
      featured: 'Ibicuruzwa Byatoranijwe',
      categories: 'Gura ukurikije Icyiciro',
      empty: 'Nta bicuruzwa bibonetse kuri iri shakisha.',
      startOrder: 'Tangira gutumiza',
      signin: 'Injira mbere',
      continueAsGuest: 'Komeza nk umushyitsi',
      eta: 'Igihe cyo kugera',
      location: 'Kigali Heights',
      items: 'ibicuruzwa byabonetse'
    }
  }

  const t = translations[lang]

  useEffect(() => {
    let filtered = productData.products

    if (category !== 'All') {
      filtered = filtered.filter((p) => p.category === category)
    }

    if (searchQuery) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    setProducts(filtered)
  }, [category, searchQuery])

  return (
    <div className="home-page">
      <section className="hero-getir" style={{ position: 'relative', overflow: 'hidden', minHeight: '600px', background: '#000' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${heroImages[heroIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0
            }}
          />
        </AnimatePresence>

        <div className="container hero-grid" style={{ position: 'relative', zIndex: 1, height: '100%', minHeight: '600px' }}>
          <div className="hero-copy fade-in">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="badge" style={{ background: 'var(--accent)', color: '#000', marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Star size={14} fill="currentColor" /> <span>Top Rated Food & Groceries</span>
              </div>
              <h1 style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>{t.heroTitle}</h1>
              <p style={{ fontSize: '1.2rem', textShadow: '0 1px 5px rgba(0,0,0,0.3)' }}>{t.heroSub}</p>
              <button className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' })}>
                {t.startOrder} <ChevronRight size={18} />
              </button>
            </motion.div>
          </div>

          <div className="hero-card fade-in">
            <div className="hero-row">
              <MapPin size={18} />
              <div>
                <strong>{t.location}</strong>
                <span>{t.eta}: 10-25 min</span>
              </div>
            </div>
            <div className="hero-row">
              <Clock3 size={18} />
              <div>
                <strong>08:00 - 01:00</strong>
                <span>Delivery window</span>
              </div>
            </div>

            {user ? (
              <button className="btn-primary hero-auth-btn">
                <UserRound size={18} /> {user.name}
              </button>
            ) : (
              <div className="hero-auth-actions">
                <button className="btn-primary hero-auth-btn" onClick={() => onAuthRequest({ view: 'signin' })}>
                  <UserRound size={18} /> {t.signin}
                </button>
                <button className="ghost-auth-btn" onClick={() => onAuthRequest({ view: 'signin', redirectTo: '/checkout' })}>
                  {t.continueAsGuest}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container" id="categories-section">
        <div style={{ marginTop: '4rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>{t.categories}</h2>
        </div>
        <div className="categories-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`category-pill ${category === cat ? 'is-active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <section className="trust-strip">
          <div className="trust-card">
            <strong>5,000+</strong>
            <span>Happy Shoppers</span>
          </div>
          <div className="trust-card">
            <strong>Same Day</strong>
            <span>Delivery in Kigali</span>
          </div>
          <div className="trust-card">
            <strong>Secure</strong>
            <span>Safe Checkout</span>
          </div>
        </section>

        <section className="section-padding" id="products">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>{t.featured}</h2>
            <span style={{ color: 'var(--text-muted)' }}>{products.length} {t.items}</span>
          </div>

          {products.length === 0 ? (
            <div className="glass empty-state">
              <h3>{t.empty}</h3>
              <button
                className="btn-primary"
                onClick={() => {
                  setCategory('All')
                  setSearchQuery('')
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Home
