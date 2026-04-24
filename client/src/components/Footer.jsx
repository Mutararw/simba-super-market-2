import React from 'react'
import { Share2, Info, MapPin, Phone, Mail } from 'lucide-react'
import simbaLogo from '../assets/simba-logo.png'

const Footer = ({ lang, isCinematic }) => {
  const translations = {
    en: { about: "Simba 2.0 is Rwanda's premier online supermarket, delivering fresh quality products to your doorstep.", contact: 'Contact Us', quickLinks: 'Quick Links', store: 'Store Location' },
    fr: { about: 'Simba 2.0 est le premier supermarche en ligne du Rwanda, livrant des produits frais de qualite a votre porte.', contact: 'Contactez-nous', quickLinks: 'Liens Rapides', store: 'Emplacement du Magasin' },
    kn: { about: 'Simba 2.0 ni isoko rya mbere ryo kuri interineti mu Rwanda, ritanga ibicuruzwa byiza kandi bishya aho utuye.', contact: 'Twandikire', quickLinks: 'Ihuza ryihuse', store: 'Aho dushakira' }
  }

  const t = translations[lang] || translations.en

  const handleShare = async () => {
    const shareData = {
      title: 'Simba 2.0',
      text: 'Shop with Simba 2.0 online.',
      url: window.location.origin
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url)
      }
    } catch (_error) {
      // no-op
    }
  }

  return (
    <footer className={`site-footer footer-section ${isCinematic ? 'is-cinematic' : ''}`}>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand" style={{ marginBottom: '1.2rem' }}>
              <img src={simbaLogo} alt="Simba Supermarket" style={{ height: '48px', width: 'auto' }} />
            </div>
            <p className="footer-about" style={{ fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', borderLeft: '3px solid var(--primary)', paddingLeft: '1rem', marginBottom: '2.5rem' }}>
              "We are ordinary people who've teamed up to accomplish extraordinary things. <br />
              Committed to providing high-quality merchandise for Rwanda's economic resurgence."
            </p>
            <div className="footer-social" style={{ display: 'flex', gap: '0.8rem' }}>
              <button 
                className="footer-icon-btn" 
                onClick={handleShare} 
                aria-label="Share Simba website"
              >
                <Share2 size={20} />
              </button>
              
              {/* WhatsApp */}
              <a
                className="footer-icon-btn social-wa"
                href="https://wa.me/250788300000"
                target="_blank"
                rel="noreferrer"
                aria-label="Open WhatsApp"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                className="footer-icon-btn social-ig"
                href="https://instagram.com/simbasupermarket"
                target="_blank"
                rel="noreferrer"
                aria-label="Open Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E4405F">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>

              {/* X */}
              <a
                className="footer-icon-btn social-x"
                href="https://twitter.com/simbasupermarket"
                target="_blank"
                rel="noreferrer"
                aria-label="Open X"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              <a className="footer-icon-btn" href="mailto:simba@gmail.com?subject=More%20Info%20about%20Simba" aria-label="Email Simba">
                <Info size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="footer-title">{t.quickLinks}</h3>
            <ul className="footer-list">
              <li><a href="/">Home</a></li>
              <li><a href="/#categories-section">Categories</a></li>
              <li><a href="/#products">Best Sellers</a></li>
              <li><a href="/#products">New Arrivals</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">{t.contact}</h3>
            <ul className="footer-list">
              <li className="footer-contact-item">
                <Phone size={18} color="var(--accent)" />
                <a href="tel:+250788300000">+250 788 300 000</a>
              </li>
              <li className="footer-contact-item">
                <Mail size={18} color="var(--accent)" />
                <a href="mailto:simba@gmail.com">simba@gmail.com</a>
              </li>
              <li className="footer-contact-item">
                <MapPin size={18} color="var(--accent)" />
                <a href="https://maps.google.com/?q=Kigali,+Rwanda" target="_blank" rel="noreferrer">Kigali, Rwanda</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-copy">
          &copy; {new Date().getFullYear()} Simba 2.0 Supermarket. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
