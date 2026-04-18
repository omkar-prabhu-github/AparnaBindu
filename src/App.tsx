import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KolamGallery from './components/KolamGallery';
import Home from './components/home';

import './App.css';
import PulliKolam from './components/PulliKolam';
import AboutUs from './components/About';
import KolamDesigner from './components/KolamDesigner';
import ClassifyKolam from './components/ClassifyKolam';
import ClassGallery from './components/ClassGallery';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/gallery" element={<KolamGallery />} />
          <Route path="/classify" element={<ClassifyKolam />} />
          <Route path="/gallery/:classId" element={<ClassGallery />} />
          <Route path="/gallery/pulli" element={<PulliKolam />} />
          <Route path="/aboutus" element={<AboutUs />} /> 
          <Route path="/design-kolam" element={<KolamDesigner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;