import React from 'react'
import { Share2, MessageCircle, Info, MapPin, Phone, Mail } from 'lucide-react'

const Footer = ({ lang }) => {
  const translations = {
    en: { about: "Simba 2.0 is Rwanda's premier online supermarket, delivering fresh quality products to your doorstep.", contact: "Contact Us", quickLinks: "Quick Links", store: "Store Location" },
    fr: { about: "Simba 2.0 est le premier supermarché en ligne du Rwanda, livrant des produits frais de qualité à votre porte.", contact: "Contactez-nous", quickLinks: "Liens Rapides", store: "Emplacement du Magasin" },
    kn: { about: "Simba 2.0 ni isoko rya mbere ryo kuri interineti mu Rwanda, ritanga ibicuruzwa byiza kandi bishya aho utuye.", contact: "Twandikire", quickLinks: "Ihuza ryihuse", store: "Aho dushakira" }
  }

  const t = translations[lang]

  return (
    <footer style={{ background: 'var(--secondary)', color: 'white', padding: '6rem 0 2rem', marginTop: '6rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--primary)', color: 'white', padding: '0.4rem', borderRadius: '8px', fontWeight: '800' }}>S</div>
              <span style={{ fontWeight: '800', fontSize: '1.25rem' }}>SIMBA <span style={{ color: 'var(--primary)' }}>2.0</span></span>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '2rem' }}>{t.about}</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ background: '#334155', padding: '0.75rem', borderRadius: '12px', cursor: 'pointer' }}><Share2 size={20} /></div>
              <div style={{ background: '#334155', padding: '0.75rem', borderRadius: '12px', cursor: 'pointer' }}><MessageCircle size={20} /></div>
              <div style={{ background: '#334155', padding: '0.75rem', borderRadius: '12px', cursor: 'pointer' }}><Info size={20} /></div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>{t.quickLinks}</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8' }}>
              <li>Home</li>
              <li>Categories</li>
              <li>Best Sellers</li>
              <li>New Arrivals</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>{t.contact}</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Phone size={18} color="var(--primary)" /> +250 788 000 000</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Mail size={18} color="var(--primary)" /> help@simba.rw</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><MapPin size={18} color="var(--primary)" /> Kigali, Rwanda</li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #334155', paddingTop: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Simba 2.0 Supermarket. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
