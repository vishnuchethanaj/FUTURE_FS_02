import { useState } from 'react';
import { createLead } from '../services/leads';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createLead({
        name,
        email,
        company,
        followUpDate: date,
        message,
        source: 'Website Contact',
        status: 'New',
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setCompany('');
      setDate('');
      setMessage('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to submit the lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-card contact-page">
      <div className="page-card-grid">
        <div>
          <span className="eyebrow">Contact</span>
          <h1>Get in touch with LeadFlow CRM</h1>
          <p>Have a question or need help setting up your admin portal? Send us a message and we’ll respond quickly.</p>
          <div className="contact-details">
            <div>
              <strong>Email</strong>
              <p>supportleadflowcrm@gmail.com</p>
            </div>
            <div>
              <strong>Phone</strong>
              <p>+91 98765 43210</p>
            </div>
            <div>
              <strong>Office</strong>
              <p> New York, NY 10001</p>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          {submitted ? (
            <div className="contact-success">
              <h2>Thank you!</h2>
              <p>Your message has been received and added to the dashboard.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              {error && <div className="error">{error}</div>}
              <div className="form-row">
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-row">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="form-row">
                <label>Company</label>
                <input value={company} onChange={(e) => setCompany(e.target.value)} />
              </div>
              <div className="form-row">
                <label>Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <div className="form-row">
                <label>Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
              </div>
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Submitting…' : 'Submit Lead'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
