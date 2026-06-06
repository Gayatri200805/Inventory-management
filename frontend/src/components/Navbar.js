import React from 'react';

const navStyle = {
  background: '#2c3e50', padding: '0 30px',
  display: 'flex', alignItems: 'center', gap: '10px'
};
const btnStyle = (active) => ({
  background: active ? '#3498db' : 'transparent',
  color: 'white', border: 'none', padding: '16px 20px',
  fontSize: '15px', cursor: 'pointer', borderRadius: '4px'
});

export default function Navbar({ setPage, currentPage }) {
  return (
    <nav style={navStyle}>
      <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginRight: '20px' }}>
        📦 Inventory
      </span>
      {['dashboard','products','customers','orders'].map(p => (
        <button key={p} style={btnStyle(currentPage === p)} onClick={() => setPage(p)}>
          {p.charAt(0).toUpperCase() + p.slice(1)}
        </button>
      ))}
    </nav>
  );
}