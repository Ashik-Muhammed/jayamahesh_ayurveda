// Treatment Detail Modal displaying clinical & restorative guidance
import React from 'react';
import { 
  X, 
  Clock, 
  Calendar, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  HelpCircle 
} from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import Logo from './Logo';

export default function TreatmentDetailModal() {
  const { selectedTreatment, closeTreatmentModal, openBookingModal } = useAppointments() || {};

  if (!selectedTreatment) return null;

  const handleBookNow = () => {
    const treatmentId = selectedTreatment.id;
    closeTreatmentModal();
    openBookingModal({ treatmentId });
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(12, 43, 36, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeTreatmentModal();
      }}
    >
      <div 
        style={{
          background: 'var(--color-paper-white)',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-modal)',
          border: '1px solid var(--color-border-soft)',
          overflowY: 'auto',
          position: 'relative'
        }}
        className="animate-fade-in"
      >
        {/* Banner with Image */}
        <div style={{
          position: 'relative',
          height: '240px',
          overflow: 'hidden',
          background: '#0C2B24'
        }}>
          <img
            src={selectedTreatment.imageUrl}
            alt={selectedTreatment.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.85
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(12,43,36,0.3) 0%, rgba(12,43,36,0.92) 100%)'
          }} />

          {/* Close button */}
          <button
            onClick={closeTreatmentModal}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(0,0,0,0.4)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              zIndex: 10
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Headline on Image */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '24px',
            right: '24px',
            color: '#FBFAF7'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Logo variant="icon" size={18} />
              <span className="badge-gold">
                {selectedTreatment.category}
              </span>
            </div>
            <h2 style={{ color: '#FBFAF7', fontSize: '1.8rem', margin: 0 }}>
              {selectedTreatment.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '28px' }}>
          {/* Duration & Recommendation Strip */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            padding: '14px 18px',
            background: 'var(--color-cream-warm)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '24px',
            border: '1px solid var(--color-border-soft)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} color="#C69A45" />
              <span style={{ fontSize: '0.88rem' }}><strong>Duration:</strong> {selectedTreatment.duration}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} color="#C69A45" />
              <span style={{ fontSize: '0.88rem' }}><strong>Course:</strong> {selectedTreatment.recommendedSessions}</span>
            </div>
          </div>

          {/* Full Clinical Overview */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#0C2B24', fontSize: '1.1rem', marginBottom: '8px' }}>
              Therapy Overview
            </h4>
            <p style={{ fontSize: '0.94rem', color: '#18352D', lineHeight: 1.7 }}>
              {selectedTreatment.fullDescription}
            </p>
          </div>

          {/* Key Indications & Benefits */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#0C2B24', fontSize: '1.1rem', marginBottom: '12px' }}>
              Who It Benefits & Clinical Indications
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
              {selectedTreatment.benefits?.map((benefit, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'rgba(198, 154, 69, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <Check size={12} color="#C69A45" />
                  </div>
                  <span style={{ fontSize: '0.88rem', color: '#18352D' }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation & Aftercare Accordion/Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '28px'
          }}>
            <div style={{
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B96D4B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Preparation Requirements
              </span>
              <p style={{ fontSize: '0.85rem', color: '#374151', marginTop: '6px' }}>
                {selectedTreatment.preparation}
              </p>
            </div>

            <div style={{
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#173A30', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Post-Therapy Aftercare
              </span>
              <p style={{ fontSize: '0.85rem', color: '#374151', marginTop: '6px' }}>
                {selectedTreatment.aftercare}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              onClick={closeTreatmentModal}
              className="btn-outline"
            >
              Close
            </button>
            <button
              onClick={handleBookNow}
              className="btn-gold"
              style={{ padding: '12px 28px' }}
            >
              <Calendar size={16} /> Book This Treatment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
