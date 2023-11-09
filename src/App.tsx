import React from 'react';
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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/votar" element={<MainVoto />} />
        <Route path="/ranking" element={<PageRanking />} />
        <Route path="/outros" element={<PageOutros />} />
        <Route path="/perfil/:id" element={<Perfil />} />
        <Route path="/meuperfil" element={<PerfilUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/codigoacesso" element={<AlterarSenha />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
