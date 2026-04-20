import React, { useState, useEffect } from 'react'
import productData from '../assets/products.json'
import ProductCard from '../components/ProductCard'
import { Filter, ChevronRight } from 'lucide-react'

const Home = ({ lang, searchQuery, setSearchQuery }) => {
  const [products, setProducts] = useState(productData.products)
  const [category, setCategory] = useState('All')

  const categories = ['All', ...new Set(productData.products.map((p) => p.category))]

  const translations = {
    en: {
      heroTitle: "Shop Rwanda's Best Products",
      heroSub: 'Premium quality, fast delivery, and unbeatable prices.',
      featured: 'Featured Products',
      categories: 'Shop by Category',
      empty: 'No products found for your search.'
    },
    fr: {
      heroTitle: 'Achetez les Meilleurs Produits au Rwanda',
      heroSub: 'Qualite premium, livraison rapide et prix imbattables.',
      featured: 'Produits Vedettes',
      categories: 'Acheter par Categorie',
      empty: 'Aucun produit trouve pour cette recherche.'
    },
    kn: {
      heroTitle: 'Gura ibicuruzwa byiza mu Rwanda',
      heroSub: "Ibicuruzwa byiza, gutanga vuba, n'ibiciro bitagereranywa.",
      featured: 'Ibicuruzwa Byatoranijwe',
      categories: 'Gura ukurikije Icyiciro',
      empty: 'Nta bicuruzwa bibonetse kuri iri shakisha.'
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
      <section
        className="hero"
        style={{
          background:
            'linear-gradient(rgba(5, 16, 34, 0.55), rgba(5, 16, 34, 0.55)), url("https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          marginBottom: '2.5rem'
        }}
      >
        <div className="container fade-in">
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-2px' }}>
            {t.heroTitle}
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 2.25rem' }}>{t.heroSub}</p>
          <button className="btn-primary" style={{ fontSize: '1.05rem', padding: '1rem 2.25rem' }}>
            Shop Now <ChevronRight size={20} />
          </button>
        </div>
      </section>

      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: '600' }}>
            <Filter size={20} />
            <span>{t.categories}:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
                background: category === cat ? 'var(--primary)' : 'var(--card)',
                color: category === cat ? 'white' : 'var(--text)',
                border: '1px solid var(--border)',
                fontWeight: '600',
                transition: 'var(--transition)'
              }}
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

        <section className="section-padding">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>{t.featured}</h2>
            <span style={{ color: 'var(--text-muted)' }}>{products.length} products found</span>
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
