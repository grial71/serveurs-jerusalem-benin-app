import React from 'react';

// Code couleur principal de Facebook: #0866FF
const PRIMARY_COLOR = '#0866FF'; 
// Code couleur gris clair pour le fond (similaire à Facebook)
const LIGHT_GRAY = '#F0F2F5'; 
// Code couleur pour les lignes de séparation (Divider)
const DIVIDER_COLOR = '#D0D3D7'; 
// Code couleur pour le texte de lien ou de droit d'auteur (Blue Link)
const LINK_COLOR = '#0064D1'; 

const Footer = () => {
  return (
    <footer style={{ 
      textAlign: 'center', 
      padding: '20px', 
      backgroundColor: LIGHT_GRAY, 
      
      // J'ai mis la couleur du texte de fond par défaut en gris foncé standard,
      // puis j'ai appliqué la couleur de lien à la balise <p> si tu veux qu'elle soit bleue.
      // Si tu veux que tout le texte soit bleu, laisse "color: PRIMARY_COLOR" (ton original).
      color: '#444950', // Couleur de texte FB standard (fds-button-text)

      borderTop: `1px solid ${DIVIDER_COLOR}`,
      marginTop: '50px',
      // Les styles de positionnement ne sont pas nécessaires pour l'instant si l'application s'affiche déjà.
      // Si tu veux absolument qu'il soit fixé en bas, remplace les 3 lignes commentées par celles-ci :
      // position: 'fixed', 
      // bottom: 0, 
      // width: '100%',
      boxSizing: 'border-box'
    }}>
      <p style={{ color: LINK_COLOR, margin: 0 }}>
        &copy; {new Date().getFullYear()} Les Serveurs de Jérusalem au Bénin. Tous droits réservés.
      </p>
    </footer>
  );
};

export default Footer;