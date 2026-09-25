// Global Appointment Booking Modal with Step Validation & Real-time Slot Availability
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Phone, 
  Mail, 
  MessageCircle, 
  FileText,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import { TREATMENTS, DOCTORS, CENTER_INFO } from '../services/initialData';
import Logo from './Logo';

export default function BookModal() {
  const { 
    isBookingModalOpen, 
    closeBookingModal, 
    bookingPreselect, 
    getSlotsForDate, 
    submitEnquiry 
  } = useAppointments();

  const [step, setStep] = useState(1); // 1: Info & Service, 2: Date & Slot, 3: Success Confirmation
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    whatsapp: '',
    email: '',
    treatmentId: '',
    preferredDoctor: '',
    preferredDate: '',
    preferredSlot: '',
    notes: ''
  });

  const [slotOptions, setSlotOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppointment, setSubmittedAppointment] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Today's date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Pre-fill on modal open
  useEffect(() => {
    if (isBookingModalOpen) {
      setStep(1);
      setErrorMsg('');
      setSubmittedAppointment(null);
      setFormData(prev => ({
        ...prev,
        treatmentId: bookingPreselect.treatmentId || TREATMENTS[0].id,
        preferredDoctor: bookingPreselect.doctorId || DOCTORS[0].name,
        preferredDate: prev.preferredDate || getTomorrowStr()
      }));
    }
  }, [isBookingModalOpen, bookingPreselect]);

  // Update slots when date changes
  useEffect(() => {
    if (formData.preferredDate) {
      const slots = getSlotsForDate(formData.preferredDate);
      setSlotOptions(slots);

      // If current preferredSlot is no longer available, reset it
      const currentSelected = slots.find(s => s.slot === formData.preferredSlot);
      if (!currentSelected || !currentSelected.available) {
        const firstAvailable = slots.find(s => s.available);
        setFormData(prev => ({ ...prev, preferredSlot: firstAvailable ? firstAvailable.slot : '' }));
      }
    }
  }, [formData.preferredDate]);

  function getTomorrowStr() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }

  if (!isBookingModalOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleStep1Next = (e) => {
    e.preventDefault();
    if (!formData.patientName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setErrorMsg('Please provide a valid contact phone number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please provide a valid email address for confirmation.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.preferredDate) {
      setErrorMsg('Please select a preferred consultation date.');
      return;
    }
    if (!formData.preferredSlot) {
      setErrorMsg('Please choose an available time slot for your appointment.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const treatmentObj = TREATMENTS.find(t => t.id === formData.treatmentId);

    const submissionPayload = {
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

    const res = await submitEnquiry(submissionPayload);
    setIsSubmitting(false);

    if (res.success) {
      setSubmittedAppointment(res.appointment);
      setStep(3);
    } else {
      setErrorMsg('Failed to record appointment request. Please retry or contact us directly.');
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(12, 43, 36, 0.72)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeBookingModal();
      }}
    >
      <div 
        style={{
          background: 'var(--color-paper-white)',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '92vh',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-modal)',
          border: '1px solid var(--color-border-soft)',
          overflowY: 'auto',
          position: 'relative'
        }}
        className="animate-fade-in"
      >
        {/* Header Bar */}
        <div style={{
          background: 'linear-gradient(135deg, #0E2E24 0%, #081F18 100%)',
          color: '#FBFAF7',
          padding: '20px 26px',
          borderBottom: '2px solid #C59A44',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <Logo theme="dark" size="sm" />
            <h3 style={{ color: '#FBFAF7', fontSize: '1.25rem', margin: '8px 0 0 0' }}>
              Request Your <span style={{ color: '#E4C078', fontStyle: 'italic' }}>Sanctuary Consultation</span>
            </h3>
          </div>

          <button 
            onClick={closeBookingModal}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FBFAF7',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 3 && (
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--color-border-soft)',
            background: 'var(--color-cream-warm)'
          }}>
            <div style={{
              flex: 1,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: step === 1 ? '#0C2B24' : '#77837D',
              borderBottom: step === 1 ? '2px solid #C69A45' : 'none'
            }}>
              <span style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: step === 1 ? '#173A30' : '#D6DED9',
                color: step === 1 ? '#E4C078' : '#77837D',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem'
              }}>1</span>
              Guest & Treatment
            </div>

            <div style={{
              flex: 1,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: step === 2 ? '#0C2B24' : '#77837D',
              borderBottom: step === 2 ? '2px solid #C69A45' : 'none'
            }}>
              <span style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: step === 2 ? '#173A30' : '#D6DED9',
                color: step === 2 ? '#E4C078' : '#77837D',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem'
              }}>2</span>
              Schedule & Slot
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div style={{ padding: '26px 28px' }}>
          {errorMsg && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              color: '#B91C1C',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Personal & Treatment Info */}
          {step === 1 && (
            <form onSubmit={handleStep1Next}>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={15} color="#C69A45" /> Full Name *
                </label>
                <input
                  type="text"
                  name="patientName"
                  className="form-input"
                  placeholder="e.g. Radhika Menon"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={15} color="#C69A45" /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="+91 98470 00000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MessageCircle size={15} color="#166534" /> WhatsApp (if different)
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    className="form-input"
                    placeholder="Same as phone or alternate"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={15} color="#C69A45" /> Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="your.email@domain.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Requested Treatment *</label>
                  <select
                    name="treatmentId"
                    className="form-select"
                    value={formData.treatmentId}
                    onChange={handleInputChange}
                  >
                    {TREATMENTS.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Doctor / Vaidya</label>
                  <select
                    name="preferredDoctor"
                    className="form-select"
                    value={formData.preferredDoctor}
                    onChange={handleInputChange}
                  >
                    <option value="">Any Available Physician</option>
                    {DOCTORS.map(d => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Continue to Select Date & Time</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Date & Available Slots */}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#77837D',
                    fontSize: '0.85rem'
                  }}
                >
                  <ArrowLeft size={14} /> Back to details
                </button>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CalendarIcon size={15} color="#C69A45" /> Select Consultation Date *
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  min={todayStr}
                  className="form-input"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  required
                />
                <span style={{ fontSize: '0.75rem', color: '#77837D', marginTop: '4px', display: 'block' }}>
                  Center operates Monday to Saturday. Sunday consultations require special confirmation.
                </span>
              </div>

              {/* Time Slots Section */}
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={15} color="#C69A45" /> Select Available Time Slot *
                </label>

                {slotOptions.length === 0 ? (
                  <div style={{ padding: '16px', background: 'var(--color-cream-warm)', borderRadius: '8px', fontSize: '0.88rem' }}>
                    Please pick a date to view available appointment slots.
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(115px, 1fr))',
                    gap: '10px',
                    marginTop: '8px'
                  }}>
                    {slotOptions.map(({ slot, available, reason }) => {
                      const isSelected = formData.preferredSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={!available}
                          onClick={() => {
                            if (available) {
                              setFormData(prev => ({ ...prev, preferredSlot: slot }));
                            }
                          }}
                          style={{
                            padding: '10px 8px',
                            borderRadius: '8px',
                            border: isSelected
                              ? '2px solid #C69A45'
                              : available
                              ? '1.5px solid #D6DED9'
                              : '1px dashed #CBD5E1',
                            background: isSelected
                              ? '#173A30'
                              : available
                              ? 'var(--color-pure-white)'
                              : '#F1F5F9',
                            color: isSelected
                              ? '#E4C078'
                              : available
                              ? '#0C2B24'
                              : '#94A3B8',
                            fontSize: '0.85rem',
                            fontWeight: isSelected ? 700 : 500,
                            cursor: available ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            transition: 'all 0.15s ease'
                          }}
                          title={!available ? reason : 'Available'}
                        >
                          <span>{slot}</span>
                          {!available && (
                            <span style={{ fontSize: '0.65rem', color: '#EF4444', marginTop: '2px' }}>
                              {reason || 'Unavailable'}
                            </span>
                          )}
                          {isSelected && (
                            <span style={{ fontSize: '0.65rem', color: '#E4C078', marginTop: '2px' }}>
                              Selected
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Health Notes */}
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={15} color="#C69A45" /> Health Concern or Special Note (Optional)
                </label>
                <textarea
                  name="notes"
                  className="form-textarea"
                  rows={2}
                  placeholder="Share any prevailing symptoms, previous treatments, or questions for our doctors..."
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{
                background: 'rgba(23, 58, 48, 0.05)',
                border: '1px solid rgba(23, 58, 48, 0.12)',
                borderRadius: '8px',
                padding: '12px 14px',
                fontSize: '0.78rem',
                color: '#18352D',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <ShieldCheck size={16} color="#C69A45" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>Request Policy:</strong> Submitting this request creates a provisional reservation. Our patient desk will contact you via phone or WhatsApp to finalize your slot and answer medical questions.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-outline"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold"
                  style={{ flex: 2, justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? 'Confirming with Center...' : 'Submit Appointment Request'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Success Confirmation Screen */}
          {step === 3 && submittedAppointment && (
            <div style={{ textAlign: 'center', padding: '10px 0' }} className="animate-fade-in">
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(198, 154, 69, 0.15)',
                color: '#173A30',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                border: '2px solid #C69A45'
              }}>
                <CheckCircle size={36} color="#059669" />
              </div>

              <h3 style={{ fontSize: '1.4rem', color: '#0C2B24', marginBottom: '8px' }}>
                Appointment Request Received
              </h3>
              
              <div className="badge-gold" style={{ marginBottom: '18px' }}>
                Booking Ref: {submittedAppointment.id}
              </div>

              <p style={{
                fontSize: '0.92rem',
                color: '#18352D',
                maxWidth: '460px',
                margin: '0 auto 24px auto',
                lineHeight: 1.6
              }}>
                Thank you, <strong>{submittedAppointment.patientName}</strong>. Your consultation request for <strong>{submittedAppointment.treatmentName}</strong> on <strong>{submittedAppointment.preferredDate}</strong> at <strong>{submittedAppointment.preferredSlot}</strong> has been safely recorded.
              </p>

              {/* Summary Card */}
              <div style={{
                background: 'var(--color-cream-warm)',
                border: '1px solid var(--color-border-soft)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 20px',
                textAlign: 'left',
                marginBottom: '24px',
                fontSize: '0.86rem'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <span style={{ color: '#77837D', display: 'block', fontSize: '0.75rem' }}>Preferred Vaidya</span>
                    <strong>{submittedAppointment.preferredDoctor || 'Clinical Team'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#77837D', display: 'block', fontSize: '0.75rem' }}>Contact Number</span>
                    <strong>{submittedAppointment.phone}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#77837D', display: 'block', fontSize: '0.75rem' }}>Current Status</span>
                    <span style={{
                      display: 'inline-block',
                      background: '#FEF3C7',
                      color: '#92400E',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem'
                    }}>
                      Pending Staff Confirmation
                    </span>
                  </div>
                  <div>
                    <span style={{ color: '#77837D', display: 'block', fontSize: '0.75rem' }}>Center Location</span>
                    <strong>Palakkad, Kerala</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href={`https://wa.me/${CENTER_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Namaste Jaya Mahesh Ayurveda team, I have submitted an appointment request (Ref: ${submittedAppointment.id}) for ${submittedAppointment.patientName} on ${submittedAppointment.preferredDate} at ${submittedAppointment.preferredSlot}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    background: '#166534',
                    color: '#FFFFFF',
                    border: 'none'
                  }}
                >
                  <MessageCircle size={16} /> Instant WhatsApp Verification
                </a>

                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="btn-outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Close & Return to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
