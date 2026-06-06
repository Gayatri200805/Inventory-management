import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const box = { background: 'white', borderRadius: '10px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '24px' };
const btn = (color) => ({ background: color, color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', marginLeft: '6px' });

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ full_name: '', email: '', phone: '' });
  const [msg, setMsg] = useState('');

  const load = () => axios.get(`${API}/customers`).then(r => setCustomers(r.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/customers`, form);
      setMsg('Customer added!');
      setForm({ full_name: '', email: '', phone: '' });
      load();
    } catch(err) { setMsg(err.response?.data?.detail || 'Error'); }
  };

  const del = async (id) => {
    if (window.confirm('Delete this customer?')) {
      await axios.delete(`${API}/customers/${id}`);
      setMsg('Deleted!'); load();
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Customers</h2>
      {msg && <div style={{ background: '#d4edda', color: '#155724', padding: '10px', borderRadius: '6px', marginBottom: '16px' }}>{msg}</div>}
      <div style={box}>
        <h3 style={{ marginBottom: '16px' }}>Add Customer</h3>
        <form onSubmit={submit}>
          <input placeholder="Full Name" value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} required />
          <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
          <button type="submit" style={btn('#2ecc71')}>Add Customer</button>
        </form>
      </div>
      <div style={box}>
        <h3 style={{ marginBottom: '16px' }}>All Customers ({customers.length})</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: '#f8f9fa' }}>
            {['Name','Email','Phone','Actions'].map(h => <th key={h} style={{ padding: '10px', textAlign: 'left' }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} style={{ borderTop: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{c.full_name}</td>
                <td style={{ padding: '10px' }}>{c.email}</td>
                <td style={{ padding: '10px' }}>{c.phone}</td>
                <td style={{ padding: '10px' }}><button style={btn('#e74c3c')} onClick={() => del(c.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}