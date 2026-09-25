// Treatments Page with Category Filtering and Clinical Modals
import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Filter 
} from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import { TREATMENTS } from '../services/initialData';

export default function Treatments() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { openBookingModal, openTreatmentModal } = useAppointments();

  const categories = [
    'All',
    'Panchakarma',
    'Pain Management',
    'Detox and Digestive Care',
    'Rejuvenation',
    'Stress and Lifestyle Wellness'
  ];

  const filteredTreatments = activeCategory === 'All'
    ? TREATMENTS
    : TREATMENTS.filter(t => t.category === activeCategory);

  return (
    <div>
      {/* Header Banner */}
      <section style={{
        background: 'linear-gradient(180deg, #0E2E24 0%, #081F18 100%)',
        color: '#FBFAF7',
        padding: '64px 0 76px 0',
        textAlign: 'center',
        borderBottom: '2px solid #C59A44'
      }}>
        <div className="container-narrow">
          <span className="badge-gold" style={{ marginBottom: '14px' }}>
            Classical Therapies
          </span>
          <h1 style={{ fontSize: '3rem', color: '#FBFAF7', marginBottom: '16px' }}>
            Authentic Ayurvedic <br />
            <span style={{ color: '#E4C078', fontStyle: 'italic' }}>Therapies & Treatments</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#D6DED9', lineHeight: 1.7, margin: '0 auto' }}>
            Each treatment is customized according to your individual Dosha constitution (Prakriti), utilizing pure herbal preparations formulated in our traditional Kerala pharmacy.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Content */}
      <section style={{ padding: '60px 0 90px 0', background: 'var(--color-paper-white)' }}>
        <div className="container">
          {/* Category Filter Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '48px'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  border: activeCategory === cat ? '1px solid #C69A45' : '1px solid #D6DED9',
                  background: activeCategory === cat ? '#173A30' : 'var(--color-pure-white)',
                  color: activeCategory === cat ? '#E4C078' : '#18352D',
                  boxShadow: activeCategory === cat ? '0 4px 15px rgba(23,58,48,0.2)' : 'none',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Treatments Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '36px'
          }}>
            {filteredTreatments.map((treatment) => (
              <div 
                key={treatment.id} 
                className="ayur-card"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={treatment.imageUrl}
                    alt={treatment.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: 'rgba(12, 43, 36, 0.88)',
                    color: '#E4C078',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em'
                  }}>
                    {treatment.category}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.8rem',
                    color: '#77837D',
                    marginBottom: '10px'
                  }}>
                    <Clock size={14} color="#C69A45" /> {treatment.duration}
                  </div>

                  <h3 style={{ fontSize: '1.4rem', color: '#0C2B24', marginBottom: '12px' }}>
                    {treatment.name}
                  </h3>

                  <p style={{
                    fontSize: '0.92rem',
                    color: '#18352D',
                    lineHeight: 1.65,
                    marginBottom: '20px'
                  }}>
                    {treatment.shortDescription}
                  </p>

                  {/* Highlights */}
                  <div style={{ marginBottom: '24px', flex: 1 }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: '#0C2B24',
                      marginBottom: '8px'
                    }}>
                      Key Benefits:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {treatment.benefits?.slice(0, 2).map((b, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem', color: '#374151' }}>
                          <Check size={14} color="#C69A45" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--color-border-soft)'
                  }}>
                    <button
                      onClick={() => openTreatmentModal(treatment)}
                      className="btn-outline"
                      style={{ flex: 1, padding: '11px', fontSize: '0.88rem', justifyContent: 'center' }}
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openBookingModal({ treatmentId: treatment.id })}
                      className="btn-gold"
                      style={{ flex: 1, padding: '11px', fontSize: '0.88rem', justifyContent: 'center' }}
                    >
                      <Calendar size={15} /> Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Need help choosing banner */}
          <div style={{
            marginTop: '64px',
            background: 'var(--color-cream-warm)',
            border: '1px solid var(--color-border-soft)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.6rem', color: '#0C2B24', marginBottom: '10px' }}>
              Unsure which therapy is suitable for your condition?
            </h3>
            <p style={{
              fontSize: '0.96rem',
              color: '#18352D',
              maxWidth: '560px',
              margin: '0 auto 24px auto',
              lineHeight: 1.6
            }}>
              In authentic Ayurveda, selecting the right therapy requires assessment of your Dosha imbalances. Schedule a preliminary doctor consultation to receive your customized treatment blueprint.
            </p>
            <button
              onClick={() => openBookingModal()}
              className="btn-primary"
            >
              <Calendar size={16} /> Book Physician Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
