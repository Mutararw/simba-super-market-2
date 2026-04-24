import React, { useEffect, useMemo, useRef, useState } from 'react'
import productData from '../assets/products.json'
import ProductCard from '../components/ProductCard'
import { ChevronRight, UserRound, MapPin, Clock3, Star, Heart, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import food1 from '../assets/hero/food_1.png'
import food2 from '../assets/hero/food_2.png'
import food3 from '../assets/hero/food_3.png'
import simbaLogo from '../assets/simba-logo.png'
import { api } from '../api'

const FALLBACK_CATEGORY_IMAGE = 'https://placehold.co/400x500/f58220/ffffff?text=Simba'

const BRANCHES_KIGALI = [
  { id: 'remera', name: 'Simba Remera' },
  { id: 'kimironko', name: 'Simba Kimironko' },
  { id: 'kacyiru', name: 'Simba Kacyiru' },
  { id: 'nyamirambo', name: 'Simba Nyamirambo' },
  { id: 'gikondo', name: 'Simba Gikondo' },
  { id: 'kanombe', name: 'Simba Kanombe' },
  { id: 'kinyinya', name: 'Simba Kinyinya' },
  { id: 'kibagabaga', name: 'Simba Kibagabaga' },
  { id: 'nyanza', name: 'Simba Nyanza' }
]

const STATIC_REVIEWS = [
  { id: 1, name: 'Alice Mukantwari', location: 'Kigali, Gacuriro', text: 'Simba Gacuriro is a whole experience. Modern, spacious, and everything is well-organized. The bakery section is a must every time.', rating: 5, date: '2 days ago', initials: 'AM', color: '#f58220', verified: true },
  { id: 2, name: 'David Kwizera', location: 'Kigali, Gishushu', text: 'Always my go-to for imported goods and fresh local produce in Kigali. The variety is unmatched.', rating: 5, date: '1 week ago', initials: 'DK', color: '#111827', verified: true },
  { id: 3, name: 'Jean-Paul Rugero', location: 'Kigali, Kimironko', text: 'Best bakery in town. Their pastries and cakes are always fresh and the branch is reliable for daily household shopping.', rating: 5, date: '3 days ago', initials: 'JR', color: '#3b82f6', verified: true },
  { id: 4, name: 'Sarah Teta', location: 'Kigali, Downtown', text: 'Love the convenience of Simba. The staff is professional and the stores are always well-stocked.', rating: 5, date: '4 days ago', initials: 'ST', color: '#10b981', verified: true },
  { id: 5, name: 'Eric Habimana', location: 'Kigali, Gishushu', text: 'Great place, great food, and great prices. Always my first stop for groceries in Kigali.', rating: 5, date: 'Today', initials: 'EH', color: '#8b5cf6', verified: true },
  { id: 6, name: 'Grace Umutoni', location: 'Kigali, Gishushu', text: 'One of the best places for breakfast. I love the vibe and the quick service at the Gishushu branch.', rating: 5, date: 'Yesterday', initials: 'GU', color: '#ec4899', verified: true },
  { id: 7, name: 'Patrick Munyaneza', location: 'Kigali, Nyamirambo', text: 'You get items at much lower prices compared to most shops in town. Very reliable for bulk shopping.', rating: 5, date: '2 days ago', initials: 'PM', color: '#06b6d4', verified: true },
  { id: 8, name: 'Linda Uwase', location: 'Kigali, Remera', text: 'I was impressed by the variety and quality of products. The staff helped me find everything I needed.', rating: 5, date: '3 days ago', initials: 'LU', color: '#f97316', verified: true },
  { id: 9, name: 'Olivier Mugisha', location: 'Kigali, Kacyiru', text: 'The most well-stocked supermarket chain. They accept card payments easily, which is a huge plus.', rating: 5, date: '1 week ago', initials: 'OM', color: '#6366f1', verified: true }
]

const HomePage = ({ lang, user, searchQuery, setSearchQuery, onAuthRequest, reviews = [], onReviewPromptOpen, reviewPromptState }) => {
  const [allProducts, setAllProducts] = useState(productData.products || [])
  const [products, setProducts] = useState(productData.products || [])
  const [category, setCategory] = useState('All')
  const [heroIndex, setHeroIndex] = useState(0)
  const [likedReviews, setLikedReviews] = useState({})
  const [focusedReview, setFocusedReview] = useState(null)
  const [hasLocation, setHasLocation] = useState(false)
  const [showLocationPrompt, setShowLocationPrompt] = useState(false)
  const [reviewClickCount, setReviewClickCount] = useState(0)
  const reviewPromptTimerRef = useRef(null)
  const reviewAreaTimerRef = useRef(null)
  const heroImages = [food1, food2, food3]

  const categorySummaries = useMemo(() => {
    const summaryMap = new Map()

    for (const product of allProducts) {
      if (!product?.category) continue

      if (!summaryMap.has(product.category)) {
        summaryMap.set(product.category, {
          name: product.category,
          count: 0,
          image: product.image || FALLBACK_CATEGORY_IMAGE
        })
      }

      const entry = summaryMap.get(product.category)
      entry.count += 1
      if (!entry.image && product.image) {
        entry.image = product.image
      }
    }

    return [
      {
        name: 'All',
        count: allProducts.length,
        image: allProducts[0]?.image || FALLBACK_CATEGORY_IMAGE
      },
      ...Array.from(summaryMap.values()).sort((a, b) => a.name.localeCompare(b.name))
    ]
  }, [allProducts])
  const mergedReviews = useMemo(() => [...reviews, ...STATIC_REVIEWS], [reviews])

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages.length])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backendProducts = await api.getProducts()
        if (Array.isArray(backendProducts) && backendProducts.length > 0) {
          setAllProducts(backendProducts)
          setProducts(backendProducts)
          return
        }
      } catch (_error) {
        // fallback below
      }

      setAllProducts(productData.products || [])
      setProducts(productData.products || [])
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = allProducts
    if (category !== 'All') filtered = filtered.filter((p) => p.category === category)
    if (searchQuery) filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setProducts(filtered)
  }, [allProducts, category, searchQuery])

  useEffect(() => {
    return () => {
      if (reviewPromptTimerRef.current) window.clearTimeout(reviewPromptTimerRef.current)
      if (reviewAreaTimerRef.current) window.clearTimeout(reviewAreaTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (reviewPromptState?.hasReviewed) {
      clearReviewTimers()
      setReviewClickCount(0)
    }
  }, [reviewPromptState?.hasReviewed])

  const translations = {
    en: {
      heroTitle: 'Groceries in minutes, delivered smart',
      heroSub: 'Pick your essentials, keep your cart ready, and sign in now or at checkout.',
      featured: 'Featured Products',
      categories: 'Shop by Category',
      categorySub: 'Browse the same visual category experience with hover explore and product counts.',
      empty: 'No products found for your search.',
      startOrder: 'Start your order',
      signin: 'Sign in first',
      continueAsGuest: 'Continue as guest',
      items: 'products found',
      categoryItems: 'items',
      explore: 'Explore',
      clearFilters: 'Clear Filters'
    },
    fr: {
      heroTitle: 'Vos courses en minutes, livrees rapidement',
      heroSub: 'Ajoutez des articles, puis connectez-vous maintenant ou au paiement.',
      featured: 'Produits Vedettes',
      categories: 'Acheter par Categorie',
      categorySub: 'Parcourez les categories avec effet hover, bouton Explore et compteur de produits.',
      empty: 'Aucun produit trouve pour cette recherche.',
      startOrder: 'Commencer la commande',
      signin: 'Se connecter',
      continueAsGuest: 'Continuer en invite',
      items: 'produits trouves',
      categoryItems: 'articles',
      explore: 'Explorer',
      clearFilters: 'Effacer les filtres'
    },
    kn: {
      heroTitle: 'Ibiribwa mu minota mike, byihuse',
      heroSub: 'Ongeramo ibicuruzwa, winjire ubu cyangwa igihe cyo kwishyura.',
      featured: 'Ibicuruzwa Byatoranijwe',
      categories: 'Gura ukurikije Icyiciro',
      categorySub: 'Hitamo ibyiciro ukoresheje amakarita afite hover, Explore n umubare w ibicuruzwa.',
      empty: 'Nta bicuruzwa bibonetse kuri iri shakisha.',
      startOrder: 'Tangira gutumiza',
      signin: 'Injira mbere',
      continueAsGuest: 'Komeza nk umushyitsi',
      items: 'ibicuruzwa byabonetse',
      categoryItems: 'ibintu',
      explore: 'Reba',
      clearFilters: 'Kuraho filitiri'
    }
  }

  const t = translations[lang] || translations.en

  const handleLocationDetection = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {
        setHasLocation(true)
        setShowLocationPrompt(false)
      })
    }
  }

  const handleBranchSelect = (event) => {
    if (!hasLocation) {
      setShowLocationPrompt(true)
      event.target.value = 'Select a Branch...'
    }
  }

  const toggleLike = (event, id) => {
    event.stopPropagation()
    setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const reviewsGridRef = useRef(null)

  useEffect(() => {
    const grid = reviewsGridRef.current
    if (!grid || reviewPromptState?.hasReviewed) return

    const handleScroll = () => {
      if (reviewPromptState?.hasReviewed) return
      
      const isAtEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 50
      if (isAtEnd && !reviewPromptState?.hasSeen) {
        onReviewPromptOpen?.('review-finished-reading')
      }
    }

    grid.addEventListener('scroll', handleScroll)
    return () => grid.removeEventListener('scroll', handleScroll)
  }, [reviewPromptState?.hasReviewed, reviewPromptState?.hasSeen, onReviewPromptOpen])

  const clearReviewTimers = () => {
    if (reviewPromptTimerRef.current) {
      window.clearTimeout(reviewPromptTimerRef.current)
      reviewPromptTimerRef.current = null
    }
    if (reviewAreaTimerRef.current) {
      window.clearTimeout(reviewAreaTimerRef.current)
      reviewAreaTimerRef.current = null
    }
  }

  const startInitialReviewTimer = () => {
    if (reviewPromptState?.hasReviewed || reviewPromptState?.hasSeen || reviewAreaTimerRef.current) return

    reviewAreaTimerRef.current = window.setTimeout(() => {
      reviewAreaTimerRef.current = null
      onReviewPromptOpen?.('review-dwell')
    }, 20000)
  }

  const stopInitialReviewTimer = () => {
    if (!reviewAreaTimerRef.current) return
    window.clearTimeout(reviewAreaTimerRef.current)
    reviewAreaTimerRef.current = null
  }

  const startFollowupReviewTimer = () => {
    if (reviewPromptState?.hasReviewed || !reviewPromptState?.hasSeen) return

    if (reviewPromptTimerRef.current) {
      window.clearTimeout(reviewPromptTimerRef.current)
    }

    reviewPromptTimerRef.current = window.setTimeout(() => {
      reviewPromptTimerRef.current = null
      onReviewPromptOpen?.('review-followup')
    }, 15000)
  }

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
            style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImages[heroIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }}
          />
        </AnimatePresence>

        <div className="container hero-grid" style={{ position: 'relative', zIndex: 1, height: '100%', minHeight: '600px' }}>
          <div className="hero-copy fade-in">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="badge" style={{ background: 'var(--accent)', color: '#000', marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <img src={simbaLogo} alt="Simba" className="hero-logo-badge" />
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
                <strong>Available at 9 Branches</strong>
                <span>Remera, Kimironko & more</span>
              </div>
            </div>
            <div className="hero-row">
              <Clock3 size={18} />
              <div>
                <strong>Pick-up First</strong>
                <span>Ready in 15-30 min</span>
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

      <section className="branch-select-section" style={{ padding: '4rem 0', background: 'white', borderBottom: '1px solid #f1f5f9' }}>
        <div className="container">
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111827', marginBottom: '1rem' }}>Find Your Nearest Simba Branch</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '3rem' }}>Search by location or use your current position to see the quickest route.</p>

            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '450px' }}>
                  <select onChange={handleBranchSelect} style={{ width: '100%', padding: '1.2rem 2rem', fontSize: '1.1rem', fontWeight: '800', borderRadius: '16px', border: '2px solid #e2e8f0', appearance: 'none', background: 'white', cursor: 'pointer', outline: 'none', color: '#111827' }}>
                    <option>Select a Branch...</option>
                    {BRANCHES_KIGALI.map((branch) => <option key={branch.id}>{branch.name}</option>)}
                  </select>
                  <div style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#f58220' }}>
                    <ChevronRight size={20} style={{ transform: 'rotate(90deg)' }} />
                  </div>
                </div>

                <button onClick={handleLocationDetection} className="btn-primary" style={{ borderRadius: '16px', padding: '0 2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', boxShadow: '0 10px 20px rgba(245, 130, 32, 0.2)', background: hasLocation ? '#10b981' : 'var(--accent)' }}>
                  <MapPin size={20} /> {hasLocation ? 'Location Active' : 'Use Current Location'}
                </button>
              </div>

              {/* Premium Location Prompt Modal */}
              <AnimatePresence>
                {showLocationPrompt && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      background: 'rgba(0, 0, 0, 0.4)', 
                      backdropFilter: 'blur(10px)',
                      zIndex: 100,
                      borderRadius: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1.5rem'
                    }}
                  >
                    <motion.div 
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="glass"
                      style={{ 
                        background: 'white', 
                        padding: '2.5rem', 
                        borderRadius: '24px', 
                        maxWidth: '400px', 
                        width: '100%',
                        textAlign: 'center',
                        position: 'relative',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.3)'
                      }}
                    >
                      {/* Close Button */}
                      <button 
                        onClick={() => setShowLocationPrompt(false)}
                        style={{ 
                          position: 'absolute', 
                          top: '1rem', 
                          right: '1.2rem', 
                          background: '#f1f5f9', 
                          border: 'none', 
                          borderRadius: '50%', 
                          width: '32px', 
                          height: '32px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: '#64748b'
                        }}
                      >
                        <X size={18} />
                      </button>

                      <div style={{ 
                        width: '72px', 
                        height: '72px', 
                        background: '#fff7ed', 
                        color: '#f58220', 
                        borderRadius: '20px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        margin: '0 auto 1.5rem',
                        transform: 'rotate(-5deg)'
                      }}>
                        <MapPin size={36} />
                      </div>

                      <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#111827', marginBottom: '0.8rem', lineHeight: '1.2' }}>
                        Set Your Starting Point
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                        We need your location to show the road to your nearest Simba Supermarket.
                      </p>

                      <button 
                        className="btn-primary" 
                        onClick={handleLocationDetection}
                        style={{ 
                          width: '100%',
                          padding: '1.2rem', 
                          borderRadius: '14px', 
                          fontSize: '1rem',
                          fontWeight: '800',
                          boxShadow: '0 10px 20px rgba(245, 130, 32, 0.3)' 
                        }}
                      >
                        Find My Location
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="glass" style={{ height: '500px', borderRadius: '32px', border: '2px solid #e2e8f0', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
              <iframe title="Simba Supermarket Locations Kigali" width="100%" height="100%" style={{ border: 0, borderRadius: '32px' }} loading="lazy" src="https://www.google.com/maps?q=Simba+Supermarket+Kigali+Rwanda&output=embed" />
            </div>
          </div>
        </div>
      </section>

      <div className="container" id="categories-section">
        <div className="section-padding">
          <section className="category-showcase">
            <div className="category-showcase-header">
              <div>
                <h2 className="category-showcase-title">{t.categories}</h2>
                <p className="category-showcase-subtitle">{t.categorySub}</p>
              </div>
              <span className="category-showcase-count">{categorySummaries.length - 1} categories · {allProducts.length} products</span>
            </div>

            <div className="category-showcase-grid">
              {categorySummaries.map((entry) => (
                <button
                  key={entry.name}
                  type="button"
                  onClick={() => setCategory(entry.name)}
                  className={`category-showcase-card ${category === entry.name ? 'is-active' : ''}`}
                >
                  <img
                    src={entry.image || FALLBACK_CATEGORY_IMAGE}
                    alt={entry.name}
                    className="category-showcase-image"
                    onError={(event) => {
                      event.currentTarget.src = FALLBACK_CATEGORY_IMAGE
                    }}
                  />
                  <div className="category-showcase-overlay" />
                  <div className="category-showcase-content">
                    <span className="category-showcase-meta">{entry.count} {t.categoryItems}</span>
                    <strong className="category-showcase-name">{entry.name}</strong>
                    <span className="category-showcase-cta">
                      {t.explore} <ChevronRight size={14} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section id="products" className="category-results-panel">
            <div className="category-results-header">
              <div>
                <h2 className="category-results-title">{category === 'All' ? t.featured : category}</h2>
                <p className="category-results-subtitle">{products.length} {t.items}</p>
              </div>
              {(category !== 'All' || searchQuery) && (
                <button
                  type="button"
                  className="category-reset-btn"
                  onClick={() => {
                    setCategory('All')
                    setSearchQuery('')
                  }}
                >
                  {t.clearFilters}
                </button>
              )}
            </div>

            {products.length === 0 ? (
              <div className="glass empty-state">
                <h3>{t.empty}</h3>
                <button className="btn-primary" onClick={() => { setCategory('All'); setSearchQuery('') }}>{t.clearFilters}</button>
              </div>
            ) : (
              <div className="product-grid">
                {products.slice(0, 12).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <section className="reviews-section">
        <div className="container">
          <div className="reviews-header">
            <span className="reviews-badge">Why Choose Simba</span>
            <h2 className="reviews-title">What Our Community <br /> is Saying About Simba</h2>
            <p className="reviews-subtitle">Real experiences from Simba Supermarket shoppers across Kigali.</p>
          </div>

          <div
            ref={reviewsGridRef}
            className="reviews-grid"
            onMouseEnter={startInitialReviewTimer}
            onMouseLeave={stopInitialReviewTimer}
            style={{ overflowX: 'auto', scrollSnapType: 'x mandatory' }}
          >
            {mergedReviews.map((review) => (
              <motion.div
                key={review.id}
                className={`review-card ${focusedReview === review.id ? 'is-focused' : ''}`}
                whileHover={focusedReview ? {} : { y: -8, boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}
                animate={focusedReview === review.id ? { scale: 1.1, zIndex: 100, boxShadow: '0 40px 80px rgba(0,0,0,0.25)' } : { scale: focusedReview ? 0.95 : 1, opacity: focusedReview && focusedReview !== review.id ? 0.4 : 1, zIndex: 1 }}
                onClick={() => {
                  stopInitialReviewTimer()
                  setFocusedReview(focusedReview === review.id ? null : review.id)
                  const nextClickCount = reviewClickCount + 1
                  setReviewClickCount(nextClickCount)

                  if (!reviewPromptState?.hasReviewed && nextClickCount >= 2) {
                    clearReviewTimers()
                    onReviewPromptOpen?.('review-second-click')
                    return
                  }

                  startFollowupReviewTimer()
                }}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <div className="review-card-top">
                  <div className="review-avatar" style={{ background: review.color }}>{review.initials}</div>
                  <div className="review-meta">
                    <span className="review-name" style={{ fontWeight: '800', fontSize: '1.1rem' }}>{review.name}</span>
                    <span className="review-location" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={12} /> {review.location}
                    </span>
                  </div>

                  <div onClick={(event) => toggleLike(event, review.id)} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', background: likedReviews[review.id] ? '#fee2e2' : '#f8fafc', padding: '0.5rem 0.8rem', borderRadius: '100px', color: likedReviews[review.id] ? '#ef4444' : '#64748b', transition: 'all 0.3s ease', border: `1px solid ${likedReviews[review.id] ? '#fecaca' : '#e2e8f0'}` }}>
                    <Heart size={16} fill={likedReviews[review.id] ? '#ef4444' : 'none'} />
                    <span style={{ fontWeight: '800', fontSize: '0.85rem' }}>{likedReviews[review.id] ? '13' : '12'}</span>
                  </div>
                </div>

                <div className="review-stars" style={{ display: 'flex', gap: '0.2rem', margin: '1rem 0' }}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={15} fill={index < review.rating ? '#f59e0b' : 'none'} stroke={index < review.rating ? '#f59e0b' : '#d1d5db'} />
                  ))}
                </div>

                <p className="review-text" style={{ fontSize: focusedReview === review.id ? '1.15rem' : '1rem', lineHeight: '1.6', color: 'var(--text)', fontStyle: 'italic', marginBottom: '1.5rem', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', display: '-webkit-box', WebkitLineClamp: focusedReview === review.id ? 'none' : '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  "{review.text}"
                </p>

                <div className="review-footer" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                  <span className="review-date" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{review.date}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.8rem', fontWeight: '700' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                    {review.verified === false ? 'Community Review' : 'Verified Shopper'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
