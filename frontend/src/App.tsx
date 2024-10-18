// src/App.tsx
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AppBar from './components/AppBar';
import ProductsPage from './pages/ProductsPage';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppBar />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
