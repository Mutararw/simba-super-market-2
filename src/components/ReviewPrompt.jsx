import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquarePlus, Star, X } from 'lucide-react'

const copy = {
  en: {
    reviewTitle: 'Tell us how Simba feels',
    reviewBody: 'Your feedback helps other shoppers and keeps the experience improving.',
    checkoutBody: 'Your payment went through. Share a quick review about your Simba experience.',
    submit: 'Post review',
    placeholder: 'Write your review here...',
    signedInAs: 'Posting as'
  },
  fr: {
    reviewTitle: 'Donnez votre avis sur Simba',
    reviewBody: 'Votre avis aide les autres clients et nous aide a ameliorer le service.',
    checkoutBody: 'Votre paiement est termine. Partagez un petit avis sur votre experience Simba.',
    submit: 'Publier',
    placeholder: 'Ecrivez votre avis ici...',
    signedInAs: 'Publication en tant que'
  },
  kn: {
    reviewTitle: 'Tubwire uko wabonye Simba',
    reviewBody: 'Ibitekerezo byawe bifasha abandi baguzi kandi bituma serivisi irushaho kuba nziza.',
    checkoutBody: 'Kwishyura byakunze. Andika igitekerezo gito ku bunararibonye bwawe na Simba.',
    submit: 'Ohereza review',
    placeholder: 'Andika review yawe hano...',
    signedInAs: 'Iriherezwa nka'
  }
}

const ReviewPrompt = ({ open, lang, source, user, onClose, onSubmit }) => {
  const [rating, setRating] = useState(5)
  const [message, setMessage] = useState('')

  const t = copy[lang] || copy.en
  const bodyText = useMemo(() => {
    return source === 'checkout-success' ? t.checkoutBody : t.reviewBody
  }, [source, t])

  useEffect(() => {
    if (!open) {
      setRating(5)
      setMessage('')
    }
  }, [open])

  const canSubmit = message.trim().length >= 12

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="review-prompt-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="review-prompt-card"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <button type="button" className="review-prompt-close" onClick={onClose} aria-label="Close review prompt">
              <X size={18} />
            </button>

            <div className="review-prompt-badge">
              <MessageSquarePlus size={18} />
              <span>Simba Reviews</span>
            </div>

            <h3>{t.reviewTitle}</h3>
            <p>{bodyText}</p>

            <div className="review-prompt-user">
              <span>{t.signedInAs}</span>
              <strong>{user?.name || 'Simba Shopper'}</strong>
            </div>

            <div className="review-prompt-stars" role="radiogroup" aria-label="Review rating">
              {Array.from({ length: 5 }).map((_, index) => {
                const starValue = index + 1
                return (
                  <button
                    key={starValue}
                    type="button"
                    className={`review-star-btn ${rating >= starValue ? 'is-active' : ''}`}
                    onClick={() => setRating(starValue)}
                    aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
                  >
                    <Star size={20} fill={rating >= starValue ? '#f59e0b' : 'none'} />
                  </button>
                )
              })}
            </div>

            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={t.placeholder}
              rows={4}
            />

            <button
              type="button"
              className="btn-primary review-prompt-submit"
              disabled={!canSubmit}
              onClick={() => {
                if (!canSubmit) return
                onSubmit({ rating, message })
              }}
            >
              {t.submit}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ReviewPrompt
