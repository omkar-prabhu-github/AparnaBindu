
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KolamGallery from './components/KolamGallery';
import Home from './components/home';

import './App.css';
import Database from './components/database';
import ClassifyKolam from './components/ClassifyKolam';
import RecreateKolam from './components/RecreateKolam';
import PulliKolam from './components/PulliKolam';
import OneFiveOne from './components/OneFiveOne';
import AboutUs from './components/About';
import KolamDesigner from './components/KolamDesigner';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/gallery" element={<KolamGallery />} />
          <Route path="/database" element={<Database />} />
          <Route path="/classify" element={<ClassifyKolam />} />
          <Route path="/recreate" element={<RecreateKolam />} />
          <Route path="/gallery/pulli" element={<PulliKolam />} />
          <Route path="/database/1-5-1" element={<OneFiveOne />} />
          <Route path="/aboutus" element={<AboutUs />} /> 
          <Route path="/design-kolam" element={<KolamDesigner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;