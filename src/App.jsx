import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import MusicPlayer from './components/MusicPlayer';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <LanguageProvider>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="app">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
          <MusicPlayer />
          <ScrollToTop />
        </div>
      )}
    </LanguageProvider>
  );
}

export default App;


