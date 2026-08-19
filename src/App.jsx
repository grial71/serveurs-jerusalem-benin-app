import React, { useEffect, useMemo, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL || "/";
const asset = (path) => `${BASE}${path.replace(/^\/+/, "")}`;

const NAV = [
  ["interview", "Interview"],
  ["evolution", "Évolution"],
  ["expertise", "Expertise"],
  ["volailles", "Volailles"],
  ["gari", "Gari"],
  ["vision", "Vision"],
  ["partenaires", "Partenaires"],
  ["decouvrir-benin", "Découvrir le Bénin"],
  ["agrotourisme", "Agrotourisme"],
  ["contact", "Contact"],
];

const projects = [
  { icon: "🌱", title: "Agriculture & maraîchage", text: "Cultures vivrières, maraîchage et valorisation progressive du terrain." },
  { icon: "🐔", title: "Volailles en liberté", text: "Un élevage familial, évolutif et adapté aux moyens locaux." },
  { icon: "🐇", title: "Lapins", text: "Amélioration progressive des espaces, de la sécurité et du bien-être animal." },
  { icon: "🐌", title: "Escargots africains", text: "Une piste d’élevage local à forte identité régionale et potentiel commercial." },
  { icon: "🌾", title: "Manioc & gari", text: "Transformer localement pour créer davantage de valeur et limiter les pertes." },
  { icon: "🐟", title: "Aquaponie & pisciculture", text: "Projet futur : associer poissons, eau recyclée, cultures et énergie solaire." },
  { icon: "🎓", title: "Jeunesse & transmission", text: "Former par la pratique et rendre les savoir-faire accessibles et reproductibles." },
  { icon: "♻️", title: "Économie circulaire", text: "Relier cultures, élevage, compostage, transformation et revenus locaux." },
];

const evolutionPhotos = [
  ["images/evolution-poules-01.png", "Volailles sur le terrain", "Développement progressif d’un petit élevage local."],
  ["images/evolution-poules-02.png", "Premiers résultats", "Observation, reproduction et suivi naturel des volailles."],
  ["images/evolution-poules-04.png", "Alimentation naturelle", "Une logique familiale, écologique et progressive."],
  ["images/manioc-emballage-artisanal.png", "Conditionnement artisanal", "Mieux préserver, présenter et valoriser les produits transformés."],
];

const gariPhotos = [
  ["images/gari_preparation_01.png", "Râpage du manioc", "Une étape essentielle de la transformation artisanale."],
  ["images/gari_preparation_02.png", "Préparation & séchage", "Travail manuel et savoir-faire local avant la transformation finale."],
  ["images/manioc-emballage-artisanal.png", "Conditionnement", "Une présentation plus propre pour améliorer la conservation et la commercialisation."],
];

const expertise = [
  ["🌱", "Maraîchage biologique", "Cultiver avec des méthodes adaptées au sol, aux saisons et aux ressources locales."],
  ["🐓", "Élevage diversifié", "Volailles, lapins et escargots dans une logique familiale, écologique et progressive."],
  ["♻️", "Autonomie circulaire", "Relier cultures, élevage, compostage, eau, transformation et revenus locaux."],
  ["🎓", "Formation jeunesse", "Transmettre des gestes concrets et rendre les savoir-faire accessibles et reproductibles."],
  ["🚚", "Logistique locale", "Organiser collecte, conditionnement, réservations et livraison au plus près du terrain."],
  ["💡", "Innovation simple", "Tester des solutions robustes, réparables et abordables, jusqu'à l'aquaponie solaire."],
];

function useActiveSection() {
  const [active, setActive] = useState("interview");
  useEffect(() => {
    const sections = NAV.map(([id]) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.05, 0.2, 0.5] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);
  return active;
}

function App() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const onMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setMusicOn(true);
      } catch {
        setMusicOn(false);
      }
    } else {
      audio.pause();
      setMusicOn(false);
    }
  };

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 750);
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    elements.forEach((element) => observer.observe(element));
    const onPointerMove = (event) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="app-shell">
      <div className={loading ? "loader" : "loader hidden"} aria-hidden={!loading}>
        <img src={asset("images/LogoPN.jpg")} alt="" />
        <strong>LSJ Bénin</strong>
        <span>De la production à l'assiette</span>
      </div>
      <div className="custom-cursor" aria-hidden="true" />
      <div className="particles" aria-hidden="true">
        {Array.from({ length: 16 }, (_, index) => <i key={index} style={{ "--i": index }} />)}
      </div>
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <header className="site-header">
        <a className="brand" href="#interview" aria-label="Retour à l'interview">
          <img src={asset("images/LogoPN.jpg")} alt="Logo LSJ Bénin" />
          <span>
            <strong>LSJ Bénin</strong>
            <small>Les Serveurs de Jérusalem</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "main-nav open" : "main-nav"}>
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="interview" className="hero section-dark">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Première interview officielle</span>
              <h1>
                Visioconférence
                <span>France – Bénin</span>
              </h1>
              <p className="hero-lead">
                Une visioconférence consacrée à l'évolution du projet Les Serveurs de Jérusalem à
                Dogoudo / Hêvié : production agricole, élevage, transformation locale, autonomie,
                transmission des savoirs et recherche de partenariats durables.
              </p>

              <div className="topic-list" aria-label="Thèmes de l'interview">
                {["Manioc et fabrication du gari", "Élevage de lapins amélioré", "Escargots africains", "Volailles en liberté", "Aquaponie et pisciculture", "Formation et jeunesse"].map((topic) => <span key={topic}>{topic}</span>)}
              </div>

              <div className="hero-actions">
                <a className="button primary" href="https://www.youtube.com/watch?v=IoQ5yxhjBN4" target="_blank" rel="noreferrer">Voir sur YouTube</a>
                <a
                  className="button ghost"
                  href="https://wa.me/2290160986656"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contacter Jude sur WhatsApp
                </a>
              </div>
              <p className="partnership-note">LSJ est ouvert aux partenariats sérieux, aux collaborations techniques, aux réservations de productions et aux projets d'investissement durable au Bénin.</p>
            </div>

            <div className="video-card">
              <div className="video-head">
                <span className="live-dot" />
                <span>Jude Gbetoho · Responsable de LSJ Bénin</span>
              </div>
              <div className="video-wrap">
                <iframe
                  src="https://www.youtube.com/embed/IoQ5yxhjBN4?rel=0&modestbranding=1"
                  title="Visioconférence avec Jude Gbetoho — LSJ Bénin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="video-footer">
                <div>
                  <strong>Jude Gbetoho</strong>
                  <span>Responsable de LSJ</span>
                </div>
                <div>
                  <strong>Michel Quinones</strong>
                  <span>Conseiller bénévole : numérique, IA, communication et structuration de projets</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="production-strip reveal" aria-label="Présentation LSJ">
          <span>Dogoudo · Hêvié · Bénin</span>
          <h2>De la production à l'assiette</h2>
          <p>Une exploitation agroécologique à Dogoudo / Hêvié reliant agriculture, élevage, transformation du manioc, formation des jeunes et économie circulaire.</p>
        </section>

        <section id="evolution" className="section reveal">
          <SectionTitle
            kicker="Avancées de terrain"
            title="L’évolution se construit étape par étape"
            text="Des images concrètes pour suivre les progrès, documenter le travail et montrer aux partenaires une dynamique réelle."
          />
          <div className="photo-grid">
            {evolutionPhotos.map(([src, title, text]) => (
              <article className="photo-card" key={src}>
                <img src={asset(src)} alt={title} loading="lazy" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="expertise" className="section soft reveal">
          <SectionTitle
            kicker="Expertise de terrain"
            title="Produire, transformer et transmettre"
            text="Six compétences complémentaires structurent un projet utile, progressif et ancré dans les réalités locales."
          />
          <div className="project-grid">
            {expertise.map(([icon, title, text]) => (
              <article className="project-card" key={title}>
                <span className="project-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="volailles" className="section animal-focus reveal">
          <div className="split">
            <div className="media-frame">
              <img
                src={asset("images/elevage_poules_plein_air_01.png")}
                alt="Poules en plein air"
                loading="lazy"
              />
            </div>
            <div className="split-copy">
              <span className="eyebrow dark">🐔 Élevage écologique</span>
              <h2>Un élevage familial, écologique et non industriel</h2>
              <p>
                LSJ privilégie une évolution progressive : davantage d’espace, une
                meilleure séparation des zones, des installations plus propres et
                une gestion adaptée aux animaux et aux cultures.
              </p>
              <ul className="check-list">
                <li>Espaces de circulation et de repos</li>
                <li>Amélioration de l’hygiène et de la sécurité</li>
                <li>Organisation des zones élevage / cultures</li>
                <li>Utilisation de matériaux accessibles localement</li>
              </ul>
            </div>
          </div>
          <div className="animal-gallery">
            {["images/evolution-poules-01.png", "images/evolution-poules-04.png"].map((src) => <img key={src} src={asset(src)} alt="Évolution de l'élevage de volailles LSJ" loading="lazy" />)}
          </div>
        </section>

        <section id="gari" className="section soft reveal">
          <SectionTitle
            kicker="Transformation locale"
            title="Du manioc au gari"
            text="Du râpage traditionnel au séchage puis au conditionnement artisanal : transformer localement améliore la conservation et la valorisation commerciale du manioc."
          />
          <div className="photo-grid three">
            {gariPhotos.map(([src, title, text]) => (
              <article className="photo-card" key={title}>
                <img src={asset(src)} alt={title} loading="lazy" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="vision" className="section vision reveal">
          <div className="vision-panel">
            <span className="eyebrow">Notre vision</span>
            <h2>Un projet local qui peut devenir un outil de transmission</h2>
            <p>
              L'aventure LSJ Bénin est portée par la détermination de Jude Gbetoho. Inspiré par
              l'esprit Songhaï, il construit progressivement un projet agricole, éducatif et
              communautaire à Dogoudo / Hêvié.
            </p>
            <p>Avec l'accompagnement stratégique de Michel Quinones, le projet vise à relier production, formation, transformation, jeunesse et économie circulaire.</p>
            <blockquote>
              « Notre ambition est d'offrir le meilleur de la terre, de la production à l'assiette, tout en formant une génération plus autonome. »
            </blockquote>
          </div>
        </section>

        <section id="partenaires" className="section reveal">
          <SectionTitle
            kicker="Coopération"
            title="Nos Partenaires Commerçants"
            text="LSJ est ouvert aux collaborations sérieuses : expertise, matériels, formation, débouchés commerciaux, réservations de production et investissements responsables."
          />

          <div className="partner-grid">
            <article className="partner-card featured">
              <img src={asset("images/logo-saveurs-nad.png")} alt="Les Saveurs de Nad" />
              <div>
                <span className="badge">Partenaire local</span>
                <h3>Les Saveurs de Nad</h3>
                <p>
                  Cuisine béninoise, produits frais, plats à emporter et services
                  traiteur. Un exemple de lien entre production locale et valorisation culinaire.
                </p>
                <div className="tag-list"><span>Cuisine béninoise</span><span>Produits frais</span><span>Traiteur</span><span>Événements</span></div>
                <a className="text-link" href="https://wa.me/2290160986656" target="_blank" rel="noreferrer">Contacter le partenaire →</a>
              </div>
            </article>

            <article className="partner-card callout">
              <div className="partner-symbol">🤝</div>
              <div>
                <span className="badge">Ouvert aux propositions</span>
                <h3>Vous souhaitez participer ?</h3>
                <p>
                  Entreprise, association, technicien, agriculteur, investisseur ou
                  partenaire international : échangeons directement avec Jude.
                </p>
                <a
                  className="button primary compact"
                  href="https://wa.me/2290160986656"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contacter Jude
                </a>
              </div>
            </article>
          </div>
        </section>

        <section id="decouvrir-benin" className="section discover-benin reveal">
          <div className="discover-benin-grid">
            <div className="discover-benin-copy">
              <span className="eyebrow">🇧🇯 Destination Bénin</span>
              <h2>Découvrir le Bénin</h2>
              <p>
                Cette vidéo permet aux visiteurs et aux futurs partenaires de mieux
                découvrir le Bénin, son environnement, sa culture, ses paysages et le
                contexte dans lequel se développent les projets de LSJ.
              </p>
              <a
                className="button ghost"
                href="https://www.youtube.com/watch?v=7hvqxD8VZf0&t=29s"
                target="_blank"
                rel="noreferrer"
              >
                Voir la vidéo sur YouTube
              </a>
            </div>
            <div className="video-card benin-video-card">
              <div className="video-head">
                <span className="live-dot benin-dot" />
                <span>Le Bénin en images</span>
              </div>
              <div className="video-wrap">
                <iframe
                  src="https://www.youtube.com/embed/7hvqxD8VZf0?start=29&rel=0&modestbranding=1"
                  title="Découvrir le Bénin — environnement, culture et paysages"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="agrotourisme" className="section soft reveal">
          <SectionTitle kicker="Agrotourisme" title="Immersion à Hêvié" text="Découvrir un lieu vivant où production, apprentissage et transmission se rencontrent au quotidien." />
          <div className="tourism-grid">
            <div className="tourism-copy">
              <h3>Une expérience ancrée dans le territoire</h3>
              <p>LSJ souhaite accueillir visiteurs, jeunes, partenaires et curieux dans un espace de découverte, d'apprentissage, de production et de transmission.</p>
              <div className="tag-list large"><span>Découverte</span><span>Apprentissage</span><span>Production</span><span>Transmission</span></div>
            </div>
            <iframe title="Localisation de Hêvié, Abomey-Calavi" src="https://www.openstreetmap.org/export/embed.html?bbox=2.21%2C6.43%2C2.39%2C6.56&amp;layer=mapnik" loading="lazy" />
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-card">
            <div>
              <span className="eyebrow">Contact LSJ</span>
              <h2>Parlons du projet</h2>
              <p>Dogoudo, Hêvié, Abomey-Calavi, Bénin</p>
            </div>
            <div className="contact-links">
              <a href="tel:+2290160986656">📞 +229 01 60 98 66 56</a>
              <a href="mailto:gbetohopelaurg@gmail.com">✉️ gbetohopelaurg@gmail.com</a>
              <a href="https://wa.me/2290160986656" target="_blank" rel="noreferrer">💬 WhatsApp</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <img src={asset("images/LogoPN.jpg")} alt="" />
          <div>
            <strong>LSJ Bénin</strong>
            <span>Les Serveurs de Jérusalem</span>
          </div>
        </div>
        <p>© 2026 LSJ Bénin · Agriculture · Élevage · Transformation · Jeunesse</p>
      </footer>

      <button className="music-button" onClick={onMusic} aria-label="Activer ou couper la musique">
        {musicOn ? "♫ ON" : "♫ OFF"}
      </button>
      <audio ref={audioRef} loop preload="none">
        <source src={asset("audio/afro-background-01.mp3")} type="audio/mpeg" />
      </audio>
      <div className="floating-socials">
        <a className="social whatsapp" href="https://wa.me/2290160986656" target="_blank" rel="noreferrer" aria-label="Contacter LSJ sur WhatsApp">WhatsApp</a>
        <a className="social tiktok" href="https://www.tiktok.com/search?q=LSJ%20B%C3%A9nin" target="_blank" rel="noreferrer" aria-label="Rechercher LSJ Bénin sur TikTok">TikTok</a>
      </div>
    </div>
  );
}

function SectionTitle({ kicker, title, text }) {
  return (
    <div className="section-title">
      <span className="eyebrow dark">{kicker}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export default App;
