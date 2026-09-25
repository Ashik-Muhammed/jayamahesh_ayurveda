// Footer Component with Deep Forest Green & Kerala Heritage Accents
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  Heart,
  ArrowRight,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { CENTER_INFO } from '../services/initialData';
import { useAppointments } from '../context/AppointmentContext';
import Logo from './Logo';

export default function Footer() {
  const { openBookingModal } = useAppointments();

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0E2E24 0%, #081F18 100%)',
      color: '#F4F0E8',
      paddingTop: '64px',
      paddingBottom: '32px',
      borderTop: '2px solid #C59A44'
    }}>
      <div className="container">
        {/* Upper Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '56px'
        }}>
          {/* Column 1: Brand & Legacy */}
          <div>
            <div style={{ marginBottom: '18px' }}>
              <Logo theme="dark" size="md" />
            </div>

            <p style={{ color: '#D6DED9', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              A sanctuary of authentic Kerala Ayurveda, classical Panchakarma, and restorative lifestyle medicine. Guided by classical treatises and personalized care.
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: 'rgba(198, 154, 69, 0.15)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(198, 154, 69, 0.3)',
              fontSize: '0.8rem',
              color: '#E4C078'
            }}>
              <ShieldCheck size={14} /> Certified Ayurvedic Physicians
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{
              color: '#E4C078',
              fontSize: '1.05rem',
              marginBottom: '18px',
              letterSpacing: '0.04em'
            }}>
              Healing Journeys
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/treatments" style={{ color: '#D6DED9', fontSize: '0.9rem', transition: 'color 0.2s' }}>
                  Classical Panchakarma
                </Link>
              </li>
              <li>
                <Link to="/treatments" style={{ color: '#D6DED9', fontSize: '0.9rem', transition: 'color 0.2s' }}>
                  Spine & Joint Care (Kizhi / Kati Vasti)
                </Link>
              </li>
              <li>
                <Link to="/treatments" style={{ color: '#D6DED9', fontSize: '0.9rem', transition: 'color 0.2s' }}>
                  Gut Agni & Detox Care
                </Link>
              </li>
              <li>
                <Link to="/treatments" style={{ color: '#D6DED9', fontSize: '0.9rem', transition: 'color 0.2s' }}>
                  Shirodhara & Stress Relief
                </Link>
              </li>
              <li>
                <Link to="/programs" style={{ color: '#D6DED9', fontSize: '0.9rem', transition: 'color 0.2s' }}>
                  Curated Wellness Retreats
                </Link>
              </li>
              <li>
                <Link to="/doctors" style={{ color: '#D6DED9', fontSize: '0.9rem', transition: 'color 0.2s' }}>
                  Our Physicians & Vaidyas
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Center & Timings */}
          <div>
            <h4 style={{
              color: '#E4C078',
              fontSize: '1.05rem',
              marginBottom: '18px',
              letterSpacing: '0.04em'
            }}>
              Visiting Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: '#D6DED9' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Clock size={16} color="#E4C078" style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#FBFAF7' }}>Monday – Saturday</div>
                  <div>9:00 AM – 6:00 PM (IST)</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Clock size={16} color="#E4C078" style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#FBFAF7' }}>Sunday</div>
                  <div>By Prior Doctor Appointment</div>
                </div>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                padding: '12px',
                borderRadius: '8px',
                borderLeft: '3px solid #C69A45',
                fontSize: '0.82rem',
                lineHeight: 1.5
              }}>
                Consultations are unhurried (45 mins). Advance reservation recommended.
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div>
            <h4 style={{
              color: '#E4C078',
              fontSize: '1.05rem',
              marginBottom: '18px',
              letterSpacing: '0.04em'
            }}>
              Center Enquiries
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <a 
                href={`tel:${CENTER_INFO.phone}`} 
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FBFAF7' }}
              >
                <Phone size={15} color="#E4C078" /> {CENTER_INFO.phone}
              </a>
              <a 
                href={`https://wa.me/${CENTER_INFO.whatsapp.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4ADE80' }}
              >
                <MessageCircle size={15} /> WhatsApp Desk
              </a>
              <a 
                href={`mailto:${CENTER_INFO.email}`} 
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FBFAF7' }}
              >
                <Mail size={15} color="#E4C078" /> {CENTER_INFO.email}
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#D6DED9' }}>
                <MapPin size={16} color="#E4C078" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>Kalpathy Heritage Village, Palakkad, Kerala 678001</span>
              </div>
              <button
                onClick={() => openBookingModal()}
                className="btn-gold"
                style={{ marginTop: '8px', width: '100%', justifyContent: 'center', padding: '10px' }}
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(198, 154, 69, 0.25)', marginBottom: '24px' }} />

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.82rem',
          color: '#A3B1AA'
        }}>
          <div>
            © {new Date().getFullYear()} Jayamahesh Ayurveda & Wellness Center. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link to="/about" style={{ color: '#D6DED9' }}>Philosophy</Link>
            <Link to="/gallery" style={{ color: '#D6DED9' }}>Gallery</Link>
            <Link to="/contact" style={{ color: '#D6DED9' }}>Directions</Link>
            <Link 
              to="/admin" 
              style={{ color: '#E4C078', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Lock size={12} /> Staff Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
