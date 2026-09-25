// Admin Layout with Sidebar Navigation and Role Badge
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  CalendarRange, 
  Users, 
  Settings, 
  LogOut, 
  ArrowLeft, 
  Shield, 
  Sparkles,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';

export default function AdminLayout() {
  const { currentUser, logout, can, isFirebase } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard, permission: 'view_appointments' },
    { label: 'Appointments', path: '/admin/appointments', icon: CalendarCheck, permission: 'view_appointments' },
    { label: 'Calendar & Slots', path: '/admin/calendar', icon: CalendarRange, permission: 'manage_calendar' },
    { label: 'Staff Directory', path: '/admin/staff', icon: Users, permission: 'manage_staff' },
    { label: 'Settings & Firebase', path: '/admin/settings', icon: Settings, permission: 'manage_content' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAF9' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: '#0C2B24',
        color: '#FBFAF7',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(198, 154, 69, 0.25)',
        flexShrink: 0
      }}>
        {/* Brand Header */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo theme="dark" size="sm" showSubtitle={false} />
            <div style={{ fontSize: '0.68rem', color: '#E4C078', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '4px', fontWeight: 600 }}>
              Staff & Physician Portal
            </div>
          </Link>
        </div>

        {/* User Card */}
        <div style={{
          padding: '16px 20px',
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#173A30',
              color: '#E4C078',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem',
              fontWeight: 700
            }}>
              {currentUser?.name?.[0] || 'U'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FBFAF7', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {currentUser?.name || 'Staff User'}
              </div>
              <div style={{
                display: 'inline-block',
                background: '#C69A45',
                color: '#0C2B24',
                fontSize: '0.68rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '1px 6px',
                borderRadius: '4px'
              }}>
                Role: {currentUser?.role || 'staff'}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '10px', fontSize: '0.72rem', color: isFirebase ? '#4ADE80' : '#FBBF24', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Database size={11} />
            <span>{isFirebase ? 'Connected to Firebase' : 'Demo Local Storage Mode'}</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const hasAccess = can(item.permission);
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            if (!hasAccess) return null;

            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 16px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#0C2B24' : '#D6DED9',
                  background: isActive ? '#E4C078' : 'transparent',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none'
                }}
              >
                <Icon size={18} color={isActive ? '#0C2B24' : '#C69A45'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div style={{
          padding: '16px 14px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '6px',
              fontSize: '0.84rem',
              color: '#A3B1AA',
              background: 'rgba(255,255,255,0.05)',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={15} />
            <span>Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '6px',
              fontSize: '0.84rem',
              color: '#F87171',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
        <Outlet />
      </main>
    </div>
  );
}
