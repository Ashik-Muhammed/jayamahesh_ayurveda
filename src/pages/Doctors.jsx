// Doctors & Therapists Page
import React from 'react';
import { 
  Award, 
  Calendar, 
  Globe, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  UserCheck 
} from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import { DOCTORS } from '../services/initialData';

export default function Doctors() {
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
            Traditional Lineage & Modern Rigor
          </span>
          <h1 style={{ fontSize: '3rem', color: '#FBFAF7', marginBottom: '16px' }}>
            Our Senior Physicians & <br />
            <span style={{ color: '#E4C078', fontStyle: 'italic' }}>Certified Therapists</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#D6DED9', lineHeight: 1.7, margin: '0 auto' }}>
            Meet our esteemed team of BAMS and MD Ayurvedic Vaidyas, pulse diagnosis masters, and Gurukula-trained Kerala Panchakarma therapists dedicated to your care.
          </p>
        </div>
      </section>

      {/* Profiles Grid */}
      <section style={{ padding: '80px 0 100px 0', background: 'var(--color-paper-white)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '40px'
          }}>
            {DOCTORS.map((doctor) => (
              <div 
                key={doctor.id}
                className="ayur-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                {/* Doctor Portrait Header */}
                <div style={{
                  position: 'relative',
                  height: '280px',
                  background: '#0C2B24'
                }}>
                  <img
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(12,43,36,0.95) 100%)'
                  }} />

                  <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '20px',
                    right: '20px',
                    color: '#FBFAF7'
                  }}>
                    <div style={{
                      display: 'inline-block',
                      background: '#C69A45',
                      color: '#0C2B24',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}>
                      {doctor.experience} Clinical Experience
                    </div>
                    <h3 style={{ color: '#FBFAF7', fontSize: '1.45rem', margin: 0 }}>
                      {doctor.name}
                    </h3>
                    <div style={{ color: '#E4C078', fontSize: '0.84rem' }}>
                      {doctor.role}
                    </div>
                  </div>
                </div>

                {/* Details Body */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Qualification */}
                  <div style={{
                    background: 'var(--color-cream-warm)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    color: '#0C2B24',
                    fontWeight: 600,
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Award size={16} color="#C69A45" style={{ flexShrink: 0 }} />
                    <span>{doctor.qualification}</span>
                  </div>

                  {/* Bio */}
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#18352D',
                    lineHeight: 1.65,
                    marginBottom: '20px',
                    flex: 1
                  }}>
                    {doctor.bio}
                  </p>

                  {/* Specialties */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#77837D',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '8px'
                    }}>
                      Key Specializations:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {doctor.specialties.map((spec, idx) => (
                        <span 
                          key={idx}
                          style={{
                            background: 'rgba(23, 58, 48, 0.08)',
                            color: '#173A30',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '0.78rem',
                            fontWeight: 500
                          }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    color: '#77837D',
                    marginBottom: '20px'
                  }}>
                    <Globe size={14} color="#C69A45" />
                    <span>Languages: {doctor.languages.join(', ')}</span>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => openBookingModal({ doctorId: doctor.name })}
                    className="btn-gold"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '12px',
                      fontSize: '0.9rem'
                    }}
                  >
                    <Calendar size={15} />
                    <span>Book Consultation with {doctor.name.split(' ')[1] || doctor.name}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
