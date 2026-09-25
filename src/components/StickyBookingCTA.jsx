// Sticky Booking CTA appearing when scrolled down with Framer Motion
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageCircle, Sparkles } from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import { CENTER_INFO } from '../services/initialData';

export default function StickyBookingCTA() {
  const [visible, setVisible] = useState(false);
  const { openBookingModal } = useAppointments();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.92 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: '26px',
            right: '26px',
            zIndex: 90,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          {/* WhatsApp Direct Concierge */}
          <a
            href={`https://wa.me/${CENTER_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#22C55E',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 25px rgba(34, 197, 94, 0.45)',
              border: '2px solid rgba(255, 255, 255, 0.8)',
              transition: 'transform 0.25s ease',
              textDecoration: 'none'
            }}
            title="Chat directly with our Ayurvedic Concierge"
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
          >
            <MessageCircle size={24} />
          </a>

          {/* Luxury Floating Pill CTA */}
          <button
            onClick={() => openBookingModal()}
            className="btn-gold shimmer-effect"
            style={{
              padding: '13px 26px',
              fontSize: '0.92rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 12px 35px rgba(8, 31, 24, 0.35), 0 0 20px rgba(197, 154, 68, 0.4)'
            }}
          >
            <Calendar size={16} />
            <span>Book Consultation</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
