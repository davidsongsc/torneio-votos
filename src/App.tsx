import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './reducers';
import Home from './components/Home';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import PageRanking from './components/PageRanking';
import PageOutros from './components/PageOutros';
import Perfil from './components/Perfil';
import PerfilUser from './components/PerfilUser';
import MainVoto from './components/MainVoto';
import AlterarSenha from './components/AlterarSenha';
import NavPrep from './components/NavTeste';
import Countdown from './components/Contagem';
import PageRegulamento from './components/PageRegulamento';

function App() {
  const modoOperacional = useSelector((state: RootState) => state.configReducer.config?.[0] || null);
  const deadline = new Date(modoOperacional.prazoManutencao).getTime();
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const timeRemaining = deadline - currentTime;

    if (timeRemaining > 0) {
      setTimeout(() => {
        setLoading(false);
        setShowContent(true);
      }, timeRemaining);
    } else {
      setLoading(false);
      setShowContent(true);
    }
  }, [deadline]);

  if (loading) {
    // Exibir seu componente de loading aqui
    return <Countdown deadline={deadline}  />;
  }

  return (
    <Router>
      {!modoOperacional.valendo && <NavPrep />}
      {showContent && <Navbar />}
      {!showContent && <Countdown deadline={deadline} />}

      <Routes>
        {showContent && <Route path="/" element={<PageRanking />} />}
        {showContent && <Route path="/contest" element={<Home />} />}
        {showContent && <Route path="/votar" element={<MainVoto />} />}
        {showContent && <Route path="/ranking" element={<PageRanking />} />}
        {showContent && <Route path="/outros" element={<PageOutros />} />}
        {showContent && <Route path="/perfil/:id" element={<Perfil />} />}
        {showContent && <Route path="/meuperfil" element={<PerfilUser />} />}
        {showContent && <Route path="/login" element={<AlterarSenha />} />}
        {showContent && <Route path="/codigoacesso" element={<AlterarSenha />} />}
        {showContent && <Route path="/regras" element={<PageRegulamento />} />}
      </Routes>
      {showContent && <Footer />}
    </Router>
  );
}

export default App;
