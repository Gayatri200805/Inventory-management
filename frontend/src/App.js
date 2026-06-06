import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Customers from './components/Customers';
import Orders from './components/Orders';

function App() {
  const [page, setPage] = useState('dashboard');

  const renderPage = () => {
    switch(page) {
      case 'dashboard': return <Dashboard />;
      case 'products': return <Products />;
      case 'customers': return <Customers />;
      case 'orders': return <Orders />;
      default: return <Dashboard />;
    }
  };

  return (
    <div>
      <Navbar setPage={setPage} currentPage={page} />
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;