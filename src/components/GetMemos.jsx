import React, { useState, useEffect } from 'react';
import "../App.css";

const GetMemos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        // Ensure contract exists before calling methods
        const memosData = await contract.getMemos();
        setMemos(memosData);
      } catch (error) {
        console.error("Error fetching memos:", error);
      }
    };

    if (contract) {
      fetchMemos();
    }
  }, [contract]);

  return (
  <div style={{
    padding: '2rem',
    backgroundColor: '#0f172a', // slate-900
    minHeight: '100vh',
    color: '#f8fafc',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }}>
    <h3 style={{
      fontSize: '1.875rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      color: '#34d399' // emerald-400
    }}>
      Recent Memos
    </h3>

    <div style={{
      overflowX: 'auto',
      borderRadius: '0.75rem',
      border: '1px solid #334155', // slate-700
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <table style={{
        width: '100%',
        textAlign: 'left',
        borderCollapse: 'collapse',
        backgroundColor: '#1e293b' // slate-800
      }}>
        <thead style={{
          backgroundColor: '#334155', // slate-700
          color: '#cbd5e1',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <tr>
            <th style={{ padding: '1rem' }}>Name</th>
            <th style={{ padding: '1rem' }}>Message</th>
            <th style={{ padding: '1rem' }}>Date</th>
          </tr>
        </thead>
        
        <tbody style={{ color: '#94a3b8' }}>
          {memos.length > 0 ? (
            memos.map((memo, index) => (
              <tr key={index} style={{
                borderTop: '1px solid #334155',
                transition: 'background-color 0.2s'
              }}>
                <td style={{ 
                  padding: '1rem', 
                  color: '#ecfdf5', // emerald-50
                  fontWeight: '500' 
                }}>
                  {memo.name}
                </td>
                <td style={{ padding: '1rem' }}>
                  {memo.message}
                </td>
                <td style={{ 
                  padding: '1rem', 
                  fontSize: '0.875rem' 
                }}>
                  {new Date(Number(memo.timestamp) * 1000).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ padding: '2rem', textAlign: 'center' }}>
                No memos yet!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default GetMemos;