import React from 'react'
import { motion } from 'framer-motion'
import simbaLogo from '../assets/simba-logo.png'

const LoadingScreen = () => {
  const ambientBlobs = [
    { top: '8%', left: '6%', delay: 0 },
    { top: '15%', right: '10%', delay: 0.4 },
    { bottom: '12%', left: '12%', delay: 0.8 },
    { bottom: '10%', right: '8%', delay: 1.2 }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loading-screen"
      role="status"
      aria-live="polite"
      aria-label="Loading Simba experience"
    >
      <div className="loading-overlay" />

      {ambientBlobs.map((blob, index) => (
        <motion.div
          key={index}
          className="loading-blob"
          style={blob}
          animate={{
            y: [0, -18, 0],
            x: [0, index % 2 === 0 ? 12 : -12, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: blob.delay
          }}
        />
      ))}

      <div className="loading-content">
        <motion.div
          className="loading-logo-wrap"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(245, 130, 32, 0.22)',
              '0 0 0 20px rgba(245, 130, 32, 0)',
              '0 0 0 0 rgba(245, 130, 32, 0)'
            ]
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        >
          <motion.div
            animate={{ y: [0, -3, 0], rotate: [0, -1, 1, 0] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src={simbaLogo} alt="Simba logo" className="loading-logo" />
          </motion.div>
        </motion.div>

        <motion.h2
          className="loading-title"
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          Simba
        </motion.h2>
        <p className="loading-subtitle">Preparing your shopping experience...</p>

        <div className="loading-dots" aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              animate={{ y: [0, -7, 0], opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
            />
          ))}
        </div>

        <div className="loading-track">
          <motion.div
            className="loading-progress"
            animate={{ x: ['-110%', '120%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
