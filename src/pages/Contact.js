// Dans src/pages/Contact.js

import React from 'react';
import './Contact.css'; 
import { Link } from 'react-router-dom'; 

const Contact = () => {
    
    // --- CHEMINS DES IMAGES PUBLIC (Corrigés selon tes fichiers) ---
    const NATURE_IMAGE_PATH = process.env.PUBLIC_URL + '/images/nature-hero.png'; 
    const LOGO_IMAGE_PATH = process.env.PUBLIC_URL + '/images/LogoPN.jpg'; 
    
    // --- INFORMATIONS DE CONTACT MISES À JOUR ---
    const whatsappNumber = '229160986656'; 
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=Bonjour,%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20projets.`;
    
    // Nouvel Email
    const email = 'gbetohopelaurg@gmail.com'; 
    
    // Lien Facebook
    const facebookLink = 'https://www.facebook.com/lesserveursdejerusalem';
    
    return (
        <main className="contact-page">
            
            {/* 1. SECTION HÉRO/BANNIÈRE (Impressionnante) */}
            <section className="contact-hero" style={{ backgroundImage: `url(${NATURE_IMAGE_PATH})` }}>
                <div className="hero-content">
                    {/* Logo PN */}
                    <img src={LOGO_IMAGE_PATH} alt="Logo PN" className="hero-logo" /> 
                    <h1>Contactez-nous</h1>
                    <p>Ensemble, construisons un avenir d'avenir pour le Bénin.</p>
                </div>
            </section>

            {/* 2. SECTION COORDONNÉES ET LIENS SOCIAUX */}
            <section className="contact-details">
                <h2>Nos Coordonnées</h2>
                
                <div className="details-list">
                    <p><strong>Téléphone :</strong> +229 1 60 98 66 56</p>
                    
                    {/* Email mis à jour */}
                    <p><strong>Email :</strong> <a href={`mailto:${email}`}>{email}</a></p>
                    
                    <p><strong>Adresse :</strong> Lot N°123, Rue de l'Espoir, Jérusalem, Bénin</p>
                </div>
                
                <div className="contact-buttons">
                    
                    {/* BOUTON FACEBOOK */}
                    <a 
                        href={facebookLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="facebook-button"
                    >
                        Visiter notre page Facebook
                    </a>
                    
                    {/* BOUTON WHATSAPP */}
                    <a 
                        href={whatsappLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="whatsapp-button"
                    >
                        <span className="whatsapp-icon">💬</span> Envoyer un message WhatsApp
                    </a>
                </div>
            </section>

            {/* 3. SECTION CARTE (Intégration Google Maps) */}
            <section className="contact-map">
                <h2>Où nous trouver</h2>
                
                <div className="maps-container"> 
                    
                    {/* Carte 1 : Dogoudo, Hêvié, Abomey-Calavi */}
                    <div className="map-card">
                        <h3>Projet Dogoudo (Hêvié)</h3>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15797.10641159987!2d2.3396555499999997!3d6.4566373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b41e8f3484f9b%3A0x6d859424726e6f04!2sH%C3%A9vi%C3%A9%20Dogoudo!5e0!3m2!1sfr!2sfr!4v1702580749000!5m2!1sfr!2sfr" 
                            width="100%" 
                            height="300" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Emplacement du projet Dogoudo"
                        ></iframe>
                    </div>
                    
                    {/* Carte 2 : Aïmevo, Godomey, Abomey-Calavi */}
                    <div className="map-card">
                        <h3>Projet Aïmevo (Godomey)</h3>
                         <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15798.243542284997!2d2.3142750500000004!3d6.4389025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b51616c68a475%3A0x937d2f3473f32420!2sA%C3%AFm%C3%A9vo%2C%20Godomey!5e0!3m2!1sfr!2sfr!4v1702580854000!5m2!1sfr!2sfr" 
                            width="100%" 
                            height="300" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Emplacement du projet Aïmevo"
                        ></iframe>
                    </div>

                </div>
            </section>
        </main>
    );
};

export default Contact;