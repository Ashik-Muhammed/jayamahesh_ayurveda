// Contact & Appointment Page
import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Car, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Calendar,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import { CENTER_INFO, TREATMENTS, DOCTORS } from '../services/initialData';

export default function Contact() {
  const { openBookingModal, getSlotsForDate, submitEnquiry } = useAppointments();

  const [openFaq, setOpenFaq] = useState(0);

  // In-page Quick Form State
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    whatsapp: '',
    email: '',
    treatmentId: TREATMENTS[0].id,
    preferredDoctor: DOCTORS[0].name,
    preferredDate: '',
    preferredSlot: '',
    notes: ''
  });

  const [slotOptions, setSlotOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [formError, setFormError] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  const handleDateChange = (e) => {
    const d = e.target.value;
    setFormData(prev => ({ ...prev, preferredDate: d }));
    if (d) {
      const slots = getSlotsForDate(d);
      setSlotOptions(slots);
      const firstAvailable = slots.find(s => s.available);
      setFormData(prev => ({ ...prev, preferredSlot: firstAvailable ? firstAvailable.slot : '' }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setFormError('Please fill in your name, contact phone, and email address.');
      return;
    }
    if (!formData.preferredDate || !formData.preferredSlot) {
      setFormError('Please choose a preferred consultation date and available slot.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    const treatmentObj = TREATMENTS.find(t => t.id === formData.treatmentId);

    const payload = {
      patientName: formData.patientName.trim(),
      phone: formData.phone.trim(),
      whatsapp: formData.whatsapp.trim() || formData.phone.trim(),
      email: formData.email.trim(),
      treatmentId: formData.treatmentId,
      treatmentName: treatmentObj ? treatmentObj.name : 'Ayurvedic Consultation',
      preferredDoctor: formData.preferredDoctor,
      preferredDate: formData.preferredDate,
      preferredSlot: formData.preferredSlot,
      notes: formData.notes.trim()
    };

    const res = await submitEnquiry(payload);
    setIsSubmitting(false);

    if (res.success) {
      setSubmitSuccess(res.appointment);
    } else {
      setFormError('Could not record appointment. Please contact our front desk directly.');
    }
  };

  const faqs = [
    {
      q: "How long does a consultation take and how should I prepare?",
      a: "Our consultations are unhurried, lasting approximately 45 minutes. Dr. Ananya or the consulting Vaidya conducts a comprehensive Nadi Pariksha (pulse reading) and examines your dietary history. We recommend avoiding heavy meals and caffeinated drinks for 2 hours beforehand."
    },
    {
      q: "Is parking and accommodation available at the center?",
      a: "Yes, Jaya Mahesh provides secure on-site parking for all day visitors. For patients undergoing multi-day Panchakarma or retreat programs, we provide peaceful traditional Kerala Nalukettu heritage cottages nestled within our herb gardens."
    },
    {
      q: "Are the herbal oils and medicines prepared on-site?",
      a: "Yes. All medicated Tailams (oils), Kashayams (decoctions), and herbal Kizhi poultices are formulated in our classical pharmacy using organically harvested botanicals from the Western Ghats under strict Vaidya supervision."
    },
    {
      q: "What is your appointment confirmation and cancellation policy?",
      a: "Submitting an online request reserves a provisional slot. Our patient coordination desk will contact you via phone or WhatsApp to verify health notes and finalize your time. We kindly request at least 24 hours' notice for rescheduling."
    }
  ];

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
            We Welcome You
          </span>
          <h1 style={{ fontSize: '3rem', color: '#FBFAF7', marginBottom: '16px' }}>
            Contact & <br />
            <span style={{ color: '#E4C078', fontStyle: 'italic' }}>Appointment Desk</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#D6DED9', lineHeight: 1.7, margin: '0 auto' }}>
            Reach our patient coordination team in Palakkad, Kerala. We are here to assist with treatment advice, slot availability, and travel guidance.
          </p>
        </div>
      </section>

      {/* Main Grid: Details & In-page Booking Form */}
      <section style={{ padding: '80px 0 100px 0', background: 'var(--color-paper-white)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '56px'
          }}>
            {/* Left: Contact Info & Map Card */}
            <div>
              <span className="section-tag">Direct Communication</span>
              <h2 style={{ fontSize: '2.3rem', color: '#0C2B24', marginBottom: '24px' }}>
                Visit Our Sanctuary
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
                {/* Phone */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: '#173A30',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Phone size={20} color="#E4C078" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#77837D', fontWeight: 600 }}>
                      Official Phone
                    </div>
                    <a href={`tel:${CENTER_INFO.phone}`} style={{ fontSize: '1.15rem', color: '#0C2B24', fontWeight: 700 }}>
                      {CENTER_INFO.phone}
                    </a>
                    <div style={{ fontSize: '0.8rem', color: '#77837D' }}>Direct reception & physician queries</div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: '#166534',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MessageCircle size={20} color="#FFFFFF" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#77837D', fontWeight: 600 }}>
                      WhatsApp Direct Desk
                    </div>
                    <a 
                      href={`https://wa.me/${CENTER_INFO.whatsapp.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ fontSize: '1.15rem', color: '#166534', fontWeight: 700 }}
                    >
                      {CENTER_INFO.whatsapp}
                    </a>
                    <div style={{ fontSize: '0.8rem', color: '#77837D' }}>Quick appointment confirmations & reports</div>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: '#173A30',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Mail size={20} color="#E4C078" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#77837D', fontWeight: 600 }}>
                      Email Inquiries
                    </div>
                    <a href={`mailto:${CENTER_INFO.email}`} style={{ fontSize: '1.1rem', color: '#0C2B24', fontWeight: 700 }}>
                      {CENTER_INFO.email}
                    </a>
                    <div style={{ fontSize: '0.8rem', color: '#77837D' }}>Send medical histories & retreat enquiries</div>
                  </div>
                </div>

                {/* Address & Timings */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: '#173A30',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={20} color="#E4C078" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#77837D', fontWeight: 600 }}>
                      Center Address
                    </div>
                    <div style={{ fontSize: '0.98rem', color: '#0C2B24', fontWeight: 600 }}>
                      {CENTER_INFO.address}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#77837D', marginTop: '4px' }}>
                      <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {CENTER_INFO.openingHoursText}
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrival & Parking Card */}
              <div style={{
                background: 'var(--color-cream-warm)',
                border: '1px solid var(--color-border-soft)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <Car size={22} color="#C69A45" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.88rem', color: '#18352D' }}>
                  <strong>Parking & Accessibility:</strong> Ample shaded private car parking is available on center grounds. Wheelchair ramps are installed at both consultation and therapy wings.
                </div>
              </div>

              {/* Map Preview Graphic */}
              <div style={{
                marginTop: '24px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--color-border-soft)',
                position: 'relative',
                height: '180px',
                background: '#E2E8F0'
              }}>
                <img
                  src="/images/hero.jpg"
                  alt="Location map visual"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  background: 'rgba(12, 43, 36, 0.45)'
                }}>
                  <MapPin size={32} color="#E4C078" />
                  <span style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '6px' }}>Palakkad Valley, Kerala</span>
                  <a
                    href={CENTER_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold"
                    style={{ padding: '6px 16px', fontSize: '0.78rem', marginTop: '8px' }}
                  >
                    Get Directions in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Right: In-Page Full Enquiry Form */}
            <div style={{
              background: 'var(--color-pure-white)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--color-border-soft)'
            }}>
              <span className="badge-gold" style={{ marginBottom: '10px' }}>
                Online Reservation
              </span>
              <h3 style={{ fontSize: '1.8rem', color: '#0C2B24', marginBottom: '8px' }}>
                Request an Appointment
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#77837D', marginBottom: '24px' }}>
                Fill in your details below. Our desk will contact you to confirm your consultation slot.
              </p>

              {formError && (
                <div style={{
                  background: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  color: '#B91C1C',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  marginBottom: '18px'
                }}>
                  {formError}
                </div>
              )}

              {submitSuccess ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }} className="animate-fade-in">
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(198,154,69,0.15)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <ShieldCheck size={32} color="#059669" />
                  </div>
                  <h4 style={{ fontSize: '1.3rem', color: '#0C2B24', marginBottom: '6px' }}>
                    Request Received
                  </h4>
                  <div className="badge-gold" style={{ marginBottom: '14px' }}>
                    Ref: {submitSuccess.id}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#18352D', lineHeight: 1.6, marginBottom: '20px' }}>
                    Thank you, <strong>{submitSuccess.patientName}</strong>. Your consultation request for <strong>{submitSuccess.preferredDate}</strong> at <strong>{submitSuccess.preferredSlot}</strong> has been logged.
                  </p>
                  <a
                    href={`https://wa.me/${CENTER_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Namaste, I sent an appointment request (Ref: ${submitSuccess.id}) for ${submitSuccess.patientName}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <MessageCircle size={16} /> WhatsApp the Center Desk
                  </a>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Anjali Nair"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="+91 98470 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">WhatsApp Number</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="Optional if same"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="your.email@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="form-group">
                      <label className="form-label">Preferred Treatment</label>
                      <select
                        className="form-select"
                        value={formData.treatmentId}
                        onChange={(e) => setFormData({ ...formData, treatmentId: e.target.value })}
                      >
                        {TREATMENTS.map(t => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Consulting Physician</label>
                      <select
                        className="form-select"
                        value={formData.preferredDoctor}
                        onChange={(e) => setFormData({ ...formData, preferredDoctor: e.target.value })}
                      >
                        {DOCTORS.map(d => (
                          <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Date *</label>
                    <input
                      type="date"
                      min={todayStr}
                      className="form-input"
                      value={formData.preferredDate}
                      onChange={handleDateChange}
                      required
                    />
                  </div>

                  {formData.preferredDate && (
                    <div className="form-group">
                      <label className="form-label">Available Time Slot *</label>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))',
                        gap: '8px'
                      }}>
                        {slotOptions.map(({ slot, available, reason }) => (
                          <button
                            key={slot}
                            type="button"
                            disabled={!available}
                            onClick={() => setFormData({ ...formData, preferredSlot: slot })}
                            style={{
                              padding: '8px 6px',
                              borderRadius: '6px',
                              border: formData.preferredSlot === slot
                                ? '2px solid #C69A45'
                                : available
                                ? '1px solid #D6DED9'
                                : '1px dashed #E2E8F0',
                              background: formData.preferredSlot === slot
                                ? '#173A30'
                                : available
                                ? '#FFFFFF'
                                : '#F8FAFC',
                              color: formData.preferredSlot === slot
                                ? '#E4C078'
                                : available
                                ? '#0C2B24'
                                : '#94A3B8',
                              fontSize: '0.8rem',
                              fontWeight: formData.preferredSlot === slot ? 700 : 500,
                              cursor: available ? 'pointer' : 'not-allowed'
                            }}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Health Concern / Note (Optional)</label>
                    <textarea
                      className="form-textarea"
                      rows={2}
                      placeholder="Briefly describe your symptoms or reason for visit..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold"
                    style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '10px' }}
                  >
                    <Send size={16} />
                    <span>{isSubmitting ? 'Recording Request...' : 'Submit Consultation Request'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* FAQs Accordion */}
          <div style={{ marginTop: '90px' }}>
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
              <span className="section-tag" style={{ justifyContent: 'center' }}>Visitor Inquiries</span>
              <h2 style={{ fontSize: '2.2rem', color: '#0C2B24', marginBottom: '10px' }}>
                Frequently Asked <span style={{ color: '#C69A45', fontStyle: 'italic' }}>Questions</span>
              </h2>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      border: '1px solid var(--color-border-soft)',
                      borderRadius: 'var(--radius-md)',
                      background: isOpen ? 'var(--color-cream-warm)' : 'var(--color-pure-white)',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '18px 24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'left',
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: '#0C2B24'
                      }}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={18} color="#C69A45" /> : <ChevronDown size={18} color="#77837D" />}
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 24px 20px 24px', fontSize: '0.92rem', color: '#18352D', lineHeight: 1.7 }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
