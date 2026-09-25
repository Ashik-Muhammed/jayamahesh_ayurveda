// About Jayamahesh Ayurveda Page
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Calendar, 
  Leaf, 
  Clock, 
  Compass, 
  ArrowRight,
  BookOpen,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import Logo from '../components/Logo';

export default function About() {
  const { openBookingModal } = useAppointments();

  return (
    <div>
      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(180deg, #0E2E24 0%, #081F18 100%)',
        color: '#FBFAF7',
        padding: '72px 0 84px 0',
        textAlign: 'center',
        position: 'relative',
        borderBottom: '2px solid #C59A44'
      }}>
        <div className="container-narrow">
          <span className="badge-gold" style={{ marginBottom: '16px' }}>
            Our Heritage & Lineage
          </span>
          <h1 style={{ fontSize: '3.2rem', color: '#FBFAF7', marginBottom: '18px' }}>
            Rooted in Kerala's <br />
            <span style={{ color: '#E4C078', fontStyle: 'italic' }}>Living Ayurvedic Tradition</span>
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: '#D6DED9',
            lineHeight: 1.8,
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Jaya Mahesh Ayurveda and Wellness was established with a singular resolve: to preserve the rigorous diagnostic wisdom and authentic healing depth of classical Kerala Ayurveda without dilution.
          </p>
        </div>
      </section>

      {/* 1. Our Beginning & Jaya Mahesh Story */}
      <section style={{ padding: '80px 0', background: 'var(--color-paper-white)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '56px',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ marginBottom: '14px' }}>
                <Logo variant="compact" size="sm" />
              </div>
              <span className="section-tag">Chapter 01</span>
              <h2 style={{ fontSize: '2.4rem', color: '#0C2B24', marginBottom: '18px' }}>
                Our Beginning
              </h2>
              <p style={{ fontSize: '1rem', color: '#18352D', lineHeight: 1.8, marginBottom: '16px' }}>
                Founded in the historic town of Palakkad—long revered as the cradle of Kerala’s premier Ayurvedic families and medicinal botanicals—Jaya Mahesh began as an intimate sanctuary for patients who had exhausted symptomatic remedies elsewhere.
              </p>
              <p style={{ fontSize: '0.96rem', color: '#77837D', lineHeight: 1.7, marginBottom: '20px' }}>
                Under the clinical vision of Dr. Ananya Mahesh and senior traditional Vaidyas, we created a hospital and retreat setting where ancient medicinal texts (the Brihat Trayi) are lived, practiced, and respected every single hour.
              </p>
              <div style={{
                background: 'var(--color-cream-warm)',
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                borderLeft: '3px solid #C69A45',
                fontSize: '0.92rem',
                color: '#0C2B24',
                fontStyle: 'italic'
              }}>
                "We do not treat a symptom in isolation; we care for the living human being carrying the imbalance."
              </div>
            </div>

            <div>
              <div style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                border: '2px solid #E4C078'
              }}>
                <img
                  src="/images/dr_rajeshwar.jpg"
                  alt="Senior Ayurvedic Vaidya in study"
                  style={{ width: '100%', height: '440px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What Authentic Ayurveda Means to Us */}
      <section style={{
        padding: '80px 0',
        background: 'var(--color-cream-warm)',
        borderTop: '1px solid var(--color-border-soft)',
        borderBottom: '1px solid var(--color-border-soft)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 50px auto' }}>
            <span className="section-tag" style={{ justifyContent: 'center' }}>Foundational Philosophy</span>
            <h2 style={{ fontSize: '2.4rem', color: '#0C2B24', marginBottom: '16px' }}>
              What Authentic Ayurveda <span style={{ color: '#C69A45', fontStyle: 'italic' }}>Means to Us</span>
            </h2>
            <p style={{ fontSize: '1rem', color: '#77837D', lineHeight: 1.7 }}>
              Ayurveda is not a casual relaxation technique; it is a 5,000-year-old medical science of bio-energies, tissue regeneration, and metabolic balance.
            </p>
            <div className="gold-divider-center" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            <div className="ayur-card" style={{ padding: '28px' }}>
              <div className="badge-gold" style={{ marginBottom: '12px' }}>Vata, Pitta, Kapha</div>
              <h3 style={{ fontSize: '1.25rem', color: '#0C2B24', marginBottom: '10px' }}>
                The Tridosha Principle
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#18352D', lineHeight: 1.65 }}>
                Health is the dynamic harmony between movement (Vata), metabolic transformation (Pitta), and structural stability (Kapha). When external stress disrupts this balance, disease manifests.
              </p>
            </div>

            <div className="ayur-card" style={{ padding: '28px' }}>
              <div className="badge-gold" style={{ marginBottom: '12px' }}>Prakriti & Vikriti</div>
              <h3 style={{ fontSize: '1.25rem', color: '#0C2B24', marginBottom: '10px' }}>
                Constitutional Individuality
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#18352D', lineHeight: 1.65 }}>
                Every person is born with a unique genetic constitution (Prakriti). Two individuals with joint pain or gut distress may require completely different medicated oils, diet, and therapies.
              </p>
            </div>

            <div className="ayur-card" style={{ padding: '28px' }}>
              <div className="badge-gold" style={{ marginBottom: '12px' }}>Agni & Ama</div>
              <h3 style={{ fontSize: '1.25rem', color: '#0C2B24', marginBottom: '10px' }}>
                Digestive Fire & Deep Toxins
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#18352D', lineHeight: 1.65 }}>
                Subdued digestive fire (Mandagni) produces toxic metabolic byproduct (Ama), which lodges in vulnerable channels. Our therapies dislodge Ama and restore digestive vigor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How We Care For Every Guest */}
      <section style={{ padding: '80px 0', background: 'var(--color-paper-white)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '56px',
            alignItems: 'center'
          }}>
            <div>
              <div style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--color-border-soft)'
              }}>
                <img
                  src="/images/herbs.jpg"
                  alt="Ayurvedic herb preparation"
                  style={{ width: '100%', height: '420px', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div>
              <span className="section-tag">Chapter 03</span>
              <h2 style={{ fontSize: '2.4rem', color: '#0C2B24', marginBottom: '18px' }}>
                How We Care For Every Guest
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#173A30',
                    color: '#E4C078',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    1
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: '#0C2B24', margin: 0 }}>Nadi Pariksha & Constitutional Mapping</h4>
                    <p style={{ fontSize: '0.9rem', color: '#77837D', margin: '4px 0 0 0', lineHeight: 1.6 }}>
                      Your stay begins with an extensive radial pulse reading by our senior Vaidya, exploring organ health, mental stress, and metabolic dosha balance.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#173A30',
                    color: '#E4C078',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    2
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: '#0C2B24', margin: 0 }}>Customized Herbal Formulations</h4>
                    <p style={{ fontSize: '0.9rem', color: '#77837D', margin: '4px 0 0 0', lineHeight: 1.6 }}>
                      Oils and herbal decoctions are individually selected and warmed specifically for your therapy, prepared in our own classical pharmacy.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#173A30',
                    color: '#E4C078',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    3
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: '#0C2B24', margin: 0 }}>Unhurried, Respectful Healing</h4>
                    <p style={{ fontSize: '0.9rem', color: '#77837D', margin: '4px 0 0 0', lineHeight: 1.6 }}>
                      Therapy sessions are quiet, sacred, and never hurried. Rooms are temperature-stabilized and infused with herbal aromatics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What Makes Jayamahesh Different */}
      <section style={{
        padding: '80px 0',
        background: '#0C2B24',
        color: '#FBFAF7'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
            <span className="badge-gold" style={{ marginBottom: '12px' }}>Distinctive Standards</span>
            <h2 style={{ fontSize: '2.4rem', color: '#FBFAF7', marginBottom: '16px' }}>
              What Sets <span style={{ color: '#E4C078', fontStyle: 'italic' }}>Jaya Mahesh Apart</span>
            </h2>
            <p style={{ color: '#D6DED9', fontSize: '1rem', lineHeight: 1.7 }}>
              Healthcare standards delivered with hospitality warmth.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {[
              { title: "In-House Pharmacy", desc: "Pure botanicals gathered from Western Ghats forests and processed strictly according to ancient texts." },
              { title: "Physician-Led Care", desc: "Every therapy is monitored and calibrated by licensed BAMS/MD doctors, not untrained spa staff." },
              { title: "Kerala Architecture", desc: "Traditional Nalukettu teakwood structures designed with optimal cross-ventilation and natural daylight." },
              { title: "Lifelong Follow-Up", desc: "We provide detailed post-treatment diet, yoga protocols, and virtual check-ins for long-term health." }
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(198, 154, 69, 0.25)'
                }}
              >
                <div style={{ color: '#E4C078', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '8px' }}>
                  {card.title}
                </div>
                <p style={{ color: '#D6DED9', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Action CTA */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button
              onClick={() => openBookingModal()}
              className="btn-gold"
              style={{ padding: '16px 36px', fontSize: '1rem' }}
            >
              <span>Find Your Starting Point</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
