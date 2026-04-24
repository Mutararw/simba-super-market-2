import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, ShoppingBasket, Gift, Sparkles } from 'lucide-react'

const ReviewSurprise = ({ open, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 6000)
      return () => clearTimeout(timer)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="review-surprise-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(245, 130, 32, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            color: 'white',
            textAlign: 'center',
            padding: '2rem'
          }}
        >
          {/* Floating Background Icons */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 100,
                rotate: 0,
                opacity: 0 
              }}
              animate={{ 
                y: -100, 
                rotate: 360,
                opacity: [0, 0.6, 0] 
              }}
              transition={{ 
                duration: 4 + Math.random() * 4, 
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{
                position: 'absolute',
                zIndex: 0
              }}
            >
              {i % 4 === 0 ? <Heart size={24 + Math.random() * 20} fill="white" /> : 
               i % 4 === 1 ? <Star size={24 + Math.random() * 20} fill="white" /> :
               i % 4 === 2 ? <ShoppingBasket size={24 + Math.random() * 20} /> :
               <Gift size={24 + Math.random() * 20} />}
            </motion.div>
          ))}

          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100 }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              style={{ marginBottom: '2rem', display: 'inline-block' }}
            >
              <div style={{ 
                background: 'white', 
                color: 'var(--primary)', 
                padding: '1.5rem', 
                borderRadius: '30px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
              }}>
                <Sparkles size={64} fill="currentColor" />
              </div>
            </motion.div>

            <h1 style={{ 
              fontSize: 'clamp(3rem, 8vw, 5rem)', 
              fontWeight: '900', 
              marginBottom: '1rem',
              textShadow: '0 4px 20px rgba(0,0,0,0.2)',
              fontFamily: 'var(--font-display)'
            }}>
              THANK YOU!
            </h1>
            
            <p style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.4',
              opacity: 0.95
            }}>
              Your review means the world to us. <br />
              With love, from our <br />
              <span style={{ fontSize: '2rem', display: 'block', marginTop: '1rem' }}>
                🦁 Simba Supermarket Family
              </span>
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              style={{
                marginTop: '3rem',
                background: 'white',
                color: 'var(--primary)',
                padding: '1rem 3rem',
                borderRadius: '999px',
                fontSize: '1.2rem',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ReviewSurprise
