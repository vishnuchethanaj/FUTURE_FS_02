import React, { useState, useEffect } from 'react';

export default function Settings() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  // Interactive mock states to show it works
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@crm.com',
    role: 'Workspace Owner'
  });
  
  const [saveNotification, setSaveNotification] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3000);
  };

  return (
    <div style={{
      backgroundColor: '#F8FAFC',
      minHeight: '100vh',
      width: '100%',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: '#334155',
      boxSizing: 'border-box',
      padding: '4rem 2rem'
    }}>
      <div style={{ width: '100%', maxWidth: '70rem', margin: '0 auto' }}>
        
        {/* Header Block */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.04em', margin: '0 0 0.5rem' }}>
            Settings
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748B', margin: 0 }}>
            Manage your personal profile account data, configurations, and review active CRM workspace performance metrics.
          </p>
        </div>

        {/* Global Save Toast Notification */}
        {saveNotification && (
          <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', backgroundColor: '#0F172A', color: '#FFFFFF', padding: '1rem 1.5rem', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 100, fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ✨ Profile changes saved successfully!
          </div>
        )}

        {/* Workspace Quick-Stats Cards Row */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.25rem' }}>
            Workspace Statistics
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : '1fr',
            gap: '1.5rem'
          }}>
            {[
              { total: '5', title: 'Total leads', color: '#2563EB', bg: '#EFF6FF' },
              { total: '1', title: 'Converted', color: '#10B981', bg: '#F0FDFA' },
              { total: '4', title: 'Active leads', color: '#F59E0B', bg: '#FEF3C7' }
            ].map((stat, idx) => (
              <div key={idx} style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '1.25rem',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02)'
              }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748B' }}>{stat.title}</div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A', marginTop: '4px', letterSpacing: '-0.02em' }}>{stat.total}</div>
                </div>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}>
                  📊
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Workspace Setup Split */}
        <div style={{
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }}>
          
          {/* Settings Side Controls Menu */}
          <div style={{ width: isDesktop ? '240px' : '100%', display: 'flex', flexDirection: isDesktop ? 'column' : 'row', gap: '0.5rem', borderBottom: isDesktop ? 'none' : '1px solid #E2E8F0', paddingBottom: isDesktop ? 0 : '1rem' }}>
            {[
              { id: 'profile', label: '👤 Account Profile' },
              { id: 'security', label: '🔒 Security Settings' },
              { id: 'billing', label: '💳 Subscription plan' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: isDesktop ? '100%' : 'auto',
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  fontSize: '0.925rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                  color: activeTab === tab.id ? '#2563EB' : '#475569',
                  boxShadow: activeTab === tab.id ? '0 4px 6px -1px rgba(0,0,0,0.03), 0 2px 4px -1px rgba(0,0,0,0.01)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Action Card Panel */}
          <div style={{
            flex: 1,
            width: '100%',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 1px 3px 0 rgba(0,0,0,0.01)'
          }}>
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', margin: '0 0 0.25rem' }}>Account Profile</h3>
                
                {/* Visual Avatar Identifier Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '1.5rem' }}>
                  <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: '700' }}>
                    {profileData.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1E293B' }}>{profileData.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '2px' }}>{profileData.role}</div>
                  </div>
                </div>

                {/* Form Inputs Container Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569' }}>DISPLAY NAME</label>
                    <input 
                      type="text" 
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569' }}>EMAIL ADDRESS</label>
                    <input 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', borderTop: '1px solid #F1F5F9', paddingTop: '1.5rem' }}>
                  <button 
                    type="submit"
                    style={{
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '0.75rem',
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)',
                      transition: 'transform 0.2s'
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'security' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '200px', justifyContent: 'center', textAlign: 'center', color: '#64748B' }}>
                🔑 Security credentials parameters & multi-factor validation logs can be structured here.
              </div>
            )}

            {activeTab === 'billing' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '200px', justifyContent: 'center', textAlign: 'center', color: '#64748B' }}>
                💳 Subscription structural plan metrics, billing metrics, and payment invoices ledger can be accessed here.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}