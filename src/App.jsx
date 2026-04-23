import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartToast from './components/CartToast'
import AuthModal from './components/AuthModal'
import ReviewPrompt from './components/ReviewPrompt'
import Home from './pages/HomePage'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'
import LoadingScreen from './components/LoadingScreen'
import { AnimatePresence } from 'framer-motion'

const REVIEW_STORAGE_KEY = 'simba_reviews'
const REVIEW_COLORS = ['#f58220', '#111827', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4']

function App() {
  const [theme, setTheme] = useState('light')
  const [lang, setLang] = useState('en')
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')
  const [authOpen, setAuthOpen] = useState(false)
  const [authDefaultView, setAuthDefaultView] = useState('signin')
  const [postAuthPath, setPostAuthPath] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userReviews, setUserReviews] = useState([])
  const [reviewPrompt, setReviewPrompt] = useState({ open: false, source: null })
  const [reviewPromptState, setReviewPromptState] = useState({ hasSeen: false, hasReviewed: false })
  const navigate = useNavigate()
  const location = useLocation()
  
  const isCinematic = location.pathname.startsWith('/product/')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const stored = localStorage.getItem('simba_auth')
    if (!stored) return

    try {
      const parsed = JSON.parse(stored)
      setUser(parsed.user || null)
      setToken(parsed.token || '')
    } catch (_error) {
      localStorage.removeItem('simba_auth')
      setUser(null)
      setToken('')
    }
  }, [])

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('simba_auth', JSON.stringify({ user, token }))
    } else {
      localStorage.removeItem('simba_auth')
    }
  }, [user, token])

  useEffect(() => {
    const storedReviews = localStorage.getItem(REVIEW_STORAGE_KEY)
    if (!storedReviews) return

    try {
      const parsedReviews = JSON.parse(storedReviews)
      setUserReviews(Array.isArray(parsedReviews) ? parsedReviews : [])
    } catch (_error) {
      localStorage.removeItem(REVIEW_STORAGE_KEY)
      setUserReviews([])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(userReviews))
  }, [userReviews])

  useEffect(() => {
    const activeName = (user?.name || '').trim().toLowerCase()
    if (!activeName) {
      setReviewPromptState((current) => ({ ...current, hasReviewed: false }))
      return
    }

    const reviewed = userReviews.some((review) => (review.name || '').trim().toLowerCase() === activeName)
    setReviewPromptState((current) => ({ ...current, hasReviewed: reviewed }))
  }, [user, userReviews])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const handleAuthRequest = ({ view = 'signin', redirectTo = null } = {}) => {
    setAuthDefaultView(view)
    setPostAuthPath(redirectTo)
    setAuthOpen(true)
  }

  const handleAuthSuccess = ({ user: signedInUser, token: userToken }) => {
    setUser(signedInUser)
    setToken(userToken)
    setAuthOpen(false)
    if (postAuthPath) {
      navigate(postAuthPath)
      setPostAuthPath(null)
    }
  }

  const handleSignOut = () => {
    setUser(null)
    setToken('')
    setPostAuthPath(null)
    setAuthOpen(false)
  }

  const openReviewPrompt = (source = 'general') => {
    if (reviewPromptState.hasReviewed) return
    setReviewPromptState((current) => ({ ...current, hasSeen: true }))
    setReviewPrompt({ open: true, source })
  }

  const closeReviewPrompt = () => {
    setReviewPrompt({ open: false, source: null })
  }

  const handleReviewSubmit = ({ rating, message }) => {
    const displayName = (user?.name || 'Simba Shopper').trim()
    const initials = displayName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('') || 'SS'

    const review = {
      id: Date.now(),
      name: displayName,
      location: 'Simba Online',
      text: message.trim(),
      rating,
      date: 'Just now',
      initials,
      color: REVIEW_COLORS[userReviews.length % REVIEW_COLORS.length],
      verified: !!user
    }

    setUserReviews((currentReviews) => [review, ...currentReviews])
    setReviewPromptState({ hasSeen: true, hasReviewed: true })
    closeReviewPrompt()
  }

  return (
    <CartProvider>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      <div className={`app ${isCinematic ? 'is-cinematic' : ''}`}>
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          lang={lang}
          setLang={setLang}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          user={user}
          onAuthRequest={handleAuthRequest}
          onSignOut={handleSignOut}
        />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  lang={lang}
                  user={user}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onAuthRequest={handleAuthRequest}
                  reviews={userReviews}
                  onReviewPromptOpen={openReviewPrompt}
                  reviewPromptState={reviewPromptState}
                />
              }
            />
            <Route path="/product/:id" element={<ProductDetail lang={lang} />} />
            <Route
              path="/cart"
              element={<Cart lang={lang} user={user} onAuthRequest={handleAuthRequest} />}
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  lang={lang}
                  user={user}
                  token={token}
                  onAuthRequest={handleAuthRequest}
                  onReviewPromptOpen={openReviewPrompt}
                />
              }
            />
          </Routes>
        </main>
        <Footer lang={lang} isCinematic={isCinematic} />
        <CartToast lang={lang} />
        <AuthModal
          open={authOpen}
          lang={lang}
          defaultView={authDefaultView}
          onClose={() => setAuthOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
        <ReviewPrompt
          open={reviewPrompt.open}
          lang={lang}
          source={reviewPrompt.source}
          user={user}
          onClose={closeReviewPrompt}
          onSubmit={handleReviewSubmit}
        />
      </div>
    </CartProvider>
  )
}

export default App
