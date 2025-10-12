import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Terms from './pages/Terms';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import StreamView from './pages/StreamView';
import Categorias from './pages/Categorias';
import './App.css';
import PaymentMethods from './pages/PaymentMethods';
import VVCoins from './pages/VVCoins';
import RegalosSubs from "./pages/RegalosSubs";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stream/:id" element={<StreamView />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/payment" element={<PaymentMethods />} />
            <Route path="/coins" element={<VVCoins />} />
            <Route path="/regalossubs" element={<RegalosSubs />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
