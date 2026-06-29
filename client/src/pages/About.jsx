import React, { useState, useEffect } from 'react';

export default function About() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper component to generate the technical dot grid backdrop dynamically
  const RenderDotPattern = () => {
    return (
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)',
        gap: '20px',
        padding: '20px',
        opacity: 0.15,
        pointerEvents: 'none'
      }}>
        {Array.from({ length: 60 }).map((_, idx) => (
          <div key={idx} style={{ width: '4px', height: '4px', backgroundColor: '#64748B', borderRadius: '50%', justifySelf: 'center', alignSelf: 'center' }} />
        ))}
      </div>
    );
  };

  return (
    <div style={{
      backgroundColor: '#F8FAFC',
      minHeight: '100vh',
      width: '100%',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: '#334155',
      boxSizing: 'border-box',
      padding: '5rem 2rem'
    }}>
      <div style={{ width: '100%', maxWidth: '75rem', margin: '0 auto' }}>
        
        {/* Main Section Header */}
        <div style={{ marginBottom: '4rem', maxWidth: '46rem' }}>
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#0D9488', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            OUR CORE MISSION
          </div>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.04em', color: '#0F172A', margin: '0 0 1rem' }}>
            About LeadFlow CRM
          </h1>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.65, color: '#475569', margin: 0 }}>
            LeadFlow CRM is built on the philosophy that operational software should be light, quick, and radically intuitive. We help small businesses scale operations, lock in vital prospect metadata, and protect pipeline velocity without structural friction.
          </p>
        </div>

        {/* Dynamic High-Value Impact Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)',
          gap: '1.5rem',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '1.5rem',
          padding: '2rem',
          marginBottom: '4rem',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)'
        }}>
          {[
            { metric: "+24%", title: "Closing Rate Efficiency" },
            { metric: "12h", title: "Admin Work Hours Reclaimed" },
            { metric: "< 2m", title: "Instant Team Set-Up" },
            { metric: "100%", title: "Encrypted Data Control" }
          ].map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: '800', color: '#2563EB', letterSpacing: '-0.03em' }}>{stat.metric}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '500', color: '#64748B', marginTop: '4px' }}>{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Feature Split Layout Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
          gap: '3rem',
          marginBottom: '5rem'
        }}>
          
          {/* Block 1: Reliable Tracking */}
          <div 
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '2rem',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'between',
              transition: 'all 0.3s ease',
              boxShadow: hoveredCard === 1 ? '0 12px 30px -10px rgba(0,0,0,0.04)' : 'none'
            }}
          >
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '9999px', backgroundColor: '#EFF6FF', color: '#2563EB', marginBottom: '1.25rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2563EB' }}></span>
                RELIABLE ACQUISITION
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
                Reliable lead tracking
              </h2>
              <p style={{ fontSize: '1.025rem', lineHeight: 1.6, color: '#64748B', margin: 0 }}>
                Capture micro-details, record immediate status adjustments, and append vital background logs sequentially in a single ledger workspace. Stop losing deal history to messy spreadsheets.
              </p>
            </div>

            {/* Live Rendered Lead Profile Mockup Card */}
            <div style={{ minHeight: '160px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '1.5rem' }}>
              <RenderDotPattern />
              <div style={{ zIndex: 2, background: '#FFFFFF', width: '100%', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#DBEAFE', color: '#2563EB', display: 'flex', alignItems: 'center', justifyindex: 'center', fontSize: '14px', fontWeight: 'bold', justifyContent: 'center' }}>JD</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#1E293B' }}>John Doe</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>j.doe@enterprise.com</div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#D1FAE5', color: '#065F46' }}>QUALIFIED</span>
              </div>
            </div>
          </div>

          {/* Block 2: Fast Workflows */}
          <div 
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '2rem',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'between',
              transition: 'all 0.3s ease',
              boxShadow: hoveredCard === 2 ? '0 12px 30px -10px rgba(0,0,0,0.04)' : 'none'
            }}
          >
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '9999px', backgroundColor: '#F0FDFA', color: '#0D9488', marginBottom: '1.25rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0D9488' }}></span>
                PRODUCTIVITY FIRST
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
                Fast admin workflows
              </h2>
              <p style={{ fontSize: '1.025rem', lineHeight: 1.6, color: '#64748B', margin: 0 }}>
                Authenticate securely once, then freely skip across your metrics matrix, pipeline views, scheduling layers, and team settings with a unified global configuration hub.
              </p>
            </div>

            {/* Live Rendered Action Bar Mockup Grid */}
            <div style={{ minHeight: '160px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '1.5rem' }}>
              <RenderDotPattern />
              <div style={{ zIndex: 2, display: 'flex', gap: '10px', width: '100%' }}>
                {['Dashboard', 'Leads Queue', 'Team Panels'].map((text, i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 8px', fontSize: '11px', fontWeight: '600', color: '#475569' }}>
                    ⚡ {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      

      </div>
    </div>
  );
}