// Admin Settings & Firebase Connection Assistant
import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Database, 
  Save, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  Building2,
  Clock,
  Phone,
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { 
  getFirebaseConfig, 
  saveFirebaseConfig, 
  isFirebaseConfigured 
} from '../../services/firebase';
import { 
  fetchCenterInfo, 
  saveCenterInfo, 
  resetToDemoData 
} from '../../services/storageService';
import { useAppointments } from '../../context/AppointmentContext';

export default function AdminSettings() {
  const { refreshData } = useAppointments();

  const [centerInfo, setCenterInfo] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    openingHoursText: '',
    bookingNotice: ''
  });

  const [firebaseKeys, setFirebaseKeys] = useState({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    fetchCenterInfo().then(setCenterInfo);
    const existingFb = getFirebaseConfig();
    if (existingFb) {
      setFirebaseKeys(existingFb);
    }
  }, []);

  const handleSaveCenter = async (e) => {
    e.preventDefault();
    await saveCenterInfo(centerInfo);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSaveFirebase = (e) => {
    e.preventDefault();
    if (!firebaseKeys.apiKey || !firebaseKeys.projectId) {
      alert('Please provide at least the Firebase API Key and Project ID.');
      return;
    }
    saveFirebaseConfig(firebaseKeys);
    alert('Firebase configuration saved! The application will now reload to initialize Firebase.');
    window.location.reload();
  };

  const handleClearFirebase = () => {
    if (window.confirm('Clear custom Firebase configuration and return to Local Storage Demo Mode?')) {
      saveFirebaseConfig(null);
      window.location.reload();
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset all appointments, calendar blocks, and staff to default demo seed data?')) {
      resetToDemoData();
      refreshData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  const isConnected = isFirebaseConfigured();

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2rem', color: '#0C2B24', margin: 0 }}>
          Center Settings & Firebase Integration
        </h1>
        <p style={{ color: '#77837D', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
          Configure official center communications, operational hours, and connect your live Firebase project.
        </p>
      </div>

      {savedSuccess && (
        <div style={{
          background: '#ECFDF5',
          border: '1px solid #A7F3D0',
          color: '#065F46',
          padding: '12px 18px',
          borderRadius: '8px',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px'
        }}>
          <CheckCircle size={18} />
          <span>Center contact information successfully saved!</span>
        </div>
      )}

      {resetSuccess && (
        <div style={{
          background: '#ECFDF5',
          border: '1px solid #A7F3D0',
          color: '#065F46',
          padding: '12px 18px',
          borderRadius: '8px',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px'
        }}>
          <CheckCircle size={18} />
          <span>Default demo appointments and calendar data successfully re-seeded.</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
        {/* Left: Center Contact Information */}
        <div style={{
          background: 'var(--color-pure-white)',
          padding: '28px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border-soft)',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <Building2 size={20} color="#C69A45" />
            <h3 style={{ fontSize: '1.25rem', color: '#0C2B24', margin: 0 }}>
              Center Information
            </h3>
          </div>

          <form onSubmit={handleSaveCenter}>
            <div className="form-group">
              <label className="form-label">Center Name</label>
              <input
                type="text"
                className="form-input"
                value={centerInfo.name}
                onChange={(e) => setCenterInfo({ ...centerInfo, name: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-input"
                  value={centerInfo.phone}
                  onChange={(e) => setCenterInfo({ ...centerInfo, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">WhatsApp</label>
                <input
                  type="text"
                  className="form-input"
                  value={centerInfo.whatsapp}
                  onChange={(e) => setCenterInfo({ ...centerInfo, whatsapp: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Official Email</label>
              <input
                type="email"
                className="form-input"
                value={centerInfo.email}
                onChange={(e) => setCenterInfo({ ...centerInfo, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Physical Address</label>
              <textarea
                className="form-textarea"
                rows={2}
                value={centerInfo.address}
                onChange={(e) => setCenterInfo({ ...centerInfo, address: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Opening Hours Text</label>
              <input
                type="text"
                className="form-input"
                value={centerInfo.openingHoursText}
                onChange={(e) => setCenterInfo({ ...centerInfo, openingHoursText: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-gold"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '8px' }}
            >
              <Save size={16} /> Save Center Information
            </button>
          </form>
        </div>

        {/* Right: Firebase Configuration Assistant */}
        <div style={{
          background: 'var(--color-pure-white)',
          padding: '28px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border-soft)',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Database size={20} color="#C69A45" />
              <h3 style={{ fontSize: '1.25rem', color: '#0C2B24', margin: 0 }}>
                Firebase Cloud Sync
              </h3>
            </div>

            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 700,
              background: isConnected ? '#ECFDF5' : '#FEF3C7',
              color: isConnected ? '#065F46' : '#92400E'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isConnected ? '#10B981' : '#F59E0B' }} />
              {isConnected ? 'Connected' : 'Local Fallback'}
            </span>
          </div>

          <p style={{ fontSize: '0.86rem', color: '#77837D', lineHeight: 1.6, marginBottom: '20px' }}>
            The application currently operates with a persistent local storage bridge. To synchronize appointments directly with Google Cloud Firestore and Firebase Authentication, enter your project web app keys below or via <code>.env</code>.
          </p>

          <form onSubmit={handleSaveFirebase}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem' }}>apiKey</label>
              <input
                type="text"
                className="form-input"
                placeholder="AIzaSy..."
                value={firebaseKeys.apiKey || ''}
                onChange={(e) => setFirebaseKeys({ ...firebaseKeys, apiKey: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.8rem' }}>authDomain</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="your-app.firebaseapp.com"
                  value={firebaseKeys.authDomain || ''}
                  onChange={(e) => setFirebaseKeys({ ...firebaseKeys, authDomain: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.8rem' }}>projectId</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="your-project-id"
                  value={firebaseKeys.projectId || ''}
                  onChange={(e) => setFirebaseKeys({ ...firebaseKeys, projectId: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.8rem' }}>storageBucket</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="your-app.appspot.com"
                  value={firebaseKeys.storageBucket || ''}
                  onChange={(e) => setFirebaseKeys({ ...firebaseKeys, storageBucket: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.8rem' }}>appId</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="1:12345:web:abcdef"
                  value={firebaseKeys.appId || ''}
                  onChange={(e) => setFirebaseKeys({ ...firebaseKeys, appId: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
              <button
                type="submit"
                className="btn-primary"
                style={{ flex: 2, justifyContent: 'center', padding: '11px', fontSize: '0.88rem' }}
              >
                Connect Firebase
              </button>
              {firebaseKeys.apiKey && (
                <button
                  type="button"
                  onClick={handleClearFirebase}
                  className="btn-outline"
                  style={{ flex: 1, justifyContent: 'center', padding: '11px', fontSize: '0.82rem', color: '#EF4444', borderColor: '#EF4444' }}
                >
                  Disconnect
                </button>
              )}
            </div>
          </form>

          {/* Reset Demo Data Button */}
          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid #F3F4F6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0C2B24' }}>Reset Evaluation Data</div>
              <div style={{ fontSize: '0.76rem', color: '#77837D' }}>Restores appointments and slots to default test set</div>
            </div>

            <button
              onClick={handleResetData}
              className="btn-outline"
              style={{ padding: '8px 14px', fontSize: '0.8rem' }}
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
