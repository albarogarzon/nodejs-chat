import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { UserContext } from './UserContex';
import Chat from './components/chat/Chat';
import Home from './components/home/Home';
import React, { useState } from 'react';
import Navbar from './components/layout/Navbar'

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/chat/:room_id/:room_name" element={<Chat/>} />
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
