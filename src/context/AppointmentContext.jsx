// Appointment Context: Manages public booking flow, real-time availability, and staff operations
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchAppointments,
  createAppointment as apiCreateAppointment,
  updateAppointment as apiUpdateAppointment,
  deleteAppointment as apiDeleteAppointment,
  fetchCalendarConfig,
  saveCalendarConfig as apiSaveCalendarConfig
} from '../services/storageService';

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const [calendarConfig, setCalendarConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  // Global Modal States
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPreselect, setBookingPreselect] = useState({ treatmentId: '', doctorId: '' });
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  // Load initial data
  const refreshData = async () => {
    setLoading(true);
    try {
      const [apts, cal] = await Promise.all([
        fetchAppointments(),
        fetchCalendarConfig()
      ]);
      setAppointments(apts);
      setCalendarConfig(cal);
    } catch (err) {
      console.error('Failed to load appointments/calendar data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const openBookingModal = (preselect = {}) => {
    setBookingPreselect({
      treatmentId: preselect.treatmentId || '',
      doctorId: preselect.doctorId || ''
    });
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingPreselect({ treatmentId: '', doctorId: '' });
  };

  const openTreatmentModal = (treatment) => {
    setSelectedTreatment(treatment);
  };

  const closeTreatmentModal = () => {
    setSelectedTreatment(null);
  };

  // Check slot availability for a specific YYYY-MM-DD date
  const getSlotsForDate = (dateStr) => {
    if (!calendarConfig || !dateStr) return [];

    const dateObj = new Date(dateStr + 'T00:00:00');
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = dayNames[dateObj.getDay()];

    // Check if working day
    const isWorkingDay = calendarConfig.workingDays.includes(dayOfWeek);
    if (!isWorkingDay) {
      return calendarConfig.slots.map(slot => ({
        slot,
        available: false,
        reason: 'Closed on ' + dayOfWeek + 's'
      }));
    }

    // Check if full date is blocked
    const isDateBlocked = calendarConfig.blockedDates?.includes(dateStr);
    if (isDateBlocked) {
      return calendarConfig.slots.map(slot => ({
        slot,
        available: false,
        reason: 'Center Holiday / Maintenance'
      }));
    }

    // Check individual blocked slots
    const dayBlockedSlots = calendarConfig.blockedSlots?.[dateStr] || [];

    // Check already booked slots for this date (excluding cancelled or declined)
    const bookedForDate = appointments.filter(a => 
      a.preferredDate === dateStr && 
      ['pending', 'confirmed'].includes(a.status)
    );

    return calendarConfig.slots.map(slot => {
      if (dayBlockedSlots.includes(slot)) {
        return { slot, available: false, reason: 'Reserved by Center' };
      }

      const bookingsInSlot = bookedForDate.filter(a => a.preferredSlot === slot).length;
      if (bookingsInSlot >= (calendarConfig.maxBookingsPerSlot || 1)) {
        return { slot, available: false, reason: 'Already Booked' };
      }

      return { slot, available: true };
    });
  };

  // Submit new appointment enquiry
  const submitEnquiry = async (formData) => {
    try {
      const created = await apiCreateAppointment(formData);
      setAppointments(prev => [created, ...prev]);
      return { success: true, appointment: created };
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      return { success: false, error: err.message };
    }
  };

  // Staff action: update status (confirmed, rescheduled, cancelled, completed, declined)
  const updateStatus = async (appointmentId, newStatus) => {
    try {
      const updated = await apiUpdateAppointment(appointmentId, { status: newStatus });
      if (updated) {
        setAppointments(prev => prev.map(a => a.id === appointmentId ? updated : a));
        return { success: true, appointment: updated };
      }
    } catch (err) {
      console.error('Error updating status:', err);
      return { success: false, error: err.message };
    }
  };

  // Staff action: add internal note
  const addInternalNote = async (appointmentId, noteText) => {
    try {
      const current = appointments.find(a => a.id === appointmentId);
      const existing = current?.internalNotes || '';
      const timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
      const newInternalNotes = existing 
        ? `${existing}\n[${timestamp}] ${noteText}` 
        : `[${timestamp}] ${noteText}`;

      const updated = await apiUpdateAppointment(appointmentId, { internalNotes: newInternalNotes });
      if (updated) {
        setAppointments(prev => prev.map(a => a.id === appointmentId ? updated : a));
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Staff action: assign staff member
  const assignStaff = async (appointmentId, staffId, staffName) => {
    try {
      const updated = await apiUpdateAppointment(appointmentId, { 
        assignedStaffId: staffId,
        assignedStaffName: staffName 
      });
      if (updated) {
        setAppointments(prev => prev.map(a => a.id === appointmentId ? updated : a));
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Staff action: reschedule appointment
  const rescheduleAppointment = async (appointmentId, newDate, newSlot) => {
    try {
      const updated = await apiUpdateAppointment(appointmentId, {
        preferredDate: newDate,
        preferredSlot: newSlot,
        status: 'rescheduled'
      });
      if (updated) {
        setAppointments(prev => prev.map(a => a.id === appointmentId ? updated : a));
        return { success: true, appointment: updated };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Staff action: toggle slot blocking for a date
  const toggleBlockSlot = async (dateStr, slot) => {
    if (!calendarConfig) return;
    const currentBlocked = calendarConfig.blockedSlots || {};
    const slotsForDay = currentBlocked[dateStr] || [];

    let updatedSlots;
    if (slotsForDay.includes(slot)) {
      updatedSlots = slotsForDay.filter(s => s !== slot);
    } else {
      updatedSlots = [...slotsForDay, slot];
    }

    const newBlockedMap = {
      ...currentBlocked,
      [dateStr]: updatedSlots
    };

    const newConfig = {
      ...calendarConfig,
      blockedSlots: newBlockedMap
    };

    await apiSaveCalendarConfig(newConfig);
    setCalendarConfig(newConfig);
  };

  // Staff action: toggle full date blocking
  const toggleBlockDate = async (dateStr) => {
    if (!calendarConfig) return;
    const currentDates = calendarConfig.blockedDates || [];
    let updatedDates;
    if (currentDates.includes(dateStr)) {
      updatedDates = currentDates.filter(d => d !== dateStr);
    } else {
      updatedDates = [...currentDates, dateStr];
    }

    const newConfig = {
      ...calendarConfig,
      blockedDates: updatedDates
    };

    await apiSaveCalendarConfig(newConfig);
    setCalendarConfig(newConfig);
  };

  // Staff action: delete appointment
  const removeAppointment = async (id) => {
    await apiDeleteAppointment(id);
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AppointmentContext.Provider value={{
      appointments,
      calendarConfig,
      loading,
      refreshData,
      getSlotsForDate,
      submitEnquiry,
      updateStatus,
      addInternalNote,
      assignStaff,
      rescheduleAppointment,
      toggleBlockSlot,
      toggleBlockDate,
      removeAppointment,
      // Modals
      isBookingModalOpen,
      bookingPreselect,
      openBookingModal,
      closeBookingModal,
      selectedTreatment,
      openTreatmentModal,
      closeTreatmentModal
    }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (!context) {
    return {
      appointments: [],
      calendarConfig: null,
      loading: false,
      selectedTreatment: null,
      isBookingModalOpen: false,
      bookingPreselect: {},
      openBookingModal: () => {},
      closeBookingModal: () => {},
      openTreatmentModal: () => {},
      closeTreatmentModal: () => {},
      getSlotsForDate: () => [],
      submitEnquiry: () => ({ success: false }),
      updateStatus: () => {},
      addInternalNote: () => {},
      assignStaff: () => {},
      rescheduleAppointment: () => {},
      toggleBlockSlot: () => {},
      toggleBlockDate: () => {},
      removeAppointment: () => {}
    };
  }
  return context;
}
