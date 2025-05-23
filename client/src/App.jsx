import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Workout from './pages/Workout';
import Diet from './pages/Diet';

function App() {
  return (
    <Router>
      {/* Radial gradient background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 w-full h-full pointer-events-none bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"
      />
      
      <div className="min-h-screen bg-transparent text-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/diet" element={<Diet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
