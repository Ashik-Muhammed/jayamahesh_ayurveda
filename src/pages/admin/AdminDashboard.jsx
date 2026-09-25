// Admin Dashboard Overview with Key Metrics & Pending Action Queue
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Users, 
  ArrowRight, 
  Phone, 
  MessageCircle,
  Eye,
  Check,
  X
} from 'lucide-react';
import { useAppointments } from '../../context/AppointmentContext';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { appointments, updateStatus, calendarConfig } = useAppointments();
  const { currentUser } = useAuth();

  const todayStr = new Date().toISOString().split('T')[0];

  // Metrics calculations
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const todayCount = appointments.filter(a => a.preferredDate === todayStr && ['pending', 'confirmed'].includes(a.status)).length;
  const cancelledCount = appointments.filter(a => ['cancelled', 'declined'].includes(a.status)).length;

  const totalSlotsToday = calendarConfig?.slots?.length || 8;
  const bookedSlotsToday = appointments.filter(a => a.preferredDate === todayStr && ['pending', 'confirmed'].includes(a.status)).length;
  const availableSlotsToday = Math.max(0, totalSlotsToday - bookedSlotsToday);

  // Urgent pending enquiries
  const pendingList = appointments.filter(a => a.status === 'pending').slice(0, 5);

  return (
    <div>
      {/* Welcome Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#0C2B24', margin: 0 }}>
            Center Overview
          </h1>
          <p style={{ color: '#77837D', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
            Welcome back, <strong>{currentUser?.name}</strong>. Here is the clinical activity summary for Jayamahesh Ayurveda.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/admin/appointments" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
            <Calendar size={15} /> Manage All Appointments
          </Link>
          <Link to="/admin/calendar" className="btn-outline" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
            Manage Slots
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '20px',
        marginBottom: '36px'
      }}>
        {/* Pending Enquiries */}
        <div style={{
          background: '#FFFBEB',
          border: '1px solid #FDE68A',
          borderRadius: 'var(--radius-md)',
          padding: '22px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Pending Enquiries
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FDE68A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={16} color="#B45309" />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#92400E', marginTop: '10px' }}>
            {pendingCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#B45309', marginTop: '4px' }}>
            Requires desk review
          </div>
        </div>

        {/* Today's Appointments */}
        <div style={{
          background: '#ECFDF5',
          border: '1px solid #A7F3D0',
          borderRadius: 'var(--radius-md)',
          padding: '22px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Today's Schedule
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={16} color="#047857" />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#065F46', marginTop: '10px' }}>
            {todayCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#047857', marginTop: '4px' }}>
            Consultations on {todayStr}
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div style={{
          background: 'var(--color-pure-white)',
          border: '1px solid var(--color-border-soft)',
          borderRadius: 'var(--radius-md)',
          padding: '22px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0C2B24', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Confirmed Active
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(23, 58, 48, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={16} color="#173A30" />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#0C2B24', marginTop: '10px' }}>
            {confirmedCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#77837D', marginTop: '4px' }}>
            Ready for consultation
          </div>
        </div>

        {/* Available Slots Today */}
        <div style={{
          background: 'var(--color-pure-white)',
          border: '1px solid var(--color-border-soft)',
          borderRadius: 'var(--radius-md)',
          padding: '22px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0C2B24', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Slots Free Today
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(198, 154, 69, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={16} color="#C69A45" />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#C69A45', marginTop: '10px' }}>
            {availableSlotsToday}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#77837D', marginTop: '4px' }}>
            Out of {totalSlotsToday} center slots
          </div>
        </div>
      </div>

      {/* Pending Enquiries Action Queue */}
      <div style={{
        background: 'var(--color-pure-white)',
        border: '1px solid var(--color-border-soft)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#0C2B24', margin: 0 }}>
              Urgent Enquiries Pending Confirmation
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#77837D', margin: '2px 0 0 0' }}>
              Incoming website requests that need phone / WhatsApp verification
            </p>
          </div>
          <Link
            to="/admin/appointments"
            style={{
              fontSize: '0.85rem',
              color: '#0C2B24',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>View All ({appointments.length})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {pendingList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px', color: '#77837D', fontSize: '0.9rem' }}>
            <CheckCircle size={32} color="#059669" style={{ margin: '0 auto 10px auto' }} />
            <div>All appointment enquiries have been handled!</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E5E7EB', color: '#77837D', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '12px 14px' }}>Ref & Patient</th>
                  <th style={{ padding: '12px 14px' }}>Treatment</th>
                  <th style={{ padding: '12px 14px' }}>Requested Date & Slot</th>
                  <th style={{ padding: '12px 14px' }}>Contact</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Quick Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingList.map((apt) => (
                  <tr key={apt.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontWeight: 600, color: '#0C2B24' }}>{apt.patientName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#77837D' }}>{apt.id}</div>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ color: '#18352D' }}>{apt.treatmentName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#C69A45' }}>Dr: {apt.preferredDoctor || 'Any'}</div>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontWeight: 600, color: '#0C2B24' }}>{apt.preferredDate}</div>
                      <div style={{ fontSize: '0.75rem', color: '#77837D' }}>{apt.preferredSlot}</div>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <a
                          href={`tel:${apt.phone}`}
                          style={{
                            padding: '4px 8px',
                            background: '#F3F4F6',
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#18352D',
                            fontSize: '0.78rem'
                          }}
                        >
                          <Phone size={12} /> Call
                        </a>
                        <a
                          href={`https://wa.me/${apt.whatsapp ? apt.whatsapp.replace(/[^0-9]/g, '') : apt.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Namaste ${apt.patientName}, this is Jayamahesh Ayurveda regarding your appointment request for ${apt.treatmentName} on ${apt.preferredDate} at ${apt.preferredSlot}.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            padding: '4px 8px',
                            background: '#ECFDF5',
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#065F46',
                            fontSize: '0.78rem'
                          }}
                        >
                          <MessageCircle size={12} /> WhatsApp
                        </a>
                      </div>
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => updateStatus(apt.id, 'confirmed')}
                          style={{
                            background: '#059669',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Check size={13} /> Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(apt.id, 'declined')}
                          style={{
                            background: '#EF4444',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            cursor: 'pointer'
                          }}
                        >
                          <X size={13} /> Decline
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
