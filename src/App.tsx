import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import PageRanking from './components/PageRanking';
import PageOutros from './components/PageOutros';
import Perfil from './components/pagina/Perfil';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ranking" element={<PageRanking />} />
        <Route path="/outros" element={<PageOutros />} />
        <Route path="/perfil/:id" element={<Perfil />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
