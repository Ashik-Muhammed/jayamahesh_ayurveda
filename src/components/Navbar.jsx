// Jayamahesh Ayurveda & Wellness Center - Ultra-Luxury Heritage Navbar
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  MessageCircle, 
  Calendar, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  Clock,
  MapPin,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import { CENTER_INFO } from '../services/initialData';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openBookingModal } = useAppointments();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Sanctuary', path: '/about' },
    { name: 'Classical Therapies', path: '/treatments' },
    { name: 'Immersion Programs', path: '/programs' },
    { name: 'Vaidyas & Doctors', path: '/doctors' },
    { name: 'Sanctuary Gallery', path: '/gallery' },
    { name: 'Contact & Visit', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '';
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <>
      {/* Top Heritage Utility Ribbon */}
      <div style={{
        background: 'linear-gradient(90deg, #051410 0%, #0E2E24 50%, #051410 100%)',
        color: '#E4C078',
        fontSize: '0.78rem',
        padding: '7px 0',
        borderBottom: '1px solid rgba(197, 154, 68, 0.28)',
        letterSpacing: '0.02em',
        position: 'relative',
        zIndex: 101
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {/* Left status / location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F4EFE6' }}>
              <span className="status-beacon" />
              <span style={{ fontWeight: 500 }}>Sanctuary Consultations Active</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D6DED9' }} className="hide-mobile">
              <MapPin size={13} color="#C59A44" /> Kalpathy Heritage Valley, Palakkad, Kerala
            </span>
          </div>

          {/* Right Direct Concierge Contact */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <a 
              href={`tel:${CENTER_INFO.phone}`} 
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F5D794', fontWeight: 600 }}
              title="Call Senior Vaidya Desk"
            >
              <Phone size={13} color="#C59A44" /> {CENTER_INFO.phone}
            </a>

            <a 
              href={`https://wa.me/${CENTER_INFO.whatsapp.replace(/[^0-9]/g, '')}`} 
              target="_blank" 
              rel="noreferrer"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '5px', 
                color: '#4ADE80', 
                fontWeight: 600,
                background: 'rgba(74, 222, 128, 0.1)',
                padding: '2px 9px',
                borderRadius: '999px',
                border: '1px solid rgba(74, 222, 128, 0.2)'
              }}
            >
              <MessageCircle size={12} /> WhatsApp Concierge
            </a>

            <Link 
              to="/admin" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px', 
                color: '#E4C078', 
                background: 'rgba(197, 154, 68, 0.12)',
                padding: '2px 10px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                border: '1px solid rgba(197, 154, 68, 0.3)',
                fontWeight: 500
              }}
              title="Physicians & Staff Admin Portal"
            >
              <Lock size={11} color="#C59A44" /> Vaidya Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header with Glassmorphism */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: isScrolled 
          ? 'rgba(250, 248, 245, 0.94)' 
          : 'rgba(250, 248, 245, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: isScrolled 
          ? '0 10px 30px -5px rgba(8, 31, 24, 0.1), 0 1px 0 rgba(197, 154, 68, 0.2)' 
          : '0 1px 0 rgba(197, 154, 68, 0.15)',
        borderBottom: '1px solid rgba(197, 154, 68, 0.2)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: isScrolled ? '74px' : '84px',
          transition: 'height 0.3s ease'
        }}>
          {/* Official Brand Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo size={isScrolled ? 'sm' : 'md'} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '26px' }} className="hide-mobile">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: active ? 700 : 500,
                    color: active ? '#081F18' : '#2C4A40',
                    position: 'relative',
                    padding: '8px 2px',
                    transition: 'color 0.25s ease',
                    letterSpacing: '0.01em'
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = '#8E6822'; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = '#2C4A40'; }}
                >
                  {link.name}
                  {active && (
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #C59A44 50%, transparent)',
                      borderRadius: '2px'
                    }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => openBookingModal()}
              className="btn-gold shimmer-effect"
              style={{
                padding: '11px 24px',
                fontSize: '0.88rem',
                letterSpacing: '0.02em'
              }}
            >
              <Calendar size={15} />
              <span>Book Consultation</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="show-mobile-only"
              style={{
                padding: '8px',
                color: '#081F18',
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(197, 154, 68, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(197, 154, 68, 0.25)'
              }}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '115px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(250, 248, 245, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 99,
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(197, 154, 68, 0.3)',
          overflowY: 'auto'
        }} className="animate-fade-in">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ 
              fontSize: '0.75rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.12em', 
              color: '#8E6822', 
              fontWeight: 700,
              paddingBottom: '6px',
              borderBottom: '1px solid rgba(197, 154, 68, 0.2)'
            }}>
              Sanctuary Navigation
            </div>

            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-heading)',
                    color: active ? '#C59A44' : '#081F18',
                    fontWeight: active ? 700 : 600,
                    padding: '8px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(14, 46, 36, 0.06)'
                  }}
                >
                  <span>{link.name}</span>
                  <ChevronRight size={18} color={active ? '#C59A44' : '#85968E'} />
                </Link>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '30px' }}>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openBookingModal();
              }}
              className="btn-gold"
              style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
            >
              <Calendar size={17} /> Book In-Person or Virtual Visit
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href={`tel:${CENTER_INFO.phone}`}
                className="btn-outline"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', padding: '12px' }}
              >
                <Phone size={14} /> Direct Call
              </a>
              <a
                href={`https://wa.me/${CENTER_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', padding: '12px', color: '#166534', borderColor: '#166534' }}
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>

            <Link
              to="/admin"
              style={{
                textAlign: 'center',
                color: '#8E6822',
                fontSize: '0.82rem',
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontWeight: 600
              }}
            >
              <Lock size={12} /> Senior Doctor & Staff Access Portal
            </Link>
          </div>
        </div>
      )}

      {/* Responsive hide/show rules */}
      <style>{`
        @media (max-width: 980px) {
          .hide-mobile { display: none !important; }
        }
        @media (min-width: 981px) {
          .show-mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
}
