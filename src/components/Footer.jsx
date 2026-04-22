import React from 'react'
import { Share2, MessageCircle, Info, MapPin, Phone, Mail } from 'lucide-react'

const Footer = ({ lang }) => {
  const translations = {
    en: { about: "Simba 2.0 is Rwanda's premier online supermarket, delivering fresh quality products to your doorstep.", contact: 'Contact Us', quickLinks: 'Quick Links', store: 'Store Location' },
    fr: { about: 'Simba 2.0 est le premier supermarche en ligne du Rwanda, livrant des produits frais de qualite a votre porte.', contact: 'Contactez-nous', quickLinks: 'Liens Rapides', store: 'Emplacement du Magasin' },
    kn: { about: 'Simba 2.0 ni isoko rya mbere ryo kuri interineti mu Rwanda, ritanga ibicuruzwa byiza kandi bishya aho utuye.', contact: 'Twandikire', quickLinks: 'Ihuza ryihuse', store: 'Aho dushakira' }
  }

  const t = translations[lang]

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
      // no-op: sharing is best effort
    }
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <div className="footer-brand-badge">S</div>
              <span className="footer-brand-text">
                SIMBA <span style={{ color: 'var(--accent)' }}>2.0</span>
              </span>
            </div>
            <p className="footer-about">{t.about}</p>
            <div className="footer-social">
              <button className="footer-icon-btn" onClick={handleShare} aria-label="Share Simba website">
                <Share2 size={20} />
              </button>
              <a
                className="footer-icon-btn"
                href="https://wa.me/250788000000"
                target="_blank"
                rel="noreferrer"
                aria-label="Open WhatsApp"
              >
                <MessageCircle size={20} />
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
                <a href="tel:+250788000000">+250 788 000 000</a>
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
