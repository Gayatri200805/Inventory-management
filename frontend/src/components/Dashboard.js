import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const cardStyle = {
  background: 'white', borderRadius: '10px', padding: '24px',
  textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', flex: 1
};

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${API}/dashboard`).then(r => setData(r.data)).catch(console.error);
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Dashboard</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
        {[
          { label: 'Total Products', value: data.total_products, color: '#3498db' },
          { label: 'Total Customers', value: data.total_customers, color: '#2ecc71' },
          { label: 'Total Orders', value: data.total_orders, color: '#e67e22' },
          { label: 'Low Stock', value: data.low_stock_products.length, color: '#e74c3c' },
        ].map(card => (
          <div key={card.label} style={cardStyle}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: card.color }}>{card.value}</div>
            <div style={{ color: '#666', marginTop: '8px' }}>{card.label}</div>
          </div>
        ))}
      </div>
      {data.low_stock_products.length > 0 && (
        <div style={{ background: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#e74c3c', marginBottom: '12px' }}>⚠️ Low Stock Products</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {data.low_stock_products.map(p => (
                <tr key={p.id} style={{ borderTop: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{p.name}</td>
                  <td style={{ padding: '10px', color: '#e74c3c', fontWeight: 'bold' }}>{p.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}