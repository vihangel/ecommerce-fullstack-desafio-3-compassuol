// src/App.tsx
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        {/* Adicione mais rotas aqui conforme precisar */}
      </Routes>
    </Router>
  );
};

export default App;
