// Dans src/components/Header.js

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css';

// Définir la liste des chansons (chemin d'accès depuis le dossier public/audio/)
const PLAYLIST = [
    "/audio/afro-background-01.mp3",
    "/audio/afro-background-02.mp3"
];

const Header = () => {
    // Référence pour cibler l'élément audio
    const audioRef = useRef(null);
    // Index pour suivre la chanson en cours
    const currentTrackIndex = useRef(0);

    // Fonction pour passer à la chanson suivante dans la playlist
    const playNextTrack = () => {
        // Calcul du nouvel index (revient à 0 après la dernière chanson)
        currentTrackIndex.current = (currentTrackIndex.current + 1) % PLAYLIST.length;
        
        // Mettre à jour la source et lancer la lecture
        if (audioRef.current) {
            audioRef.current.src = PLAYLIST[currentTrackIndex.current];
            audioRef.current.play().catch(error => {
                // Gère le cas où le navigateur bloque l'autoplay
                console.log("Lecture automatique bloquée ou erreur de lecture.", error);
            });
        }
    };

    // Configuration de l'écouteur d'événement 'ended' (à la fin d'une chanson)
    useEffect(() => {
        const audioEl = audioRef.current;
        
        // S'assurer que le navigateur permet la lecture initiale (pour éviter le blocage d'autoplay)
        if (audioEl && audioEl.paused) {
            audioEl.play().catch(error => {
                // Afficher le message d'erreur d'autoplay si besoin
            });
        }
        
        if (audioEl) {
            audioEl.addEventListener('ended', playNextTrack);
        }
        
        // Fonction de nettoyage
        return () => {
            if (audioEl) {
                audioEl.removeEventListener('ended', playNextTrack);
            }
        };
    }, []);

    return (
        <header className="main-header"> 
            
            {/* Élément AUDIO avec contrôles visibles et position fixe */}
            <audio 
                ref={audioRef} 
                autoPlay 
                src={PLAYLIST[currentTrackIndex.current]}
                controls // Afficher les contrôles (lecture, pause, volume)
                className="audio-player-fixed" // Classe pour le CSS de positionnement fixe
            >
                Votre navigateur ne supporte pas l'élément audio.
            </audio>

            {/* Le Logo (à adapter si tu as une image pour le logo) */}
            <h1 className="header-logo">
                <Link to="/">LSJ Bénin</Link>
            </h1>
            
            {/* Liens de Navigation */}
            <nav className="nav-links">
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/projets">Projets</Link></li>
                    <li><Link to="/a-propos">À Propos</Link></li> 
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;