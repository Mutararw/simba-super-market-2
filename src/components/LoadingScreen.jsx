import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Utensils, Coffee, Pizza, Soup } from 'lucide-react'

const LoadingScreen = () => {
  const icons = [
    { icon: <ShoppingBag size={40} />, color: '#5d3ebc' },
    { icon: <Utensils size={40} />, color: '#ef4444' },
    { icon: <Coffee size={40} />, color: '#f59e0b' },
    { icon: <Pizza size={40} />, color: '#10b981' },
    { icon: <Soup size={40} />, color: '#3b82f6' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'white',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem'
      }}
    >
      <div style={{ position: 'relative', width: '100px', height: '100px' }}>
        {icons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.5],
              y: [20, 0, 0, -20]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.4,
              times: [0, 0.2, 0.8, 1]
            }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: item.color
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ 
            fontSize: '1.5rem', 
            fontWeight: '800', 
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}
        >
          Simba 2.0
        </motion.h2>
        <p style={{ color: '#6b7280', fontWeight: '500' }}>Preparing your premium shopping experience...</p>
      </div>

      <motion.div
        style={{
          width: '200px',
          height: '4px',
          background: '#e5e7eb',
          borderRadius: '999px',
          overflow: 'hidden',
          marginTop: '1rem'
        }}
      >
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{
            width: '60%',
            height: '100%',
            background: 'var(--primary)',
            borderRadius: '999px'
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default LoadingScreen
