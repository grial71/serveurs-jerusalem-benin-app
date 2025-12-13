// Dans src/pages/APropos.js

import React from 'react';

function APropos() {
    return (
        <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
            
            <header style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h1 style={{ color: '#0866FF', fontSize: '32px', marginBottom: '10px' }}>
                    À Propos de nos Projets
                </h1>
                <p style={{ color: '#555' }}>
                    Notre mission et les initiatives soutenues par l'association LSJ Bénin.
                </p>
            </header>

            <section style={{ border: '1px solid #D0D3D7', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
                
                {/* Titre de la section Projet Jude */}
                <h2 style={{ color: '#1E4032', marginBottom: '20px', borderBottom: '2px solid #D0D3D7', paddingBottom: '10px' }}>
                    🌱 Projets agricoles de Jude – Godomey & Hêvié (Bénin)
                </h2>
                
                {/* Introduction */}
                <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                    Les projets agricoles portés par **Jude Pelaurg Gbetoho**, jeune agriculteur engagé au Bénin, incarnent une vision locale, durable et solidaire de l’agriculture.
                </p>
                <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                    Avec son père, Jude développe deux espaces agricoles complémentaires situés dans les quartiers de Dogoudo (Godomey) et Aïmevo (Hêvié), tous deux dans la commune d’Abomey-Calavi. Leur objectif est de transformer ces terrains familiaux en zones de production agroécologique, accessibles et pédagogiques.
                </p>
                
                {/* Liste des intégrations */}
                <h3 style={{ color: '#0866FF', marginTop: '30px', marginBottom: '15px' }}>
                    Ces projets intègrent :
                </h3>
                <ul style={{ listStyleType: 'none', paddingLeft: '20px', marginBottom: '30px' }}>
                    <li style={{ marginBottom: '10px' }}>🌿 La culture maraîchère (tomates, laitues, carottes, piments doux, concombres…)</li>
                    <li style={{ marginBottom: '10px' }}>🪴 La culture en poches et hors sol pour une meilleure gestion de l’espace</li>
                    <li style={{ marginBottom: '10px' }}>🐇 L’élevage de lapins et de volailles locales (poulets Goliath, pintades, cailles…)</li>
                    <li style={{ marginBottom: '10px' }}>♻️ Une approche circulaire et organique : recyclage, compost, autonomie locale</li>
                </ul>

                {/* Ambition et soutien */}
                <p style={{ marginBottom: '20px', lineHeight: '1.6', fontWeight: 'bold' }}>
                    L’ambition de Jude est de transmettre son savoir-faire, sensibiliser les jeunes à l’agriculture responsable, et poser les bases d’une micro-ferme modèle dans chaque quartier.
                </p>
                <p style={{ marginBottom: '30px', lineHeight: '1.6' }}>
                    Ces initiatives sont soutenues par l’association LSJ Bénin, dans un esprit de fraternité, de coopération et de développement durable.
                </p>

                {/* Contact */}
                <div style={{ padding: '15px', borderTop: '1px dashed #D0D3D7' }}>
                    <h3 style={{ color: '#1C1E21', marginBottom: '10px' }}>
                        Contacter Jude Gbetoho :
                    </h3>
                    <p style={{ marginBottom: '5px' }}>
                        📞 Contact WhatsApp : <a href="https://wa.me/2290160986656" target="_blank" rel="noopener noreferrer" style={{ color: '#00A400', textDecoration: 'none' }}>+229 016 098 6656</a>
                    </p>
                    <p>
                        📩 Email : <a href="mailto:gbetohopelaurg@gmail.com" style={{ color: '#0866FF', textDecoration: 'none' }}>gbetohopelaurg@gmail.com</a>
                    </p>
                </div>
            </section>
            
            {/* Si tu veux ajouter une image de ferme ici, on peut l'intégrer plus tard */}
            
        </main>
    );
}

export default APropos;