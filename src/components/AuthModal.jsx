import React, { useMemo, useState, useEffect } from 'react'
import { X, UserRound, Mail, ArrowRight, Lock, ShieldCheck } from 'lucide-react'
import { api } from '../api'
import simbaLogo from '../assets/simba-logo.png'

const copy = {
  en: {
    title: 'Continue with Simba',
    subtitle: 'Sign in now or continue as guest and sign in at checkout.',
    signIn: 'Sign in',
    register: 'Create account',
    name: 'Full name',
    accountType: 'Sign up as',
    userType: 'User',
    adminType: 'Admin',
    adminRole: 'Admin role',
    managerRole: 'Manager',
    inventoryRole: 'Inventory',
    catalogRole: 'Catalog Editor',
    email: 'Email',
    password: 'Password',
    submitSignIn: 'Sign in and continue',
    submitRegister: 'Create account and continue',
    authFailed: 'Authentication failed. Check your details.'
  },
  fr: {
    title: 'Continuer avec Simba',
    subtitle: 'Connectez-vous maintenant ou plus tard lors du paiement.',
    signIn: 'Se connecter',
    register: 'Creer un compte',
    name: 'Nom complet',
    accountType: 'Inscription en tant que',
    userType: 'Utilisateur',
    adminType: 'Admin',
    adminRole: 'Role admin',
    managerRole: 'Manager',
    inventoryRole: 'Inventaire',
    catalogRole: 'Editeur catalogue',
    email: 'Email',
    password: 'Mot de passe',
    submitSignIn: 'Se connecter et continuer',
    submitRegister: 'Creer et continuer',
    authFailed: 'Echec de connexion. Verifiez vos informations.'
  },
  kn: {
    title: 'Komeza ukoresheje Simba',
    subtitle: 'Injira ubu cyangwa winjire igihe cyo kwishyura.',
    signIn: 'Injira',
    register: 'Fungura konti',
    name: 'Amazina',
    accountType: 'Iyandikishe nka',
    userType: 'Umukoresha',
    adminType: 'Admin',
    adminRole: 'Uruhare rwa admin',
    managerRole: 'Manager',
    inventoryRole: 'Ububiko',
    catalogRole: 'Muhindura katalogi',
    email: 'Imeyili',
    password: 'Ijambo banga',
    submitSignIn: 'Injira ukomeze',
    submitRegister: 'Fungura konti ukomeze',
    authFailed: 'Kwinjira byanze. Reba amakuru wanditse.'
  }
}

const AuthModal = ({ open, lang, defaultView = 'signin', onClose, onAuthSuccess }) => {
  const [view, setView] = useState(defaultView)
  const [name, setName] = useState('')
  const [accountType, setAccountType] = useState('user')
  const [adminRole, setAdminRole] = useState('manager')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const t = copy[lang] || copy.en

  useEffect(() => {
    if (open) setView(defaultView)
  }, [open, defaultView])

  const canSubmit = useMemo(() => {
    if (view === 'signin') {
      return email.trim().length > 5 && password.length >= 6
    }
    if (accountType === 'admin') {
      return name.trim().length > 1 && email.trim().length > 5 && password.length >= 6 && !!adminRole
    }
    return name.trim().length > 1 && email.trim().length > 5 && password.length >= 6
  }, [view, email, password, name, accountType, adminRole])

  if (!open) return null

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!canSubmit || submitting) return

    setSubmitting(true)
    setErrorMessage('')
    try {
      const payload = { email: email.trim(), password }
      const response = view === 'signin'
        ? await api.login(payload)
        : await api.register({
            ...payload,
            name: name.trim(),
            accountType,
            adminRole: accountType === 'admin' ? adminRole : null
          })

      onAuthSuccess({
        user: response.user,
        token: response.token
      })

      setName('')
      setAccountType('user')
      setAdminRole('manager')
      setEmail('')
      setPassword('')
      setView(defaultView)
    } catch (error) {
      setErrorMessage(error.message || t.authFailed)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-modal-backdrop" role="dialog" aria-modal="true">
      <div className={`auth-modal-card ${view === 'register' && accountType === 'admin' ? 'is-admin-mode' : ''}`}>
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

        <div className={`auth-brand-panel ${view === 'register' && accountType === 'admin' ? 'is-compact' : ''}`} aria-hidden="true">
          <img src={simbaLogo} alt="Simba logo" className="auth-brand-logo" />
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {view === 'register' && (
            <>
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

              <label>
                <span>{t.accountType}</span>
                <div className="auth-input-wrap">
                  <ShieldCheck size={16} />
                  <select
                    value={accountType}
                    onChange={(event) => setAccountType(event.target.value)}
                  >
                    <option value="user">{t.userType}</option>
                    <option value="admin">{t.adminType}</option>
                  </select>
                </div>
              </label>

              {accountType === 'admin' && (
                <label>
                  <span>{t.adminRole}</span>
                  <div className="auth-input-wrap">
                    <ShieldCheck size={16} />
                    <select
                      value={adminRole}
                      onChange={(event) => setAdminRole(event.target.value)}
                    >
                      <option value="manager">{t.managerRole}</option>
                      <option value="inventory">{t.inventoryRole}</option>
                      <option value="catalog_editor">{t.catalogRole}</option>
                    </select>
                  </div>
                </label>
              )}
            </>
          )}

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

          <label>
            <span>{t.password}</span>
            <div className="auth-input-wrap">
              <Lock size={16} />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="******"
              />
            </div>
          </label>

          {errorMessage && <small style={{ color: '#dc2626' }}>{errorMessage}</small>}

          <button className="btn-primary auth-submit" disabled={!canSubmit || submitting}>
            {view === 'signin' ? t.submitSignIn : t.submitRegister} <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthModal
