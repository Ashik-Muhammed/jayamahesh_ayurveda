// Wellness Programs Page
import React from 'react';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Utensils, 
  Bed, 
  HeartHandshake,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import { PROGRAMS } from '../services/initialData';

export default function Programs() {
  const { openBookingModal } = useAppointments();

  return (
    <div>
      {/* Banner */}
      <section style={{
        background: 'linear-gradient(180deg, #0E2E24 0%, #081F18 100%)',
        color: '#FBFAF7',
        padding: '64px 0 76px 0',
        textAlign: 'center',
        borderBottom: '2px solid #C59A44'
      }}>
        <div className="container-narrow">
          <span className="badge-gold" style={{ marginBottom: '14px' }}>
            Transformative Retreats
          </span>
          <h1 style={{ fontSize: '3rem', color: '#FBFAF7', marginBottom: '16px' }}>
            Curated Ayurvedic <br />
            <span style={{ color: '#E4C078', fontStyle: 'italic' }}>Wellness Programs</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#D6DED9', lineHeight: 1.7, margin: '0 auto' }}>
            Immerse yourself in comprehensive multi-day healing journeys with daily physician consultations, classical therapies, organic herbal cuisine, and restorative Kerala serenity.
          </p>
        </div>
      </section>

      {/* Programs List */}
      <section style={{ padding: '80px 0 100px 0', background: 'var(--color-paper-white)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {PROGRAMS.map((program, index) => (
              <div 
                key={program.id}
                className="ayur-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '0',
                  overflow: 'hidden'
                }}
              >
                {/* Visual Half */}
                <div style={{
                  position: 'relative',
                  minHeight: '340px',
                  background: '#0C2B24'
                }}>
                  <img
                    src={program.imageUrl}
                    alt={program.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <span className="badge-gold" style={{ background: '#173A30', color: '#E4C078' }}>
                      {program.duration}
                    </span>
                    <span style={{
                      background: '#C69A45',
                      color: '#0C2B24',
                      fontWeight: 700,
                      fontSize: '0.74rem',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {program.tag}
                    </span>
                  </div>
                </div>

                {/* Content Half */}
                <div style={{ padding: '36px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '10px'
                  }}>
                    <h2 style={{ fontSize: '2rem', color: '#0C2B24', margin: 0 }}>
                      {program.name}
                    </h2>
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.4rem',
                      color: '#C69A45',
                      fontWeight: 700
                    }}>
                      {program.price}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '0.98rem',
                    color: '#18352D',
                    lineHeight: 1.65,
                    marginBottom: '18px'
                  }}>
                    {program.shortDescription}
                  </p>

                  <div style={{
                    background: 'var(--color-cream-warm)',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    marginBottom: '20px',
                    borderLeft: '3px solid #173A30'
                  }}>
                    <strong>Ideal for:</strong> {program.idealFor}
                  </div>

                  {/* Included Services */}
                  <div style={{ marginBottom: '22px' }}>
                    <h4 style={{ fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#77837D', marginBottom: '10px' }}>
                      Included In This Program:
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                      {program.inclusions.map((inc, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem' }}>
                          <CheckCircle2 size={14} color="#C69A45" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span style={{ color: '#18352D' }}>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Daily Rhythm / Schedule */}
                  <div style={{ marginBottom: '28px' }}>
                    <h4 style={{ fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#77837D', marginBottom: '10px' }}>
                      Sample Daily Healing Rhythm:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {program.dailySchedule.slice(0, 4).map((sched, idx) => (
                        <div key={idx} style={{ fontSize: '0.82rem', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C69A45' }} />
                          {sched}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking CTA */}
                  <div style={{ display: 'flex', gap: '14px', marginTop: 'auto' }}>
                    <button
                      onClick={() => openBookingModal({ treatmentId: program.id })}
                      className="btn-gold"
                      style={{ flex: 1, justifyContent: 'center', padding: '14px' }}
                    >
                      <Calendar size={16} /> Enquire About This Journey
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
