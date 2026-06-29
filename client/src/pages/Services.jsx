import React, { useState, useEffect } from 'react';

export default function Services() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const servicesData = [
    {
      title: "Lead pipeline management",
      tagline: "VISIBLE PIPELINE STAGE TRACKING",
      description: "Stop guessing where deals stand. Effortlessly track prospects from initial qualification to final signed contracts inside a unified workspace designed to optimize deal velocity.",
      color: "#2563EB",
      bgLight: "#EFF6FF",
      borderLight: "#DBEAFE",
      renderMock: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '90%', background: '#fff', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ flex: 1, padding: '8px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #3B82F6' }}>
              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748B' }}>NEW LEADS</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', marginTop: '2px' }}>Acme Corp</div>
            </div>
            <div style={{ flex: 1, padding: '8px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #F59E0B' }}>
              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748B' }}>CONTACTED</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', marginTop: '2px' }}>Stark Industries</div>
            </div>
            <div style={{ flex: 1, padding: '8px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #10B981' }}>
              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748B' }}>CONVERTED</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', marginTop: '2px' }}>Wayne Ent.</div>
            </div>
          </div>
          <div style={{ padding: '8px', border: '1px solid #F1F5F9', borderRadius: '6px', fontSize: '11px', color: '#64748B', background: '#FFF' }}>
            ⚡ <strong>Next Action:</strong> Send custom onboarding proposal pitch deck to Stark Industries before EOD.
          </div>
        </div>
      )
    },
    {
      title: "Analytics & insights",
      tagline: "REALTIME EFFICIENCY CONSOLE",
      description: "Understand team and acquisition efficiency completely. View lead channel origins, evaluate closing ratios, and identify bottlenecks with clean, actionable chart interfaces.",
      color: "#0D9488",
      bgLight: "#F0FDFA",
      borderLight: "#CCFBF1",
      renderMock: () => (
        <div style={{ display: 'flex', gap: '12px', width: '90%', background: '#fff', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#0D9488' }}>74%</div>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#64748B', marginTop: '2px' }}>Conversion Rate</div>
            <div style={{ height: '6px', background: '#E2E8F0', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
              <div style={{ width: '74%', height: '100%', background: '#0D9488' }}></div>
            </div>
          </div>
          <div style={{ width: '1px', background: '#E2E8F0' }}></div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'between', fontSize: '10px', color: '#475569' }}>
              <span>Organic Search</span> <strong style={{ marginLeft: 'auto' }}>45%</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'between', fontSize: '10px', color: '#475569' }}>
              <span>Referrals</span> <strong style={{ marginLeft: 'auto' }}>35%</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'between', fontSize: '10px', color: '#475569' }}>
              <span>Cold Outreach</span> <strong style={{ marginLeft: 'auto' }}>20%</strong>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Follow-up scheduling",
      tagline: "INTELLIGENT TIMELINE REMINDERS",
      description: "Never lose a warm relationship to poor communication schedules. Schedule structured notification check-ins and log conversation logs to protect your historical lead pipeline context.",
      color: "#4F46E5",
      bgLight: "#E0E7FF",
      borderLight: "#C7D2FE",
      renderMock: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '90%', background: '#fff', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4F46E5' }}></div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#1E293B' }}>Follow-up: Sarah Jenkins</span>
            <span style={{ fontSize: '10px', padding: '2px 6px', background: '#EEF2F6', borderRadius: '4px', color: '#475569', marginLeft: 'auto' }}>Tomorrow</span>
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', lineHeight: '1.4' }}>
            "Requested follow-up email after their Q3 budget planning meeting wraps up on Wednesday morning."
          </div>
        </div>
      )
    }
  ];

  return (
    <div style={{
      backgroundColor: '#F8FAFC',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: '#334155',
      boxSizing: 'border-box',
      margin: 0,
      padding: 0
    }}>
      
      {/* Top Section Header */}
      <header style={{ width: '100%', maxWidth: '75rem', margin: '0 auto', padding: '5rem 2rem 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#2563EB', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Our Services
          </div>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.04em', color: '#0F172A', margin: 0 }}>
            Make Sales Frictionless
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#475569', maxWidth: '42rem', lineHeight: 1.6, margin: 0 }}>
            LeadFlow CRM provides targeted, structural tools to manage client workflows without bloated interfaces. Everything you need to scale, localized into simple steps.
          </p>
        </div>
      </header>

      {/* Main Showcase Grid Stack */}
      <main style={{ width: '100%', maxWidth: '75rem', margin: '0 auto', padding: '4rem 2rem', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {servicesData.map((service, index) => {
          const isEven = index % 2 === 0;
          const isHovered = hoveredIndex === index;

          return (
            <div 
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                flexDirection: isDesktop ? (isEven ? 'row' : 'row-reverse') : 'column',
                gap: '4rem',
                alignItems: 'center',
                backgroundColor: isHovered ? '#FFFFFF' : 'transparent',
                border: '1px solid',
                borderColor: isHovered ? '#E2E8F0' : 'transparent',
                borderRadius: '2rem',
                padding: isHovered ? '2rem' : '1rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isHovered ? '0 10px 30px -10px rgba(0,0,0,0.04)' : 'none'
              }}
            >
              {/* Content Split Column */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: service.color, letterSpacing: '0.05em' }}>
                    {service.tagline}
                  </span>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#0F172A', margin: 0 }}>
                    {service.title}
                  </h2>
                </div>
                <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                  {service.description}
                </p>
              </div>

              {/* Graphical SaaS Mockup Side */}
              <div style={{
                flex: 1.2,
                width: '100%',
                minHeight: '340px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01), 0 2px 4px -1px rgba(0,0,0,0.01)'
              }}>
                {/* Structural Subtle Technical Grid Underlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: '24px',
                  padding: '24px',
                  opacity: 0.2,
                  pointerEvents: 'none'
                }}>
                  {Array.from({ length: 96 }).map((_, idx) => (
                    <div key={idx} style={{ width: '4px', height: '4px', backgroundColor: '#64748B', borderRadius: '50%', justifySelf: 'center', alignSelf: 'center' }} />
                  ))}
                </div>

                {/* Highly Rendered CRM Live Component Mock */}
                <div style={{ zIndex: 2, width: '100%', display: 'flex', justifyContent: 'center', transition: 'transform 0.3s ease', transform: isHovered ? 'scale(1.02)' : 'scale(1)' }}>
                  {service.renderMock()}
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {/* Footer Branding Wrap */}
      <footer style={{ width: '100%', maxWidth: '75rem', margin: '0 auto', padding: '0 2rem 4rem' }}>
        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '2rem', display: 'flex', flexDirection: isDesktop ? 'row' : 'column', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', color: '#94A3B8' }}>
          <p style={{ margin: 0 }}>© 2026 LeadFlow CRM. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '2rem', fontWeight: 500 }}>
            <a href="#features" style={{ color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}>Features</a>
            <a href="#privacy" style={{ color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy Policy</a>
            <a href="#terms" style={{ color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}>Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}