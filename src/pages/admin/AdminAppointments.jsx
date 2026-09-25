// Admin Appointments Management with Detailed Drawer, Internal Notes & Status Controls
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  MessageCircle, 
  User, 
  FileText, 
  X, 
  Check, 
  Edit3, 
  Trash2, 
  Plus,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useAppointments } from '../../context/AppointmentContext';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_STAFF } from '../../services/initialData';

export default function AdminAppointments() {
  const { 
    appointments, 
    updateStatus, 
    addInternalNote, 
    assignStaff, 
    rescheduleAppointment,
    removeAppointment,
    getSlotsForDate
  } = useAppointments();
  
  const { can, currentUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApt, setSelectedApt] = useState(null);

  // Modal sub-states
  const [newNote, setNewNote] = useState('');
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [reschedDate, setReschedDate] = useState('');
  const [reschedSlot, setReschedSlot] = useState('');
  const [availableSlotsForResched, setAvailableSlotsForResched] = useState([]);

  // Filtering
  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      apt.patientName?.toLowerCase().includes(query) ||
      apt.phone?.includes(query) ||
      apt.treatmentName?.toLowerCase().includes(query) ||
      apt.id?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return { label: 'Pending Review', bg: '#FEF3C7', color: '#92400E' };
      case 'confirmed':
        return { label: 'Confirmed', bg: '#D1FAE5', color: '#065F46' };
      case 'rescheduled':
        return { label: 'Rescheduled', bg: '#E0E7FF', color: '#3730A3' };
      case 'completed':
        return { label: 'Completed', bg: '#F3F4F6', color: '#1F2937' };
      case 'cancelled':
        return { label: 'Cancelled', bg: '#FEE2E2', color: '#991B1B' };
      case 'declined':
        return { label: 'Declined', bg: '#FEE2E2', color: '#991B1B' };
      default:
        return { label: status, bg: '#F3F4F6', color: '#4B5563' };
    }
  };

  const handleOpenDetail = (apt) => {
    setSelectedApt(apt);
    setIsRescheduling(false);
    setReschedDate(apt.preferredDate);
    setReschedSlot(apt.preferredSlot);
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedApt) return;
    await addInternalNote(selectedApt.id, `${currentUser?.name || 'Staff'}: ${newNote.trim()}`);
    setNewNote('');
    // refresh selected appointment reference
    const updated = appointments.find(a => a.id === selectedApt.id);
    if (updated) setSelectedApt(updated);
  };

  const handleDateChangeForResched = (e) => {
    const d = e.target.value;
    setReschedDate(d);
    if (d) {
      const slots = getSlotsForDate(d);
      setAvailableSlotsForResched(slots);
      const firstAvailable = slots.find(s => s.available);
      setReschedSlot(firstAvailable ? firstAvailable.slot : '');
    }
  };

  const handleSaveReschedule = async () => {
    if (!reschedDate || !reschedSlot) return;
    await rescheduleAppointment(selectedApt.id, reschedDate, reschedSlot);
    setIsRescheduling(false);
    setSelectedApt(prev => ({ ...prev, preferredDate: reschedDate, preferredSlot: reschedSlot, status: 'rescheduled' }));
  };

  return (
    <div>
      {/* Page Title */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#0C2B24', margin: 0 }}>
            Appointments & Enquiries
          </h1>
          <p style={{ color: '#77837D', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
            Manage incoming consultations, review medical histories, and update status.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: 'var(--color-pure-white)',
        padding: '18px 24px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border-soft)',
        boxShadow: 'var(--shadow-subtle)',
        marginBottom: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', minWidth: '280px', flex: 1 }}>
          <Search size={16} color="#77837D" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search by patient name, phone, treatment, or Ref ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '38px', margin: 0 }}
          />
        </div>

        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {['all', 'pending', 'confirmed', 'rescheduled', 'completed', 'declined'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                border: statusFilter === st ? '1px solid #C69A45' : '1px solid #E5E7EB',
                background: statusFilter === st ? '#173A30' : '#F9FAFB',
                color: statusFilter === st ? '#E4C078' : '#4B5563',
                cursor: 'pointer'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments Table */}
      <div style={{
        background: 'var(--color-pure-white)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-soft)',
        boxShadow: 'var(--shadow-subtle)',
        overflow: 'hidden'
      }}>
        {filteredAppointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#77837D' }}>
            <Calendar size={36} color="#CBD5E1" style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ color: '#0C2B24', margin: '0 0 6px 0' }}>No matching appointments found</h4>
            <p style={{ fontSize: '0.88rem', margin: 0 }}>Try clearing your search query or switching filters.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#F8FAF9', borderBottom: '1px solid #E5E7EB', color: '#77837D', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <th style={{ padding: '14px 18px' }}>Ref & Patient</th>
                  <th style={{ padding: '14px 18px' }}>Treatment & Doctor</th>
                  <th style={{ padding: '14px 18px' }}>Date & Slot</th>
                  <th style={{ padding: '14px 18px' }}>Status</th>
                  <th style={{ padding: '14px 18px' }}>Assigned Staff</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((apt) => {
                  const badge = getStatusBadge(apt.status);
                  return (
                    <tr
                      key={apt.id}
                      onClick={() => handleOpenDetail(apt)}
                      style={{
                        borderBottom: '1px solid #F3F4F6',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 600, color: '#0C2B24' }}>{apt.patientName}</div>
                        <div style={{ fontSize: '0.76rem', color: '#77837D' }}>{apt.id} • {apt.phone}</div>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ color: '#18352D' }}>{apt.treatmentName}</div>
                        <div style={{ fontSize: '0.76rem', color: '#C69A45' }}>{apt.preferredDoctor || 'Clinical Team'}</div>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 600, color: '#0C2B24' }}>{apt.preferredDate}</div>
                        <div style={{ fontSize: '0.76rem', color: '#77837D' }}>{apt.preferredSlot}</div>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{
                          background: badge.bg,
                          color: badge.color,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}>
                          {badge.label}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px', color: '#4B5563', fontSize: '0.82rem' }}>
                        {apt.assignedStaffName || <span style={{ color: '#9CA3AF' }}>Unassigned</span>}
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDetail(apt);
                          }}
                          className="btn-outline"
                          style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                        >
                          View / Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Appointment Detail Modal / Drawer */}
      {selectedApt && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(12, 43, 36, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedApt(null);
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '92vh',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-modal)',
              border: '1px solid var(--color-border-soft)',
              overflowY: 'auto'
            }}
            className="animate-fade-in"
          >
            {/* Modal Header */}
            <div style={{
              background: '#0C2B24',
              color: '#FBFAF7',
              padding: '20px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #C69A45'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#E4C078', fontWeight: 700 }}>
                    {selectedApt.id}
                  </span>
                  <span style={{
                    background: getStatusBadge(selectedApt.status).bg,
                    color: getStatusBadge(selectedApt.status).color,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}>
                    {getStatusBadge(selectedApt.status).label}
                  </span>
                </div>
                <h3 style={{ color: '#FBFAF7', fontSize: '1.35rem', margin: '4px 0 0 0' }}>
                  {selectedApt.patientName}
                </h3>
              </div>

              <button
                onClick={() => setSelectedApt(null)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FBFAF7',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px' }}>
              {/* Patient Contact Bar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                padding: '14px',
                background: '#F9FAFB',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '0.85rem'
              }}>
                <div>
                  <span style={{ color: '#77837D', display: 'block', fontSize: '0.75rem' }}>Phone</span>
                  <a href={`tel:${selectedApt.phone}`} style={{ color: '#0C2B24', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={13} color="#C69A45" /> {selectedApt.phone}
                  </a>
                </div>
                <div>
                  <span style={{ color: '#77837D', display: 'block', fontSize: '0.75rem' }}>WhatsApp</span>
                  <a 
                    href={`https://wa.me/${selectedApt.whatsapp ? selectedApt.whatsapp.replace(/[^0-9]/g, '') : selectedApt.phone.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ color: '#166534', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <MessageCircle size={13} /> {selectedApt.whatsapp || selectedApt.phone}
                  </a>
                </div>
                <div>
                  <span style={{ color: '#77837D', display: 'block', fontSize: '0.75rem' }}>Email</span>
                  <a href={`mailto:${selectedApt.email}`} style={{ color: '#0C2B24', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Mail size={13} color="#C69A45" /> {selectedApt.email}
                  </a>
                </div>
              </div>

              {/* Consultation Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label className="form-label">Requested Treatment</label>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0C2B24' }}>
                    {selectedApt.treatmentName}
                  </div>
                </div>

                <div>
                  <label className="form-label">Preferred Vaidya</label>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0C2B24' }}>
                    {selectedApt.preferredDoctor || 'Any Available Physician'}
                  </div>
                </div>
              </div>

              {/* Patient Note */}
              {selectedApt.notes && (
                <div style={{
                  background: 'var(--color-cream-warm)',
                  padding: '14px',
                  borderRadius: '8px',
                  borderLeft: '3px solid #C69A45',
                  marginBottom: '20px',
                  fontSize: '0.88rem'
                }}>
                  <strong>Patient Message / Health Concern:</strong>
                  <p style={{ margin: '4px 0 0 0', color: '#18352D' }}>{selectedApt.notes}</p>
                </div>
              )}

              {/* Status & Staff Assignment Controls */}
              <div style={{
                borderTop: '1px solid #E5E7EB',
                borderBottom: '1px solid #E5E7EB',
                padding: '18px 0',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
                  <div>
                    <label className="form-label">Change Status</label>
                    <select
                      className="form-select"
                      value={selectedApt.status}
                      onChange={(e) => {
                        const newSt = e.target.value;
                        updateStatus(selectedApt.id, newSt);
                        setSelectedApt(prev => ({ ...prev, status: newSt }));
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rescheduled">Rescheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="declined">Declined</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Assigned Staff</label>
                    <select
                      className="form-select"
                      value={selectedApt.assignedStaffId || ''}
                      onChange={(e) => {
                        const sId = e.target.value;
                        const match = INITIAL_STAFF.find(s => s.uid === sId);
                        assignStaff(selectedApt.id, sId, match ? match.name : null);
                        setSelectedApt(prev => ({ ...prev, assignedStaffId: sId, assignedStaffName: match ? match.name : null }));
                      }}
                    >
                      <option value="">Unassigned</option>
                      {INITIAL_STAFF.map(s => (
                        <option key={s.uid} value={s.uid}>{s.name} ({s.role})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reschedule Toggle */}
                {!isRescheduling ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAF9', padding: '10px 14px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.85rem' }}>
                      <strong>Scheduled Slot:</strong> {selectedApt.preferredDate} at {selectedApt.preferredSlot}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsRescheduling(true);
                        const slots = getSlotsForDate(selectedApt.preferredDate);
                        setAvailableSlotsForResched(slots);
                      }}
                      style={{ fontSize: '0.82rem', color: '#B96D4B', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Reschedule Slot
                    </button>
                  </div>
                ) : (
                  <div style={{ background: '#FFFBEB', padding: '14px', borderRadius: '8px', border: '1px solid #FDE68A' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#B45309', marginBottom: '8px' }}>
                      Reschedule Appointment
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <input
                        type="date"
                        className="form-input"
                        value={reschedDate}
                        onChange={handleDateChangeForResched}
                      />
                      <select
                        className="form-select"
                        value={reschedSlot}
                        onChange={(e) => setReschedSlot(e.target.value)}
                      >
                        {availableSlotsForResched.map(s => (
                          <option key={s.slot} value={s.slot} disabled={!s.available}>
                            {s.slot} {!s.available ? `(${s.reason})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <button
                        type="button"
                        onClick={handleSaveReschedule}
                        className="btn-gold"
                        style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                      >
                        Confirm Reschedule
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsRescheduling(false)}
                        className="btn-outline"
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Internal Staff Notes */}
              <div>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={15} color="#C69A45" /> Internal Staff Notes
                </label>

                {selectedApt.internalNotes ? (
                  <div style={{
                    background: '#F3F4F6',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    color: '#374151',
                    whiteSpace: 'pre-wrap',
                    marginBottom: '12px',
                    maxHeight: '120px',
                    overflowY: 'auto'
                  }}>
                    {selectedApt.internalNotes}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: '#9CA3AF', marginBottom: '10px' }}>
                    No internal staff notes recorded yet.
                  </p>
                )}

                <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Add an internal note (e.g. called patient, requested lab reports)..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    style={{ margin: 0, fontSize: '0.85rem' }}
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem', flexShrink: 0 }}>
                    Add Note
                  </button>
                </form>
              </div>

              {/* Footer Delete (Admin Only) */}
              {can('delete_records') && (
                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={async () => {
                      if (window.confirm(`Are you sure you want to permanently delete appointment ${selectedApt.id}?`)) {
                        await removeAppointment(selectedApt.id);
                        setSelectedApt(null);
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#EF4444',
                      fontSize: '0.82rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={14} /> Delete Record (Admin)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
