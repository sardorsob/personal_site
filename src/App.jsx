import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Awards from './components/Awards';
import Contact from './components/Contact';
import './styles/global.css';

function App() {
  return (
    <div className="app-layout">
      <Navigation />
      <main className="app-main">
        <Routes>
          <Route path="/"           element={<Hero />}       />
          <Route path="/resume"     element={<Hero />}       />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects"   element={<Projects />}   />
          <Route path="/awards"     element={<Awards />}     />
          <Route path="/contact"    element={<Contact />}    />
        </Routes>
      </main>
    </div>
  );
}

export default App;
