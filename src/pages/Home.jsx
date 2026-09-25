// Jayamahesh Ayurveda & Wellness Center - Ultra-Luxury Master Homepage
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Clock, 
  CheckCircle2, 
  Star, 
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Phone,
  Feather,
  Compass,
  Users,
  Leaf,
  Play,
  Pause,
  Award,
  Activity,
  Wind,
  Flame,
  Droplets,
  HelpCircle,
  Quote
} from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import { TREATMENTS, PROGRAMS, TESTIMONIALS, CENTER_INFO, DOCTORS } from '../services/initialData';
import Logo from '../components/Logo';

export default function Home() {
  const { openBookingModal, openTreatmentModal } = useAppointments();

  // Scroll Progress Bar & Hero Parallax
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yHeroBg = useTransform(heroScroll, [0, 1], ["0%", "28%"]);
  const yHeroText = useTransform(heroScroll, [0, 1], ["0%", "15%"]);
  const opacityHeroText = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const yBadge1 = useTransform(heroScroll, [0, 1], [0, -45]);
  const yBadge2 = useTransform(heroScroll, [0, 1], [0, 35]);

  // Treatments Category Filtering
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Panchakarma', 'Pain Management', 'Detox and Digestive Care', 'Rejuvenation', 'Stress and Lifestyle Wellness'];

  const filteredTreatments = selectedCategory === 'All' 
    ? TREATMENTS 
    : TREATMENTS.filter(t => t.category === selectedCategory);

  // Auto-Rotating Testimonials State & Logic
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const [testimonialProgress, setTestimonialProgress] = useState(0);
  const autoRotateInterval = 6000; // 6 seconds per slide

  useEffect(() => {
    if (isTestimonialPaused) return;

    const progressStep = 50; // update progress every 50ms
    const interval = setInterval(() => {
      setTestimonialProgress((prev) => {
        if (prev >= 100) {
          setActiveTestimonialIdx((current) => (current + 1) % TESTIMONIALS.length);
          return 0;
        }
        return prev + (progressStep / autoRotateInterval) * 100;
      });
    }, progressStep);

    return () => clearInterval(interval);
  }, [isTestimonialPaused]);

  const handlePrevTestimonial = () => {
    setTestimonialProgress(0);
    setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNextTestimonial = () => {
    setTestimonialProgress(0);
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  // Interactive Dosha Discovery State
  const [selectedDosha, setSelectedDosha] = useState('vata');

  const doshaData = {
    vata: {
      name: "Vata (Ether & Air)",
      element: "Movement & Nervous Regulation",
      qualities: "Light, Cold, Dry, Subtle, Quick",
      symptoms: "Restless sleep, joint stiffness, bloating, racing mind, chronic fatigue.",
      solution: "Warm synchronized Abhyanga, comforting herbal decoctions, grounding Shirodhara.",
      recommendedTreatment: "Classical Panchakarma & Shirodhara",
      treatmentId: "panchakarma",
      icon: Wind,
      color: "#60A5FA"
    },
    pitta: {
      name: "Pitta (Fire & Water)",
      element: "Metabolism & Digestion",
      qualities: "Hot, Sharp, Light, Oily, Spreading",
      symptoms: "Acid reflux, irritability, skin eruptions, inflammatory joint pain, burnout.",
      solution: "Cooling Takradhara, liver-cleansing herbal formulas, soothing ghee basti.",
      recommendedTreatment: "Detox & Digestive Agni Restoration",
      treatmentId: "detox-digestive",
      icon: Flame,
      color: "#F59E0B"
    },
    kapha: {
      name: "Kapha (Earth & Water)",
      element: "Structure, Immunity & Lubrication",
      qualities: "Heavy, Slow, Cool, Oily, Stable",
      symptoms: "Sluggish metabolism, sinus congestion, stubborn weight gain, brain fog.",
      solution: "Invigorating dry herbal powder massage (Udwarthanam), steam sweating (Swedana).",
      recommendedTreatment: "Rasayana Rejuvenation & Vitality",
      treatmentId: "rejuvenation",
      icon: Droplets,
      color: "#10B981"
    }
  };

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "What makes Nadi Pariksha (Pulse Diagnosis) so central to treatment?",
      a: "Nadi Pariksha is Ayurveda’s most nuanced non-invasive diagnostic science. By reading the subtle vibratory frequencies across 3 positions of your radial artery, our senior Vaidyas detect deep-seated dosha imbalances, hidden metabolic toxins (Ama), and organ stress before they manifest as chronic conditions."
    },
    {
      q: "How are the botanical oils (Tailams) prepared for my treatments?",
      a: "Every medicated oil at Jaya Mahesh is prepared strictly following the classical Ashtanga Hridaya treatises. Pure cold-pressed sesame or coconut oil is boiled slowly in traditional heavy bell-metal vessels with fresh herbs, roots, and decoctions over 72 hours to ensure cellular bioavailability."
    },
    {
      q: "Can I take treatments if I have a hectic schedule or chronic spine pain?",
      a: "Yes. In addition to residential retreats, we provide daily outpatient and flexible consultation sessions. For lumbar and cervical pain, our specialized Kati Vasti and warm herbal leaf poultice (Elakizhi) therapies provide rapid pain relief with no downtime."
    },
    {
      q: "Are the residential programs inclusive of organic Ayurvedic cuisine?",
      a: "All 7, 14, and 21-day programs include three freshly prepared Sattvic organic meals daily, tailored strictly to kindle your unique digestive fire (Agni) and support the active detoxification phase."
    }
  ];

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* 0. Top Scroll-Driven Golden Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3.5px',
          background: 'linear-gradient(90deg, #9F7626 0%, #ECC97D 50%, #C59A44 100%)',
          transformOrigin: '0%',
          zIndex: 1000,
          boxShadow: '0 0 10px rgba(228, 192, 120, 0.6)'
        }}
      />

      {/* ==========================================================================
          1. PARALLAX HERO SECTION
          ========================================================================== */}
      <section 
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'center',
          background: 'radial-gradient(circle at 10% 20%, #FAF7F0 0%, #F3EDE0 60%, #EFE8DA 100%)',
          padding: '70px 0 90px 0',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(197, 154, 68, 0.28)'
        }}
      >
        {/* Parallax Background Ambient Graphics */}
        <motion.div
          style={{
            y: yHeroBg,
            position: 'absolute',
            top: '-15%',
            right: '-10%',
            width: '680px',
            height: '680px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(197, 154, 68, 0.12) 0%, rgba(14, 46, 36, 0.03) 70%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        <motion.div
          style={{
            y: yHeroBg,
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(21, 65, 51, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '56px',
            alignItems: 'center'
          }}>
            {/* Left Hero Column */}
            <motion.div 
              style={{ y: yHeroText, opacity: opacityHeroText }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Official Brand Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  background: 'rgba(11, 130, 61, 0.08)', 
                  border: '1px solid rgba(11, 130, 61, 0.25)',
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-full)'
                }}>
                  <Logo variant="icon" size={18} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0B823D', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    Jaya Mahesh Ayurveda and Wellness
                  </span>
                </div>
                <span className="badge-gold">
                  <Sparkles size={12} color="#C59A44" /> Kalpathy Heritage
                </span>
              </div>

              {/* Majestic Headline */}
              <h1 style={{
                color: '#081F18',
                marginBottom: '22px',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.6rem, 5.2vw, 4.2rem)',
                lineHeight: 1.12,
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}>
                Awaken Your <br />
                <span style={{ 
                  color: '#C59A44', 
                  fontStyle: 'italic', 
                  fontWeight: 500,
                  textShadow: '0 2px 20px rgba(197, 154, 68, 0.25)'
                }}>
                  Inner Sanctuary
                </span>
              </h1>

              <p style={{
                fontSize: '1.14rem',
                color: '#1E3B32',
                lineHeight: 1.8,
                marginBottom: '34px',
                maxWidth: '540px'
              }}>
                Experience classical Ashtanga Ayurveda, unhurried 45-minute pulse consultations, and restorative Panchakarma in the serene, healing valley of Palakkad, Kerala.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '40px' }}>
                <button
                  onClick={() => openBookingModal()}
                  className="btn-gold shimmer-effect"
                  style={{ padding: '16px 36px', fontSize: '1rem' }}
                >
                  <Calendar size={18} />
                  <span>Reserve Consultation</span>
                </button>

                <a
                  href="#bento-experience"
                  className="btn-outline"
                  style={{ padding: '15px 28px', fontSize: '0.98rem' }}
                >
                  <span>Explore Sanctuary</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Real-time Trust Markers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '18px',
                paddingTop: '26px',
                borderTop: '1px solid rgba(197, 154, 68, 0.25)'
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: '#081F18' }}>
                    18+ Years
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#5C6E66', fontWeight: 500 }}>
                    Traditional Kerala Lineage
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: '#C59A44' }}>
                    45 Mins
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#5C6E66', fontWeight: 500 }}>
                    Unhurried Doctor Visit
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: '#081F18' }}>
                    100% Pure
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#5C6E66', fontWeight: 500 }}>
                    Handcrafted Herbal Tailams
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Column: Layered Parallax Visuals */}
            <div style={{ position: 'relative' }}>
              {/* Main Gilded Frame Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: '0 25px 60px -10px rgba(8, 31, 24, 0.28), 0 0 0 2px rgba(197, 154, 68, 0.4)',
                  aspectRatio: '4 / 3.4'
                }}
              >
                <img
                  src="/images/hero.jpg"
                  alt="Jayamahesh Ayurvedic Sanctuary in Kerala"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Subtle Gradient Shade Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 50%, rgba(8, 31, 24, 0.75) 100%)'
                }} />

                {/* Bottom Title Bar inside image */}
                <div style={{
                  position: 'absolute',
                  bottom: '22px',
                  left: '24px',
                  right: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  color: '#FFFFFF'
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#E4C078', fontWeight: 700 }}>
                      Kalpathy River Sanctuary
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600 }}>
                      Palakkad, Kerala
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    fontWeight: 600,
                    color: '#F9EEDB'
                  }}>
                    Classical Vaidya Care
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge 1: Top Right Rating & Testimonial Count (with Parallax velocity) */}
              <motion.div
                style={{
                  y: yBadge1,
                  position: 'absolute',
                  top: '-18px',
                  right: '-18px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(16px)',
                  padding: '14px 20px',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 15px 35px rgba(8, 31, 24, 0.15)',
                  border: '1px solid rgba(197, 154, 68, 0.35)',
                  zIndex: 3
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#C59A44" color="#C59A44" />
                    ))}
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#081F18' }}>4.98</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#5C6E66', marginTop: '2px', fontWeight: 600 }}>
                  1,200+ Healed Guests in 2025–2026
                </div>
              </motion.div>

              {/* Floating Badge 2: Bottom Left Physician Quality (with Inverse Parallax velocity) */}
              <motion.div
                style={{
                  y: yBadge2,
                  position: 'absolute',
                  bottom: '-22px',
                  left: '-18px',
                  background: 'linear-gradient(135deg, #0E2E24 0%, #081F18 100%)',
                  padding: '14px 22px',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 18px 40px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(197, 154, 68, 0.4)',
                  color: '#F9EEDB',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  zIndex: 3
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(197, 154, 68, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #C59A44'
                }}>
                  <ShieldCheck size={22} color="#E4C078" />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#E4C078', fontWeight: 700 }}>
                    Certified Kerala Vaidyas
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 600 }}>
                    BAMS & MD Specialists
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          2. THE SANCTUARY BENTO GRID LAYOUT (Interactive & Responsive)
          ========================================================================== */}
      <section 
        id="bento-experience"
        style={{
          padding: '100px 0',
          background: 'var(--color-paper-white)',
          position: 'relative'
        }}
      >
        <div className="container">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px auto' }}
          >
            <span className="section-tag">Sanctuary Architecture & Science</span>
            <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', color: '#081F18', marginBottom: '14px' }}>
              Ancient Lineage, <span style={{ color: '#C59A44', fontStyle: 'italic' }}>Curated Healing</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#5C6E66', lineHeight: 1.7 }}>
              Discover the foundational pillars that elevate Jaya Mahesh from standard wellness centers to Kerala's authentic clinical sanctuary.
            </p>
            <div className="gold-divider-center" />
          </motion.div>

          {/* Bento Grid Container */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '24px'
          }}>
            {/* Bento 1: Featured Panchakarma Suite (Spans 8 cols on desktop, tall aspect) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="ayur-card bento-item-span-8"
              style={{
                gridColumn: 'span 8',
                position: 'relative',
                minHeight: '380px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <img
                src="/images/shirodhara.jpg"
                alt="Classical Panchakarma Shirodhara"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(8, 31, 24, 0.1) 0%, rgba(8, 31, 24, 0.88) 100%)'
              }} />

              <div style={{ position: 'relative', zIndex: 2, padding: '36px' }}>
                <span className="badge-gold" style={{ background: 'rgba(8, 31, 24, 0.75)', color: '#F5D794', marginBottom: '12px' }}>
                  Signature Purification
                </span>
                <h3 style={{ fontSize: '1.9rem', color: '#FFFFFF', marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>
                  Classical Panchakarma & Shirodhara
                </h3>
                <p style={{ color: '#D6DED9', fontSize: '0.96rem', maxWidth: '520px', lineHeight: 1.65, marginBottom: '20px' }}>
                  A transformative 7 to 21-day physiological detox purging deep cellular metabolic toxins (Ama) through medicated oils, thermal herb fomentation, and rhythmically streamed Shirodhara.
                </p>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <button
                    onClick={() => openBookingModal({ treatmentId: 'panchakarma' })}
                    className="btn-gold"
                    style={{ padding: '11px 24px', fontSize: '0.88rem' }}
                  >
                    <span>Reserve Panchakarma</span>
                  </button>
                  <Link
                    to="/treatments"
                    style={{ color: '#F5D794', fontSize: '0.9rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span>View Therapy Protocol</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Bento 2: Nadi Pariksha Diagnostics (Spans 4 cols, tall) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="ayur-card bento-item-span-4"
              style={{
                gridColumn: 'span 4',
                background: 'linear-gradient(145deg, #FAF7F0 0%, #F1E9DA 100%)',
                padding: '34px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: '#0E2E24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  border: '1px solid #C59A44'
                }}>
                  <Activity size={26} color="#E4C078" />
                </div>
                <span className="badge-forest" style={{ marginBottom: '10px' }}>
                  Diagnostic Science
                </span>
                <h3 style={{ fontSize: '1.45rem', color: '#081F18', marginBottom: '10px' }}>
                  Nadi Pariksha (Pulse Reading)
                </h3>
                <p style={{ color: '#3A5248', fontSize: '0.9rem', lineHeight: 1.65 }}>
                  Our senior physicians evaluate 28 distinct radial pulse nuances to decipher your exact constitutional balance (Prakriti vs. Vikriti).
                </p>
              </div>

              <div style={{
                marginTop: '24px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(197, 154, 68, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#8E6822' }}>
                  45-Minute Unhurried Visit
                </span>
                <button
                  onClick={() => openBookingModal()}
                  style={{ color: '#081F18', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  Consult <ChevronRight size={15} />
                </button>
              </div>
            </motion.div>

            {/* Bento 3: Pure Herbal Tailams (Spans 4 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="ayur-card bento-item-span-4"
              style={{
                gridColumn: 'span 4',
                padding: '30px 26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(197, 154, 68, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <Leaf size={24} color="#C59A44" />
                </div>
                <h4 style={{ fontSize: '1.25rem', color: '#081F18', marginBottom: '8px' }}>
                  Handcrafted Herbal Oils
                </h4>
                <p style={{ color: '#5C6E66', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  Boiled for 72 hours with fresh botanicals in our pharmacy to achieve authentic therapeutic potency.
                </p>
              </div>

              <div style={{ marginTop: '20px', fontSize: '0.78rem', color: '#8E6822', fontWeight: 600 }}>
                100% Zero Synthetic Additives
              </div>
            </motion.div>

            {/* Bento 4: Spine & Marma Pain Relief (Spans 4 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="ayur-card bento-item-span-4"
              style={{
                gridColumn: 'span 4',
                padding: '30px 26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(21, 65, 51, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <Heart size={24} color="#154133" />
                </div>
                <h4 style={{ fontSize: '1.25rem', color: '#081F18', marginBottom: '8px' }}>
                  Spine & Joint Decompression
                </h4>
                <p style={{ color: '#5C6E66', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  Specialized warm medicated oil wells (Kati Vasti) and warm leaf poultices (Elakizhi) for herniated discs and sciatica.
                </p>
              </div>

              <button
                onClick={() => openBookingModal({ treatmentId: 'pain-management' })}
                style={{ marginTop: '20px', color: '#154133', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Explore Pain Care <ChevronRight size={15} />
              </button>
            </motion.div>

            {/* Bento 5: Kerala Healing Climate & Sanctuary (Spans 4 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="ayur-card bento-item-span-4"
              style={{
                gridColumn: 'span 4',
                background: 'linear-gradient(135deg, #0E2E24 0%, #081F18 100%)',
                color: '#FAF8F5',
                padding: '30px 26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(197, 154, 68, 0.3)'
              }}
            >
              <div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(197, 154, 68, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <Compass size={24} color="#E4C078" />
                </div>
                <h4 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '8px' }}>
                  Tranquil Kerala Micro-Climate
                </h4>
                <p style={{ color: '#D6DED9', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  Kalpathy valley breeze, traditional teak architecture, and garden silence that naturally downregulates cortisol.
                </p>
              </div>

              <div style={{ marginTop: '20px', fontSize: '0.78rem', color: '#E4C078', fontWeight: 600 }}>
                Ideal Humidity for Cellular Absorption
              </div>
            </motion.div>
          </div>
        </div>

        {/* Responsive Bento styling */}
        <style>{`
          @media (max-width: 980px) {
            .bento-item-span-8 { grid-column: span 12 !important; }
            .bento-item-span-4 { grid-column: span 6 !important; }
          }
          @media (max-width: 640px) {
            .bento-item-span-8, .bento-item-span-4 { grid-column: span 12 !important; }
          }
        `}</style>
      </section>

      {/* ==========================================================================
          3. INTERACTIVE AYURVEDIC DOSHA DISCOVERY (Engaging Diagnostic Module)
          ========================================================================== */}
      <section style={{
        padding: '90px 0',
        background: 'linear-gradient(180deg, #F3EDE0 0%, #FAF8F5 100%)',
        borderTop: '1px solid rgba(197, 154, 68, 0.2)',
        borderBottom: '1px solid rgba(197, 154, 68, 0.2)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px auto' }}>
            <span className="section-tag">Interactive Prakriti Assessment</span>
            <h2 style={{ fontSize: '2.5rem', color: '#081F18', marginBottom: '12px' }}>
              Discover Your <span style={{ color: '#C59A44', fontStyle: 'italic' }}>Ayurvedic Constitution</span>
            </h2>
            <p style={{ fontSize: '1rem', color: '#5C6E66', lineHeight: 1.7 }}>
              Ayurveda identifies three biological energies (Doshas). Select your constitution below to preview how our Vaidyas tailor your therapies.
            </p>
            <div className="gold-divider-center" />
          </div>

          {/* Dosha Selector Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {['vata', 'pitta', 'kapha'].map((dKey) => {
              const d = doshaData[dKey];
              const isSelected = selectedDosha === dKey;
              const IconComp = d.icon;
              return (
                <button
                  key={dKey}
                  onClick={() => setSelectedDosha(dKey)}
                  className={`dosha-tab-btn ${isSelected ? 'active' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <IconComp size={18} color={isSelected ? '#F5D794' : '#8E6822'} />
                  <span>{d.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Dosha Display Card with Framer Motion AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDosha}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="ayur-card"
              style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '40px',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-card)',
                background: '#FFFFFF',
                border: '1.5px solid rgba(197, 154, 68, 0.35)'
              }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '36px',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span className="badge-gold">
                      {doshaData[selectedDosha].element}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.9rem', color: '#081F18', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>
                    {doshaData[selectedDosha].name}
                  </h3>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8E6822', fontWeight: 700 }}>
                      Dominant Qualities:
                    </div>
                    <div style={{ fontSize: '0.94rem', color: '#1E3B32', fontWeight: 600 }}>
                      {doshaData[selectedDosha].qualities}
                    </div>
                  </div>

                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8E6822', fontWeight: 700 }}>
                      Common Imbalance Signs:
                    </div>
                    <div style={{ fontSize: '0.92rem', color: '#5C6E66', lineHeight: 1.6 }}>
                      {doshaData[selectedDosha].symptoms}
                    </div>
                  </div>
                </div>

                {/* Right side: Tailored solution */}
                <div style={{
                  background: 'linear-gradient(145deg, #FAF7F0 0%, #F3EDE0 100%)',
                  padding: '28px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(197, 154, 68, 0.3)'
                }}>
                  <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8E6822', fontWeight: 700, marginBottom: '8px' }}>
                    Classical Healing Protocol:
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#081F18', lineHeight: 1.65, marginBottom: '18px', fontWeight: 500 }}>
                    {doshaData[selectedDosha].solution}
                  </p>

                  <div style={{
                    padding: '14px 18px',
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(197, 154, 68, 0.25)',
                    marginBottom: '20px'
                  }}>
                    <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#5C6E66', fontWeight: 700 }}>
                      Recommended Therapy
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#081F18' }}>
                      {doshaData[selectedDosha].recommendedTreatment}
                    </div>
                  </div>

                  <button
                    onClick={() => openBookingModal({ treatmentId: doshaData[selectedDosha].treatmentId })}
                    className="btn-gold"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Calendar size={16} /> Book for My Constitution
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ==========================================================================
          4. FEATURED TIME-HONORED THERAPIES (Scroll-Driven Cards & Tabs)
          ========================================================================== */}
      <section style={{
        padding: '100px 0',
        background: 'var(--color-paper-white)'
      }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px auto' }}
          >
            <span className="section-tag">Clinical Treatments</span>
            <h2 style={{ fontSize: '2.6rem', color: '#081F18', marginBottom: '12px' }}>
              Classical Therapies for <span style={{ color: '#C59A44', fontStyle: 'italic' }}>Deep Restoration</span>
            </h2>
            <p style={{ fontSize: '1.02rem', color: '#5C6E66', lineHeight: 1.7 }}>
              Prescribed individually and administered strictly by licensed Kerala therapists under the continuous oversight of our senior Vaidyas.
            </p>
            <div className="gold-divider-center" />
          </motion.div>

          {/* Filter Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '46px'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '9px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  background: selectedCategory === cat ? '#081F18' : 'rgba(255, 255, 255, 0.8)',
                  color: selectedCategory === cat ? '#F5D794' : '#2C4A40',
                  border: selectedCategory === cat ? '1px solid #C59A44' : '1px solid rgba(197, 154, 68, 0.25)',
                  boxShadow: selectedCategory === cat ? '0 4px 14px rgba(8, 31, 24, 0.2)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Therapy Cards Grid with Scroll-Driven Stagger */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '30px'
          }}>
            {filteredTreatments.map((treatment, idx) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="ayur-card"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {/* Image Showcase */}
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                  <img
                    src={treatment.imageUrl}
                    alt={treatment.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(8, 31, 24, 0.85)',
                    color: '#F5D794',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(197, 154, 68, 0.3)'
                  }}>
                    {treatment.category}
                  </div>
                </div>

                {/* Body Content */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    color: '#5C6E66',
                    marginBottom: '10px'
                  }}>
                    <Clock size={14} color="#C59A44" />
                    <span>{treatment.duration}</span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', color: '#081F18', marginBottom: '10px' }}>
                    {treatment.name}
                  </h3>

                  <p style={{
                    fontSize: '0.9rem',
                    color: '#1E3B32',
                    lineHeight: 1.65,
                    marginBottom: '22px',
                    flex: 1
                  }}>
                    {treatment.shortDescription}
                  </p>

                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <button
                      onClick={() => openTreatmentModal(treatment)}
                      className="btn-outline"
                      style={{
                        flex: 1,
                        padding: '11px 12px',
                        fontSize: '0.84rem',
                        justifyContent: 'center'
                      }}
                    >
                      Protocol
                    </button>
                    <button
                      onClick={() => openBookingModal({ treatmentId: treatment.id })}
                      className="btn-gold"
                      style={{
                        flex: 1,
                        padding: '11px 12px',
                        fontSize: '0.84rem',
                        justifyContent: 'center'
                      }}
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '54px' }}>
            <Link to="/treatments" className="btn-primary" style={{ padding: '15px 36px' }}>
              <span>View All 15+ Classical Treatments</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          5. IMMERSION WELLNESS PROGRAMS (7 to 21-Day Sanctuary Retreats)
          ========================================================================== */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(180deg, #0E2E24 0%, #081F18 100%)',
        color: '#FAF8F5',
        position: 'relative'
      }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 56px auto' }}
          >
            <span className="badge-gold" style={{ marginBottom: '14px', background: 'rgba(197, 154, 68, 0.2)', color: '#F5D794' }}>
              Curated Residential Retreats
            </span>
            <h2 style={{ fontSize: '2.6rem', color: '#FAF8F5', marginBottom: '14px' }}>
              Immersion Healing <span style={{ color: '#E4C078', fontStyle: 'italic' }}>Programs</span>
            </h2>
            <p style={{ fontSize: '1.02rem', color: '#D6DED9', lineHeight: 1.7 }}>
              Deep physiological reset combining continuous Vaidya monitoring, daily dual-therapist sessions, custom herbal cuisine, and daily pranayama breathwork.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {PROGRAMS.map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="luxury-dark-card"
                style={{
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px'
                }}>
                  <span className="badge-gold" style={{ background: 'rgba(197, 154, 68, 0.25)', color: '#F5D794' }}>
                    {program.duration}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#E4C078', fontWeight: 700, letterSpacing: '0.04em' }}>
                    {program.tag}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.5rem', color: '#FAF8F5', marginBottom: '8px' }}>
                  {program.name}
                </h3>

                <div style={{ fontSize: '1.25rem', color: '#E4C078', fontWeight: 800, marginBottom: '16px' }}>
                  {program.price}
                </div>

                <p style={{ fontSize: '0.92rem', color: '#D6DED9', lineHeight: 1.65, marginBottom: '24px' }}>
                  {program.shortDescription}
                </p>

                <div style={{ marginBottom: '28px', flex: 1 }}>
                  <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#E4C078', fontWeight: 700, marginBottom: '12px' }}>
                    Retreat Inclusions:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {program.inclusions.slice(0, 4).map((inc, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.86rem', color: '#F3EFE6' }}>
                        <CheckCircle2 size={16} color="#E4C078" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Link
                    to="/programs"
                    className="btn-outline-gold"
                    style={{ flex: 1, padding: '12px', fontSize: '0.86rem', justifyContent: 'center' }}
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => openBookingModal()}
                    className="btn-gold"
                    style={{ flex: 1, padding: '12px', fontSize: '0.86rem', justifyContent: 'center' }}
                  >
                    Enquire Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          6. AUTO-ROTATING PATIENT TESTIMONIALS CAROUSEL (with Progress Bar & Controls)
          ========================================================================== */}
      <section style={{
        padding: '100px 0',
        background: 'var(--color-paper-white)',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 50px auto' }}>
            <span className="section-tag">Clinical Transformations</span>
            <h2 style={{ fontSize: '2.6rem', color: '#081F18', marginBottom: '12px' }}>
              Stories of <span style={{ color: '#C59A44', fontStyle: 'italic' }}>Healing & Renewal</span>
            </h2>
            <p style={{ fontSize: '1rem', color: '#5C6E66', lineHeight: 1.7 }}>
              Real patient voices restored to health through our classical Kerala Ayurvedic methods.
            </p>
            <div className="gold-divider-center" />
          </div>

          {/* Testimonial Stage Carousel */}
          <div 
            style={{ maxWidth: '840px', margin: '0 auto', position: 'relative' }}
            onMouseEnter={() => setIsTestimonialPaused(true)}
            onMouseLeave={() => setIsTestimonialPaused(false)}
          >
            {/* Top Auto-Rotation Progress Bar */}
            <div style={{
              width: '100%',
              height: '4px',
              background: 'rgba(197, 154, 68, 0.15)',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '20px'
            }}>
              <div style={{
                height: '100%',
                width: `${testimonialProgress}%`,
                background: 'linear-gradient(90deg, #9F7626, #E4C078)',
                transition: 'width 0.05s linear'
              }} />
            </div>

            {/* Carousel Card with Smooth AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonialIdx}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="ayur-card"
                style={{
                  padding: '44px 38px',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-card)',
                  position: 'relative',
                  background: '#FFFFFF'
                }}
              >
                {/* Decorative Quote Mark */}
                <Quote size={48} color="rgba(197, 154, 68, 0.2)" style={{ position: 'absolute', top: '30px', right: '34px' }} />

                {/* Rating Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {[...Array(TESTIMONIALS[activeTestimonialIdx].rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#C59A44" color="#C59A44" />
                  ))}
                </div>

                {/* Quote Text */}
                <p style={{
                  fontSize: '1.18rem',
                  color: '#081F18',
                  lineHeight: 1.8,
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '28px'
                }}>
                  "{TESTIMONIALS[activeTestimonialIdx].quote}"
                </p>

                {/* Patient Profile */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(197, 154, 68, 0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #174133 0%, #081F18 100%)',
                      color: '#F5D794',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      border: '1.5px solid #C59A44'
                    }}>
                      {TESTIMONIALS[activeTestimonialIdx].name.split(' ').map(n => n[0]).join('')}
                    </div>

                    <div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#081F18' }}>
                        {TESTIMONIALS[activeTestimonialIdx].name}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#5C6E66' }}>
                        {TESTIMONIALS[activeTestimonialIdx].treatment} • {TESTIMONIALS[activeTestimonialIdx].location}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.78rem',
                    color: '#166534',
                    background: 'rgba(22, 101, 52, 0.1)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600
                  }}>
                    <CheckCircle2 size={13} /> Verified Patient Care
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls: Chevrons, Dots & Pause/Play Indicator */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '28px'
            }}>
              {/* Prev / Next buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handlePrevTestimonial}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1.5px solid rgba(197, 154, 68, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#081F18',
                    boxShadow: 'var(--shadow-subtle)',
                    transition: 'all 0.2s'
                  }}
                  title="Previous Story"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={handleNextTestimonial}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1.5px solid rgba(197, 154, 68, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#081F18',
                    boxShadow: 'var(--shadow-subtle)',
                    transition: 'all 0.2s'
                  }}
                  title="Next Story"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Indicator Dots */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setTestimonialProgress(0);
                      setActiveTestimonialIdx(i);
                    }}
                    style={{
                      width: activeTestimonialIdx === i ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: activeTestimonialIdx === i ? '#C59A44' : 'rgba(197, 154, 68, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Pause/Play State Indicator */}
              <button
                onClick={() => setIsTestimonialPaused(!isTestimonialPaused)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  color: '#5C6E66',
                  fontWeight: 600
                }}
              >
                {isTestimonialPaused ? <Play size={14} color="#C59A44" /> : <Pause size={14} color="#C59A44" />}
                <span>{isTestimonialPaused ? 'Paused' : 'Auto-Rotating'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          7. FREQUENTLY ASKED QUESTIONS (Interactive Smooth Accordion)
          ========================================================================== */}
      <section style={{
        padding: '90px 0',
        background: 'var(--color-cream-warm)',
        borderTop: '1px solid rgba(197, 154, 68, 0.25)'
      }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: '46px' }}>
            <span className="section-tag">Clarity & Confidence</span>
            <h2 style={{ fontSize: '2.5rem', color: '#081F18', marginBottom: '12px' }}>
              Frequently Asked <span style={{ color: '#C59A44', fontStyle: 'italic' }}>Questions</span>
            </h2>
            <p style={{ fontSize: '1rem', color: '#5C6E66' }}>
              Everything you need to know about your sanctuary visit and Kerala Ayurvedic healing.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(197, 154, 68, 0.25)',
                    boxShadow: 'var(--shadow-subtle)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    style={{
                      width: '100%',
                      padding: '22px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: '1.05rem',
                      color: isOpen ? '#8E6822' : '#081F18',
                      transition: 'color 0.2s'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronRight 
                      size={20} 
                      color={isOpen ? '#C59A44' : '#85968E'} 
                      style={{ 
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        flexShrink: 0,
                        marginLeft: '12px'
                      }} 
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div style={{
                          padding: '0 24px 22px 24px',
                          color: '#3A5248',
                          fontSize: '0.94rem',
                          lineHeight: 1.7,
                          borderTop: '1px solid rgba(197, 154, 68, 0.12)',
                          paddingTop: '16px'
                        }}>
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          8. OPULENT FINAL INVITATION CTA
          ========================================================================== */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #FAF7F0 0%, #EFE8DA 100%)',
        borderTop: '2px solid #C59A44',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container-narrow">
          <div style={{ marginBottom: '24px' }}>
            <Logo variant="stacked" size={44} />
          </div>
          <span className="badge-gold" style={{ marginBottom: '16px' }}>
            Your Healing Journey Awaits
          </span>

          <h2 style={{
            fontSize: 'clamp(2.4rem, 4.4vw, 3.4rem)',
            color: '#081F18',
            marginBottom: '18px',
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.15
          }}>
            Ready to reclaim your <br />
            <span style={{ color: '#C59A44', fontStyle: 'italic', fontWeight: 500 }}>
              natural vitality & peace?
            </span>
          </h2>

          <p style={{
            fontSize: '1.14rem',
            color: '#1E3B32',
            lineHeight: 1.8,
            marginBottom: '38px',
            maxWidth: '620px',
            margin: '0 auto 38px auto'
          }}>
            Whether you seek profound relief from chronic ailments or a calm sanctuary for an immersive retreat, our senior Kerala Vaidyas are ready to guide you.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <button
              onClick={() => openBookingModal()}
              className="btn-gold shimmer-effect"
              style={{ padding: '16px 38px', fontSize: '1rem' }}
            >
              <Calendar size={18} /> Reserve Your Consultation
            </button>

            <Link
              to="/contact"
              className="btn-primary"
              style={{ padding: '16px 32px', fontSize: '1rem' }}
            >
              Visit the Sanctuary
            </Link>

            <a
              href={`https://wa.me/${CENTER_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
              style={{ padding: '16px 28px', fontSize: '1rem', borderColor: '#166534', color: '#166534' }}
            >
              <MessageCircle size={18} /> WhatsApp Concierge
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
