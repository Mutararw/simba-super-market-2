import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartToast from './components/CartToast'
import AuthModal from './components/AuthModal'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'
import LoadingScreen from './components/LoadingScreen'
import { AnimatePresence } from 'framer-motion'

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
  const navigate = useNavigate()

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

  return (
    <CartProvider>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      <div className="app">
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
              element={<Checkout lang={lang} user={user} token={token} onAuthRequest={handleAuthRequest} />}
            />
          </Routes>
        </main>
        <Footer lang={lang} />
        <CartToast lang={lang} />
        <AuthModal
          open={authOpen}
          lang={lang}
          defaultView={authDefaultView}
          onClose={() => setAuthOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    </CartProvider>
  )
}

export default App
