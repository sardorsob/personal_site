import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import lebronImage from '../assets/images/lebron.jpg';

const Hero = () => {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/resume') {
      setShowResumeModal(true);
    }
  }, [location.pathname]);

  const closeResumeModal = () => {
    setShowResumeModal(false);
    if (location.pathname === '/resume') {
      navigate('/');
    }
  };

  return (
    <section className="hero">
      <motion.div
        style={{ width: 420, height: 420, top: '-8%', right: '-4%', background: 'rgba(59,130,246,0.15)', borderRadius: '50%', filter: 'blur(70px)', position: 'absolute', pointerEvents: 'none' }}
        animate={{ x: [0, 28, 0], y: [0, -18, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 11, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        style={{ width: 320, height: 320, bottom: '4%', left: '-4%', background: 'rgba(30,64,175,0.18)', borderRadius: '50%', filter: 'blur(60px)', position: 'absolute', pointerEvents: 'none' }}
        animate={{ x: [0, -18, 0], y: [0, 22, 0], scale: [1, 0.92, 1] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        style={{ width: 260, height: 260, top: '38%', right: '22%', background: 'rgba(102,126,234,0.12)', borderRadius: '50%', filter: 'blur(50px)', position: 'absolute', pointerEvents: 'none' }}
        animate={{ x: [0, 14, -10, 0], y: [0, -14, 10, 0], scale: [1, 1.06, 0.94, 1] }}
        transition={{ duration: 17, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />

      <div className="hero-content">
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <img src={lebronImage} alt="Sardor Sobirov" />
          <div className="hero-social-icons">
            <a href="https://github.com/sardorsob" target="_blank" rel="noopener noreferrer" className="hero-social-btn" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://x.com/sardor_sob" target="_blank" rel="noopener noreferrer" className="hero-social-btn" aria-label="X">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.kaggle.com/sardorbsobirov" target="_blank" rel="noopener noreferrer" className="hero-social-btn" aria-label="Kaggle">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/sardor-sobirov" target="_blank" rel="noopener noreferrer" className="hero-social-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
        >
          <h1>Hi, I'm Sardor</h1>
          <p>Full-Stack Developer & Data Scientist</p>
          <div className="hero-summary">
            <p>I'm a CS student at UCSD interested in Bayesian statistics and geospatial analysis. I build probabilistic models that quantify uncertainty rather than hide it, using tools like PyMC, hierarchical models, and spatial priors to answer questions that point estimates can't.</p>
            <p>On the GIS side, I work with spatial data at scale, from census-tract-level transit accessibility to county-wide wildfire anomaly detection, combining tools like QGIS, MapLibre-GL, and D3 to turn geographic complexity into interactive, interpretable dashboards.</p>
          </div>
          <motion.button
            type="button"
            onClick={() => navigate('/resume')}
            className="download-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            📄 See Resume
          </motion.button>
        </motion.div>
      </div>

      {showResumeModal && (
        <div className="certificate-modal" onClick={closeResumeModal}>
          <div className="certificate-content pdf-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeResumeModal}>×</button>
            <iframe
              src="/Sardor_DS_Resume.pdf"
              title="Resume"
              className="pdf-viewer"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
