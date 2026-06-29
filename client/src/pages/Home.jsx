import { Link } from 'react-router-dom';

const features = [
  { title: 'Lead capture', description: 'Track contact details, company, source, and status in one place.' },
  { title: 'Pipeline visibility', description: 'See how many leads are new, contacted, or converted instantly.' },
  { title: 'Follow-up automation', description: 'Keep every conversation moving with reminders and notes.' },
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Launch faster with LeadFlow</span>
          <h1>Manage your business leads efficiently.</h1>
          <p>
            Modern client lead management systems are built for agencies and startups.
            Stay organized, accelerate follow-ups, and close more deals from one polished dashboard.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="btn btn-primary">Get Started</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>

        <div className="hero-preview-card">
          <div className="preview-top-row">
            <div className="preview-metric">
              <span>Total leads</span>
              <strong>1,245</strong>
            </div>
            <div className="preview-metric">
              <span>New this week</span>
              <strong>98</strong>
            </div>
            <div className="preview-metric">
              <span>Conversion</span>
              <strong>71%</strong>
            </div>
          </div>
          <div className="preview-body">
            <div className="preview-table">
              <div className="table-row header">
                <span>Contact</span>
                <span>Status</span>
                <span>Next action</span>
              </div>
              <div className="table-row">
                <span>Alice Green</span>
                <span className="status-pill status-new">New</span>
                <span>Call tomorrow</span>
              </div>
              <div className="table-row">
                <span>Mark Knight</span>
                <span className="status-pill status-contacted">Contacted</span>
                <span>Email follow-up</span>
              </div>
              <div className="table-row">
                <span>Park</span>
                <span className="status-pill status-won">Won</span>
                <span>Send proposal</span>
              </div>
            </div>
            <div className="preview-charts">
              <div className="chart-box">
                <strong>Pipeline</strong>
                <div className="chart-pill">72%</div>
              </div>
              <div className="chart-box chart-bar">
                <strong>Weekly leads</strong>
                <div className="bar-grid">
                  <span style={{ '--height': '0.65' }}></span>
                  <span style={{ '--height': '0.48' }}></span>
                  <span style={{ '--height': '0.82' }}></span>
                  <span style={{ '--height': '0.57' }}></span>
                  <span style={{ '--height': '0.92' }}></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
