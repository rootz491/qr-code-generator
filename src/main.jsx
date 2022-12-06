import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import SVG from './pages/SVG';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/app' element={<App />} />
        <Route path='/svg' element={<SVG />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
