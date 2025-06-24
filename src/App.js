import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Teacher from './Teacher';
import Student from './Student';

function App() {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        <h1>Live Video Class Demo</h1>
        <nav>
          <Link to="/teacher" style={{ marginRight: 10 }}>Teacher</Link>
          <Link to="/student">Student</Link>
        </nav>
        <Routes>
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/student" element={<Student />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
