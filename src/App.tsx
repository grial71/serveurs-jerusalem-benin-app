import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Film from "./components/Film";
import Ecosystem from "./components/Ecosystem";
import Stats from "./components/Stats";
import Journal from "./components/Journal";
import Manifesto from "./components/Manifesto";
import Footer from "./components/Footer";
import { Cursor, GlowField } from "./components/Cursor";

/**
 * TERRA·07 — Réserve naturelle de Valbrune
 * Expérience immersive multi-couches : rideau d'ouverture, curseur sur mesure,
 * halo lumineux suivant la souris, parallaxe, révélations masquées, textes à
 * décodage, lecteur de film complet, rubans défilants, journal de terrain,
 * compteurs animés et ambiance sonore synthétisée en WebAudio.
 */
export default function App() {
  return (
    <div className="grain relative min-h-screen bg-night text-mist font-sans overflow-x-clip">
      <Preloader />
      <Cursor />
      <GlowField />
      <Nav />

      <main className="relative z-[1]">
        <Hero />
        <Marquee />
        <Film />
        <Ecosystem />
        <Stats />
        <Journal />
        <Manifesto />
      </main>

      <Footer />
    </div>
  );
}
