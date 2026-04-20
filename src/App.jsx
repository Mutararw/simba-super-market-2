import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartToast from './components/CartToast'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'

function App() {
  const [theme, setTheme] = useState('light')
  const [lang, setLang] = useState('en')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <CartProvider>
      <div className="app">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          lang={lang}
          setLang={setLang}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home lang={lang} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
            <Route path="/product/:id" element={<ProductDetail lang={lang} />} />
            <Route path="/cart" element={<Cart lang={lang} />} />
            <Route path="/checkout" element={<Checkout lang={lang} />} />
          </Routes>
        </main>
        <Footer lang={lang} />
        <CartToast lang={lang} />
      </div>
    </CartProvider>
  )
}

export default App
