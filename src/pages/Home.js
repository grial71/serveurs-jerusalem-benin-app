import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

function Home() {
    // Définition des couleurs pour une meilleure gestion des styles
    const PRIMARY_COLOR = '#0866FF'; // Bleu Facebook pour les boutons et liens

    // ATTENTION : Si tes noms de fichiers dans public/images/ sont différents,
    // tu devras adapter les chemins ci-dessous à tes noms (ex: /images/LogoPN.jpg)
    const BACKGROUND_IMAGE_PATH = '/images/nature-hero.png'; 
    const LOGO_IMAGE_PATH = '/images/logoPN.jpg'; 

    return (
        <main className="home-page">
            
            {/* 1. Section Héro (avec fond d'image et overlay pour le contraste) */}
            <section 
                className="hero-section" 
                style={{ 
                    textAlign: 'center', 
                    padding: '100px 20px', 
                    color: 'white', 
                    backgroundImage: `url(${BACKGROUND_IMAGE_PATH})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    backgroundColor: '#1E4032', // Couleur de secours
                    minHeight: '400px'
                }}>

                {/* Logo */}
                <img 
                    src={LOGO_IMAGE_PATH} 
                    alt="Logo PN" 
                    style={{ 
                        width: '100px', 
                        height: '100px', 
                        marginBottom: '20px', 
                        borderRadius: '50%', 
                        border: '3px solid white' 
                    }} 
                />

                {/* Boîte de Texte avec Fond Semi-Transparent pour le Contraste (Overlay) */}
                <div style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Noir avec 40% de transparence
                    padding: '20px 30px',
                    borderRadius: '10px',
                    display: 'inline-block', 
                    maxWidth: '80%', 
                    marginTop: '20px' 
                }}>
                    <h1 style={{ 
                        fontSize: '36px', 
                        marginBottom: '10px', 
                        color: '#B3D9FF'
                    }}>
                        Bienvenue sur le portail des Serveurs de Jérusalem au Bénin
                    </h1>
                    
                    {/* Phrase demandée par Jude */}
                    <h2 style={{ 
                        fontSize: '24px', 
                        margin: '15px 0 10px', 
                        fontWeight: 'normal' 
                    }}>
                        De la Production à la Livraison, notre passion
                    </h2>

                    <p style={{ fontSize: '18px', margin: '20px 0 30px' }}>
                        Soutenir l'autosuffisance, la permaculture et le développement durable pour les communautés béninoises.
                    </p>
                </div>
                
                {/* Bouton Projets */}
                <Link to="/projets" style={{ 
                    backgroundColor: PRIMARY_COLOR, 
                    color: '#FFFFFF', 
                    padding: '12px 25px', 
                    borderRadius: '8px', 
                    textDecoration: 'none', 
                    fontWeight: 'bold',
                    display: 'inline-block',
                    marginTop: '20px' 
                }}>
                    Découvrez nos projets
                </Link>
            </section>
            
            {/* 2. Aperçu des Piliers d'Action */}
            <section className="projects-overview" style={{ padding: '50px 20px', maxWidth: '1000px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', color: '#1C1E21', marginBottom: '40px', borderBottom: '2px solid #D0D3D7', paddingBottom: '15px' }}>Nos Piliers d'Action</h2>
                
                <div className="home-cards" style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    gap: '20px' 
                }}>
                    {/* Carte 1 : Autosuffisance */}
                    <div style={{ flex: 1, padding: '20px', border: '1px solid #D0D3D7', borderRadius: '12px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
                        <h3 style={{ color: '#00A400' }}>🌱 Autosuffisance Alimentaire</h3>
                        <p>Former et équiper les communautés pour une production alimentaire indépendante et durable.</p>
                    </div>
                    
                    {/* Carte 2 : Permaculture */}
                    <div style={{ flex: 1, padding: '20px', border: '1px solid #D0D3D7', borderRadius: '12px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
                        <h3 style={{ color: '#F9CF00' }}>♻️ Systèmes de Permaculture</h3>
                        <p>Créer des écosystèmes agricoles résilients et régénérateurs en harmonie avec la nature.</p>
                    </div>
                    
                    {/* Carte 3 : Recyclage */}
                    <div style={{ flex: 1, padding: '20px', border: '1px solid #D0D3D7', borderRadius: '12px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
                        <h3 style={{ color: '#14B898' }}>🗑️ Recyclage et Valorisation</h3>
                        <p>Transformer les déchets en ressources précieuses pour l'économie circulaire locale.</p>
                    </div>
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <Link to="/projets" style={{ 
                        color: PRIMARY_COLOR, 
                        fontWeight: 'bold',
                        textDecoration: 'none'
                    }}>
                        Voir tous les détails de nos projets →
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Home;