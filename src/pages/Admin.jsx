import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Admin() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/leads');
      if (!response.ok) throw new Error('Failed to fetch leads');
      const data = await response.json();
      setLeads(data.reverse()); // Show newest first
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-black)', color: 'var(--text-main)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '3rem' }}
        >
          <h1 className="heading-section">Admin Dashboard</h1>
          <p className="text-body">Manage and view all incoming project inquiries.</p>
        </motion.div>

        {loading ? (
          <p>Loading inquiries...</p>
        ) : error ? (
          <div style={{ padding: '2rem', background: 'rgba(255,0,0,0.1)', border: '1px solid red', borderRadius: '10px' }}>
            {error}. Make sure the backend server and Database are running.
          </div>
        ) : leads.length === 0 ? (
          <p>No inquiries found in the database yet.</p>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {leads.map((lead) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  padding: '2rem',
                  borderRadius: '16px',
                  backdropFilter: 'var(--glass-blur)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--purple-secondary)' }}>{lead.name}</h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>{lead.email}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{new Date(lead.timestamp).toLocaleString()}</span>
                    {lead.company && <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{lead.company}</p>}
                  </div>
                </div>
                
                <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{lead.message}</p>
                
                {lead.website && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <a href={lead.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--purple-secondary)', fontSize: '0.85rem' }}>
                      View Website ↗
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
