// Admin Staff Management with Role Permission Matrix
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Check, 
  X, 
  Mail, 
  Calendar, 
  BadgeCheck 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchStaffList, saveStaffList } from '../../services/storageService';

export default function AdminStaff() {
  const { currentUser, can } = useAuth();
  const [staffList, setStaffList] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    role: 'staff',
    department: 'Ayurveda Therapy & Nursing'
  });

  useEffect(() => {
    fetchStaffList().then(setStaffList);
  }, []);

  const handleAddStaff = async (e) => {
    e.preventDefault();
    if (!newStaff.name.trim() || !newStaff.email.trim()) return;

    const record = {
      uid: `staff-${Date.now()}`,
      name: newStaff.name.trim(),
      email: newStaff.email.trim().toLowerCase(),
      role: newStaff.role,
      active: true,
      department: newStaff.department,
      createdAt: new Date().toISOString()
    };

    const updated = [...staffList, record];
    await saveStaffList(updated);
    setStaffList(updated);
    setNewStaff({ name: '', email: '', role: 'staff', department: 'Ayurveda Therapy & Nursing' });
    setShowAddForm(false);
  };

  const permissions = [
    { feature: 'View patient appointments', admin: true, manager: true, staff: true },
    { feature: 'Confirm & update appointment status', admin: true, manager: true, staff: true },
    { feature: 'Manage calendar & block slots', admin: true, manager: true, staff: false },
    { feature: 'Manage staff accounts & roles', admin: true, manager: false, staff: false },
    { feature: 'Manage treatment content & center info', admin: true, manager: true, staff: false },
    { feature: 'Permanently delete appointment records', admin: true, manager: false, staff: false }
  ];

  return (
    <div>
      {/* Title */}
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
            Staff & Practitioner Directory
          </h1>
          <p style={{ color: '#77837D', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
            Registered administrative and clinical personnel with role permissions.
          </p>
        </div>

        {can('manage_staff') && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-gold"
            style={{ padding: '10px 20px', fontSize: '0.88rem' }}
          >
            <UserPlus size={16} /> Add Staff Account
          </button>
        )}
      </div>

      {/* Add Staff Drawer / Form */}
      {showAddForm && (
        <div style={{
          background: 'var(--color-pure-white)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-soft)',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '28px'
        }} className="animate-fade-in">
          <h3 style={{ fontSize: '1.2rem', color: '#0C2B24', marginBottom: '16px' }}>
            Register New Staff Member
          </h3>
          <form onSubmit={handleAddStaff}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Dr. K. Rajeshwar"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Work Email *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="doctor@jayamahesh.com"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Assigned Role</label>
                <select
                  className="form-select"
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                >
                  <option value="staff">Staff (Front desk / Therapist)</option>
                  <option value="manager">Manager (Operations / Scheduling)</option>
                  <option value="admin">Admin (Clinical Director / Full Access)</option>
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Department / Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Senior Ayurvedic Physician"
                  value={newStaff.department}
                  onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" className="btn-gold" style={{ padding: '10px 22px', fontSize: '0.88rem' }}>
                Save Account
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-outline"
                style={{ padding: '10px 18px', fontSize: '0.88rem' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Staff Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {staffList.map((member) => (
          <div
            key={member.uid}
            style={{
              background: 'var(--color-pure-white)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-soft)',
              padding: '22px',
              boxShadow: 'var(--shadow-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#173A30',
                  color: '#E4C078',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1.1rem'
                }}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>

                <span style={{
                  background: member.role === 'admin' ? '#FEF3C7' : member.role === 'manager' ? '#E0E7FF' : '#F3F4F6',
                  color: member.role === 'admin' ? '#92400E' : member.role === 'manager' ? '#3730A3' : '#374151',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}>
                  {member.role}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', color: '#0C2B24', margin: '0 0 4px 0' }}>
                {member.name}
              </h3>
              <div style={{ fontSize: '0.82rem', color: '#77837D', marginBottom: '12px' }}>
                {member.department}
              </div>

              <div style={{ fontSize: '0.82rem', color: '#18352D', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={13} color="#C69A45" /> {member.email}
              </div>
            </div>

            <div style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #F3F4F6',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.75rem',
              color: '#9CA3AF'
            }}>
              <span>Status: <strong style={{ color: '#059669' }}>Active</strong></span>
              <span>UID: {member.uid.slice(0, 10)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Matrix Table from Section 8 */}
      <div style={{
        background: 'var(--color-pure-white)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-soft)',
        padding: '28px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#0C2B24', margin: 0 }}>
            Role Permissions Matrix
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#77837D', margin: '4px 0 0 0' }}>
            Configured access control governing what each staff tier can view or execute.
          </p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#F8FAF9', borderBottom: '1px solid #E5E7EB', color: '#77837D', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>System Feature</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Admin</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Manager</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Staff</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((p, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#18352D' }}>{p.feature}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    {p.admin ? <Check size={16} color="#059669" style={{ margin: '0 auto' }} /> : <X size={16} color="#DC2626" style={{ margin: '0 auto' }} />}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    {p.manager ? <Check size={16} color="#059669" style={{ margin: '0 auto' }} /> : <X size={16} color="#DC2626" style={{ margin: '0 auto' }} />}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    {p.staff ? <Check size={16} color="#059669" style={{ margin: '0 auto' }} /> : <X size={16} color="#DC2626" style={{ margin: '0 auto' }} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
