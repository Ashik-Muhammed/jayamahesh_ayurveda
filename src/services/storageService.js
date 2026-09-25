// Storage Service: Bridges Firestore & Local Persistence seamlessly
import {
  isFirebaseConfigured,
  db,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from './firebase';
import {
  INITIAL_APPOINTMENTS,
  INITIAL_CALENDAR_CONFIG,
  INITIAL_STAFF,
  CENTER_INFO,
  TREATMENTS,
  PROGRAMS,
  DOCTORS,
  GALLERY_ITEMS,
  TESTIMONIALS
} from './initialData';

const KEYS = {
  APPOINTMENTS: 'jayamahesh_appointments',
  CALENDAR: 'jayamahesh_calendar_config',
  STAFF: 'jayamahesh_staff_list',
  CENTER: 'jayamahesh_center_info'
};

// --- Appointments ---

export async function fetchAppointments() {
  if (isFirebaseConfigured()) {
    try {
      const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (err) {
      console.warn('Firestore fetch appointments failed, falling back to local:', err);
    }
  }

  // Local storage fallback
  const local = localStorage.getItem(KEYS.APPOINTMENTS);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      // ignore
    }
  }
  // Initialize with seed data
  localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
  return INITIAL_APPOINTMENTS;
}

export async function createAppointment(appointmentData) {
  const newId = `APT-${new Date().getFullYear()}-${String(Math.floor(100 + Math.random() * 900))}`;
  const record = {
    id: newId,
    ...appointmentData,
    status: 'pending',
    assignedStaffId: null,
    assignedStaffName: null,
    internalNotes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (isFirebaseConfigured()) {
    try {
      await setDoc(doc(db, 'appointments', newId), record);
    } catch (err) {
      console.warn('Firestore create appointment failed, saving locally:', err);
    }
  }

  // Save to local storage as well
  const current = await fetchAppointments();
  const updated = [record, ...current];
  localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(updated));
  return record;
}

export async function updateAppointment(id, updates) {
  const current = await fetchAppointments();
  const index = current.findIndex(a => a.id === id);
  if (index === -1) return null;

  const updatedRecord = {
    ...current[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  current[index] = updatedRecord;
  localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(current));

  if (isFirebaseConfigured()) {
    try {
      const ref = doc(db, 'appointments', id);
      await updateDoc(ref, updates);
    } catch (err) {
      console.warn('Firestore update appointment failed:', err);
    }
  }

  return updatedRecord;
}

export async function deleteAppointment(id) {
  const current = await fetchAppointments();
  const filtered = current.filter(a => a.id !== id);
  localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(filtered));

  if (isFirebaseConfigured()) {
    try {
      await deleteDoc(doc(db, 'appointments', id));
    } catch (err) {
      console.warn('Firestore delete appointment failed:', err);
    }
  }
  return true;
}

// --- Calendar & Slots ---

export async function fetchCalendarConfig() {
  const local = localStorage.getItem(KEYS.CALENDAR);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      // ignore
    }
  }
  localStorage.setItem(KEYS.CALENDAR, JSON.stringify(INITIAL_CALENDAR_CONFIG));
  return INITIAL_CALENDAR_CONFIG;
}

export async function saveCalendarConfig(newConfig) {
  localStorage.setItem(KEYS.CALENDAR, JSON.stringify(newConfig));
  if (isFirebaseConfigured()) {
    try {
      await setDoc(doc(db, 'centerSettings', 'calendarConfig'), newConfig);
    } catch (err) {
      console.warn('Firestore save calendar config failed:', err);
    }
  }
  return newConfig;
}

// --- Staff Records ---

export async function fetchStaffList() {
  const local = localStorage.getItem(KEYS.STAFF);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      // ignore
    }
  }
  localStorage.setItem(KEYS.STAFF, JSON.stringify(INITIAL_STAFF));
  return INITIAL_STAFF;
}

export async function saveStaffList(staffList) {
  localStorage.setItem(KEYS.STAFF, JSON.stringify(staffList));
  return staffList;
}

// --- Center Settings ---

export async function fetchCenterInfo() {
  const local = localStorage.getItem(KEYS.CENTER);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      // ignore
    }
  }
  localStorage.setItem(KEYS.CENTER, JSON.stringify(CENTER_INFO));
  return CENTER_INFO;
}

export async function saveCenterInfo(info) {
  localStorage.setItem(KEYS.CENTER, JSON.stringify(info));
  if (isFirebaseConfigured()) {
    try {
      await setDoc(doc(db, 'centerSettings', 'general'), info);
    } catch (err) {
      console.warn('Firestore save center info failed:', err);
    }
  }
  return info;
}

// Helper to reset to initial mock demo data
export function resetToDemoData() {
  localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
  localStorage.setItem(KEYS.CALENDAR, JSON.stringify(INITIAL_CALENDAR_CONFIG));
  localStorage.setItem(KEYS.STAFF, JSON.stringify(INITIAL_STAFF));
  localStorage.setItem(KEYS.CENTER, JSON.stringify(CENTER_INFO));
}
