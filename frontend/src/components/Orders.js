import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const box = { background: 'white', borderRadius: '10px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '24px' };
const btn = (color) => ({ background: color, color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', marginLeft: '6px' });

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState([{ product_id: '', quantity: 1 }]);
  const [msg, setMsg] = useState('');

  const load = () => {
    axios.get(`${API}/orders`).then(r => setOrders(r.data));
    axios.get(`${API}/customers`).then(r => setCustomers(r.data));
    axios.get(`${API}/products`).then(r => setProducts(r.data));
  };
  useEffect(() => { load(); }, []);

  const addItem = () => setItems([...items, { product_id: '', quantity: 1 }]);
  const updateItem = (i, field, val) => {
    const updated = [...items];
    updated[i][field] = field === 'quantity' ? +val : val;
    setItems(updated);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/orders`, {
        customer_id: +customerId,
        items: items.map(i => ({ product_id: +i.product_id, quantity: +i.quantity }))
      });
      setMsg('Order created!');
      setCustomerId(''); setItems([{ product_id: '', quantity: 1 }]);
      load();
    } catch(err) { setMsg(err.response?.data?.detail || 'Error'); }
  };

  const del = async (id) => {
    if (window.confirm('Cancel this order?')) {
      await axios.delete(`${API}/orders/${id}`);
      setMsg('Order cancelled!'); load();
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Orders</h2>
      {msg && <div style={{ background: '#d4edda', color: '#155724', padding: '10px', borderRadius: '6px', marginBottom: '16px' }}>{msg}</div>}
      <div style={box}>
        <h3 style={{ marginBottom: '16px' }}>Create Order</h3>
        <form onSubmit={submit}>
          <label>Customer</label>
          <select value={customerId} onChange={e => setCustomerId(e.target.value)} required>
            <option value="">Select customer</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
          </select>
          <label>Products</label>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
              <select value={item.product_id} onChange={e => updateItem(i, 'product_id', e.target.value)} required style={{ flex: 2, margin: 0 }}>
                <option value="">Select product</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name} (stock: {p.quantity})</option>)}
              </select>
              <input type="number" min="1" value={item.quantity} onChange={e => updateItem(i, 'quantity', e.target.value)} style={{ flex: 1, margin: 0 }} />
            </div>
          ))}
          <button type="button" style={btn('#95a5a6')} onClick={addItem}>+ Add Item</button>
          <button type="submit" style={{...btn('#e67e22'), marginTop: '12px', display: 'block'}}>Place Order</button>
        </form>
      </div>
      <div style={box}>
        <h3 style={{ marginBottom: '16px' }}>All Orders ({orders.length})</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: '#f8f9fa' }}>
            {['Order ID','Customer ID','Total','Date','Actions'].map(h => <th key={h} style={{ padding: '10px', textAlign: 'left' }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{ borderTop: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>#{o.id}</td>
                <td style={{ padding: '10px' }}>{o.customer_id}</td>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>${o.total_amount.toFixed(2)}</td>
                <td style={{ padding: '10px' }}>{new Date(o.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '10px' }}><button style={btn('#e74c3c')} onClick={() => del(o.id)}>Cancel</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}