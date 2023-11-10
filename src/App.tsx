import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import PageRanking from './components/PageRanking';
import PageOutros from './components/PageOutros';
import Perfil from './components/Perfil';
import Login from './components/Login';
import PerfilUser from './components/PerfilUser';
import MainVoto from './components/MainVoto';
import AlterarSenha from './components/AlterarSenha';
import NavPrep from './components/NavTeste';
import Countdown from './components/Contagem';

function App() {
  const deadline = new Date('2023-11-10T01:45:00').getTime();
  const [showContent, setShowContent] = useState(false);
  const [modoOperacional, setModoOperacional] = useState(false);
  useEffect(() => {
    const currentTime = new Date().getTime();
    setShowContent(currentTime >= deadline);
  }, [deadline]);

  const handleMudarOperacao = () => {
    setModoOperacional(!modoOperacional);
  }
  return (
    <Router>
      {!modoOperacional &&<NavPrep />}
      {showContent && <Navbar />}
      {!showContent && <Countdown deadline={deadline} />}
      
      <Routes>
        {showContent && <Route path="/" element={<Home />} />}
        {showContent && <Route path="/votar" element={<MainVoto />} />}
        {showContent && <Route path="/ranking" element={<PageRanking />} />}
        {showContent && <Route path="/outros" element={<PageOutros />} />}
        {showContent && <Route path="/perfil/:id" element={<Perfil />} />}
        {showContent && <Route path="/meuperfil" element={<PerfilUser />} />}
        {showContent && <Route path="/login" element={<Login />} />}
        {showContent && <Route path="/codigoacesso" element={<AlterarSenha />} />}
      </Routes>
      {showContent && <Footer />}
    </Router>
  );
}

export default App;
