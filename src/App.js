// Dans src/App.js (VERSION FINALE ET CORRIGÉE)

import React from 'react';
// ATTENTION : SEULEMENT Routes et Route sont importés, pas de Router.
import { Routes, Route } from 'react-router-dom'; 

import Header from './components/Header'; // <-- Décommenté
import Footer from './components/Footer'; // <-- Décommenté

// CASSE ET ORTHOGRAPHE CORRECTES (Exemple : si tu utilises Projets en français)
import Home from './pages/Home';       
import Projets from './pages/Projets'; 
import APropos from './pages/APropos'; 
import Contact from './pages/Contact'; 


function App() {
    return (
        // Utilisation de la balise Fragment (<>) car le Router est dans index.js
        <> 
            <Header /> {/* <-- DÉCOMMENTÉ */}
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projets" element={<Projets />} />
                <Route path="/a-propos" element={<APropos />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            
            <Footer /> {/* <-- DÉCOMMENTÉ */}
        </>
    );
}

export default App;