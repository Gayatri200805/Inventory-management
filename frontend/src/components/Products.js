import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const box = { background: 'white', borderRadius: '10px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '24px' };
const btn = (color) => ({ background: color, color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', marginLeft: '6px' });

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', sku: '', price: '', quantity: '' });
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState('');

  const load = () => axios.get(`${API}/products`).then(r => setProducts(r.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API}/products/${editing}`, { name: form.name, price: +form.price, quantity: +form.quantity });
        setMsg('Product updated!'); setEditing(null);
      } else {
        await axios.post(`${API}/products`, { ...form, price: +form.price, quantity: +form.quantity });
        setMsg('Product added!');
      }
      setForm({ name: '', sku: '', price: '', quantity: '' });
      load();
    } catch(err) { setMsg(err.response?.data?.detail || 'Error'); }
  };

  const del = async (id) => {
    if (window.confirm('Delete this product?')) {
      await axios.delete(`${API}/products/${id}`);
      setMsg('Deleted!'); load();
    }
  };

  const edit = (p) => { setEditing(p.id); setForm({ name: p.name, sku: p.sku, price: p.price, quantity: p.quantity }); };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Products</h2>
      {msg && <div style={{ background: '#d4edda', color: '#155724', padding: '10px', borderRadius: '6px', marginBottom: '16px' }}>{msg}</div>}
      <div style={box}>
        <h3 style={{ marginBottom: '16px' }}>{editing ? 'Edit Product' : 'Add Product'}</h3>
        <form onSubmit={submit}>
          <input placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input placeholder="SKU" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} required disabled={!!editing} />
          <input placeholder="Price" type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <input placeholder="Quantity" type="number" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} required />
          <button type="submit" style={btn('#3498db')}>{editing ? 'Update' : 'Add Product'}</button>
          {editing && <button type="button" style={btn('#95a5a6')} onClick={() => { setEditing(null); setForm({ name:'',sku:'',price:'',quantity:'' }); }}>Cancel</button>}
        </form>
      </div>
      <div style={box}>
        <h3 style={{ marginBottom: '16px' }}>All Products ({products.length})</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: '#f8f9fa' }}>
            {['Name','SKU','Price','Quantity','Actions'].map(h => <th key={h} style={{ padding: '10px', textAlign: 'left' }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderTop: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{p.name}</td>
                <td style={{ padding: '10px' }}>{p.sku}</td>
                <td style={{ padding: '10px' }}>${p.price}</td>
                <td style={{ padding: '10px', color: p.quantity < 10 ? '#e74c3c' : '#2ecc71', fontWeight: 'bold' }}>{p.quantity}</td>
                <td style={{ padding: '10px' }}>
                  <button style={btn('#f39c12')} onClick={() => edit(p)}>Edit</button>
                  <button style={btn('#e74c3c')} onClick={() => del(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}