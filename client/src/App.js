import React, { useState } from 'react';
import Home from './pages/home';
import Profile from './pages/profile';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import NoPage from './pages/NoPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [isHome, setHome] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
