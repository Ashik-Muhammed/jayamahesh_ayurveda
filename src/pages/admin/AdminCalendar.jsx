// Admin Calendar & Slot Management: Block/Unblock Slots, View Day Breakdown, Manage Availability
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Lock, 
  Unlock, 
  CheckCircle, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert,
  Settings
} from 'lucide-react';
import { useAppointments } from '../../context/AppointmentContext';
import { useAuth } from '../../context/AuthContext';

export default function AdminCalendar() {
  const { 
    calendarConfig, 
    appointments, 
    toggleBlockSlot, 
    toggleBlockDate 
  } = useAppointments();

  const { can } = useAuth();

  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  if (!calendarConfig) return null;

  const dateObj = new Date(selectedDate + 'T00:00:00');
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = dayNames[dateObj.getDay()];

  const isFullDateBlocked = calendarConfig.blockedDates?.includes(selectedDate);
  const dayBlockedSlots = calendarConfig.blockedSlots?.[selectedDate] || [];
  const isWorkingDay = calendarConfig.workingDays.includes(dayName);

  // Appointments on this date
  const appointmentsOnDate = appointments.filter(a => 
    a.preferredDate === selectedDate && 
    ['pending', 'confirmed'].includes(a.status)
  );

  const handlePrevDay = () => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2rem', color: '#0C2B24', margin: 0 }}>
          Calendar & Slot Availability
        </h1>
        <p style={{ color: '#77837D', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
          Open or block appointment slots, set center holidays, and view daily consultations.
        </p>
      </div>

      {/* Date Navigation & Summary Card */}
      <div style={{
        background: 'var(--color-pure-white)',
        padding: '20px 24px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border-soft)',
        boxShadow: 'var(--shadow-subtle)',
        marginBottom: '28px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={handlePrevDay}
            className="btn-outline"
            style={{ padding: '8px 12px' }}
          >
            <ChevronLeft size={16} /> Previous Day
          </button>

          <div>
            <input
              type="date"
              className="form-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ fontWeight: 600, color: '#0C2B24', padding: '8px 14px', margin: 0 }}
            />
            <div style={{ fontSize: '0.8rem', color: '#77837D', marginTop: '2px', textAlign: 'center' }}>
              {dayName} {isFullDateBlocked ? '(Center Holiday / Blocked)' : ''}
            </div>
          </div>

          <button
            onClick={handleNextDay}
            className="btn-outline"
            style={{ padding: '8px 12px' }}
          >
            Next Day <ChevronRight size={16} />
          </button>
        </div>

        {/* Full Day Block Button */}
        <div>
          <button
            onClick={() => toggleBlockDate(selectedDate)}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              border: isFullDateBlocked ? '1.5px solid #059669' : '1.5px solid #EF4444',
              background: isFullDateBlocked ? '#ECFDF5' : '#FEF2F2',
              color: isFullDateBlocked ? '#065F46' : '#991B1B'
            }}
          >
            {isFullDateBlocked ? (
              <>
                <Unlock size={14} /> Reopen Date for Appointments
              </>
            ) : (
              <>
                <Lock size={14} /> Block Entire Date (Holiday)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Warning banner if non-working day or holiday */}
      {(!isWorkingDay || isFullDateBlocked) && (
        <div style={{
          background: '#FEF3C7',
          border: '1px solid #FCD34D',
          color: '#92400E',
          padding: '14px 18px',
          borderRadius: '8px',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '24px'
        }}>
          <ShieldAlert size={18} />
          <span>
            <strong>Note:</strong> {!isWorkingDay ? `${dayName} is set as a non-working day in center settings.` : 'This entire date is marked as blocked. No public patient can book slots.'}
          </span>
        </div>
      )}

      {/* Slots Grid */}
      <div style={{
        background: 'var(--color-pure-white)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-soft)',
        padding: '28px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#0C2B24', margin: 0 }}>
              Slot Availability for {selectedDate} ({dayName})
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#77837D', margin: '2px 0 0 0' }}>
              Standard operating hours: {calendarConfig.openingTime} – {calendarConfig.closingTime} (Lunch break: {calendarConfig.lunchBreakStart} – {calendarConfig.lunchBreakEnd})
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {calendarConfig.slots.map((slot) => {
            const isBlocked = dayBlockedSlots.includes(slot) || isFullDateBlocked;
            const booking = appointmentsOnDate.find(a => a.preferredSlot === slot);

            let statusLabel = 'Available';
            let statusColor = '#059669';
            let bgColor = '#F0FDF4';
            let borderColor = '#BBF7D0';

            if (isBlocked) {
              statusLabel = 'Blocked by Center';
              statusColor = '#991B1B';
              bgColor = '#FEF2F2';
              borderColor = '#FECACA';
            } else if (booking) {
              statusLabel = `Booked (${booking.status})`;
              statusColor = '#1E40AF';
              bgColor = '#EFF6FF';
              borderColor = '#BFDBFE';
            }

            return (
              <div
                key={slot}
                style={{
                  background: bgColor,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#0C2B24' }}>
                      {slot}
                    </span>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: statusColor, textTransform: 'uppercase' }}>
                      {statusLabel}
                    </span>
                  </div>

                  {booking ? (
                    <div style={{ background: '#FFFFFF', padding: '8px 10px', borderRadius: '6px', fontSize: '0.82rem', marginTop: '6px', border: '1px solid #DBEAFE' }}>
                      <div style={{ fontWeight: 600, color: '#0C2B24' }}>{booking.patientName}</div>
                      <div style={{ fontSize: '0.74rem', color: '#6B7280' }}>{booking.treatmentName}</div>
                      <div style={{ fontSize: '0.72rem', color: '#C69A45' }}>{booking.phone}</div>
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.82rem', color: '#6B7280', marginTop: '6px' }}>
                      {isBlocked ? 'Slot unavailable to public patients.' : 'Open for patient booking.'}
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => toggleBlockSlot(selectedDate, slot)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: dayBlockedSlots.includes(slot) ? '#059669' : '#DC2626',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {dayBlockedSlots.includes(slot) ? (
                      <>
                        <Unlock size={13} /> Unblock Slot
                      </>
                    ) : (
                      <>
                        <Lock size={13} /> Block Slot
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
