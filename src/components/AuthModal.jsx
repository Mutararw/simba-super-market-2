import React, { useMemo, useState, useEffect } from 'react'
import { X, UserRound, Phone, Mail, ArrowRight } from 'lucide-react'

const copy = {
  en: {
    title: 'Continue with Simba',
    subtitle: 'Sign in now or continue as guest and sign in at checkout.',
    signIn: 'Sign in',
    register: 'Create account',
    name: 'Full name',
    phone: 'Phone number',
    email: 'Email (optional)',
    submitSignIn: 'Sign in and continue',
    submitRegister: 'Create account and continue'
  },
  fr: {
    title: 'Continuer avec Simba',
    subtitle: 'Connectez-vous maintenant ou plus tard lors du paiement.',
    signIn: 'Se connecter',
    register: 'Creer un compte',
    name: 'Nom complet',
    phone: 'Numero de telephone',
    email: 'Email (optionnel)',
    submitSignIn: 'Se connecter et continuer',
    submitRegister: 'Creer et continuer'
  },
  kn: {
    title: 'Komeza ukoresheje Simba',
    subtitle: 'Injira ubu cyangwa winjire igihe cyo kwishyura.',
    signIn: 'Injira',
    register: 'Fungura konti',
    name: 'Amazina',
    phone: 'Nimero ya telefone',
    email: 'Imeyili (si ngombwa)',
    submitSignIn: 'Injira ukomeze',
    submitRegister: 'Fungura konti ukomeze'
  }
}

const AuthModal = ({ open, lang, defaultView = 'signin', onClose, onAuthSuccess }) => {
  const [view, setView] = useState(defaultView)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const t = copy[lang] || copy.en

  useEffect(() => {
    if (open) setView(defaultView)
  }, [open, defaultView])

  const phoneDigits = phone.replace(/\D/g, '')
  const canSubmit = useMemo(() => {
    if (view === 'signin') {
      return phoneDigits.length >= 9
    }
    return name.trim().length > 1 && phoneDigits.length >= 9
  }, [view, phoneDigits, name])

  if (!open) return null

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return

    onAuthSuccess({
      id: Date.now(),
      name: name.trim() || 'Guest User',
      phone: phoneDigits,
      email: email.trim(),
      signedInAt: new Date().toISOString()
    })

    setName('')
    setPhone('')
    setEmail('')
    setView(defaultView)
  }

  return (
    <div className="auth-modal-backdrop" role="dialog" aria-modal="true">
      <div className="auth-modal-card">
        <button className="auth-modal-close" onClick={onClose} aria-label="Close sign in modal">
          <X size={18} />
        </button>

        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>

        <div className="auth-tabs">
          <button
            className={view === 'signin' ? 'is-active' : ''}
            onClick={() => setView('signin')}
            type="button"
          >
            {t.signIn}
          </button>
          <button
            className={view === 'register' ? 'is-active' : ''}
            onClick={() => setView('register')}
            type="button"
          >
            {t.register}
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {view === 'register' && (
            <label>
              <span>{t.name}</span>
              <div className="auth-input-wrap">
                <UserRound size={16} />
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="John Doe"
                />
              </div>
            </label>
          )}

          <label>
            <span>{t.phone}</span>
            <div className="auth-input-wrap">
              <Phone size={16} />
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="078X XXX XXX"
              />
            </div>
          </label>

          <label>
            <span>{t.email}</span>
            <div className="auth-input-wrap">
              <Mail size={16} />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
              />
            </div>
          </label>

          <button className="btn-primary auth-submit" disabled={!canSubmit}>
            {view === 'signin' ? t.submitSignIn : t.submitRegister} <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthModal
