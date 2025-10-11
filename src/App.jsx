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
import './App.css';

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
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
