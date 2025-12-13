// Dans src/pages/Projects.js

import React from 'react';
import '../App.css'; // Utiliser App.css pour les styles généraux des pages
import './Projets.css'; // Crée ce fichier pour les styles spécifiques aux projets

function Projects() {
    return (
        <main className="projets-page">
            <section className="hero-projets">
                <h1>Nos Projets en cours</h1>
                <p>Découvrez nos initiatives pour l'autosuffisance, la permaculture et le développement durable au Bénin. Chaque projet contribue à l'autonomie des communautés.</p>
            </section>

            {/* Zone où les projets individuels seront listés */}
            <div className="projects-list">
                {/* 1. Projet Autosuffisance Alimentaire */}
                <div className="project-card">
                    <h2>🌱 Autosuffisance Alimentaire</h2>
                    <p>Mise en place de techniques agricoles modernes et écologiques pour assurer la production locale de denrées vitales, réduisant ainsi la dépendance extérieure.</p>
                    {/* Placeholder pour une image ou un lien vers les détails */}
                    <button className="btn-primary">Voir les détails</button>
                </div>

                {/* 2. Projet Permaculture */}
                <div className="project-card">
                    <h2>♻️ Systèmes de Permaculture</h2>
                    <p>Développement de jardins et de fermes basées sur les principes de la permaculture, garantissant des écosystèmes productifs, résilients et à faible entretien.</p>
                    <button className="btn-primary">Voir les détails</button>
                </div>

                {/* 3. Projet Recyclage et Gestion des Déchets */}
                <div className="project-card">
                    <h2>🗑️ Recyclage et Valorisation</h2>
                    <p>Initiatives de collecte et de transformation des déchets en ressources utiles (compost, matériaux de construction), favorisant une économie circulaire locale.</p>
                    <button className="btn-primary">Voir les détails</button>
                </div>
            </div>
        </main>
    );
}

export default Projects;