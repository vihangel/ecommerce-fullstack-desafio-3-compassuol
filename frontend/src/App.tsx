/** @format */

// src/App.tsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";

import ShopPage from "./pages/shop/ShopPage";
import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </ThemeProvider>
  );
};

export default App;
