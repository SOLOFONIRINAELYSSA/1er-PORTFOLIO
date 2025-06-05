import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from './data';
import './AllProjects.css';

const AllProjects = ({ onClose }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

   const scrollToTop = () => {
    const container = document.querySelector('.all-projects-container');
    container.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleBackToProjects = () => {
    onClose(); // Ferme le modal
    // Scroll vers la section projets après un léger délai
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <motion.div 
      className="all-projects-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Bouton fermeture en haut à droite */}
      <motion.button 
        className="close-button"
        onClick={onClose}
        aria-label="Fermer"
        whileHover={{ rotate: 90, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        &times;
      </motion.button>

      <motion.div 
        className="all-projects-container"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <h2 className="section-title">
          <span className="title-number">Tous mes</span> Projets
        </h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={`project-${index}`}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-overlay">
                  <div className="overlay-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="project-links">
                <motion.a 
                  href="#"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Voir le projet <span aria-hidden="true">→</span>
                </motion.a>
                <motion.a 
                  href="#"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Code source <span aria-hidden="true">↗</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bouton retour en bas de la liste */}
        <div className="back-button-container">
         <motion.button 
              className="back-button"
              onClick={handleBackToProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retour à la section Projets
            </motion.button>
        </div>
      </motion.div>

    {/* Bouton retour en haut fixe */}
      <motion.button 
        className={`scroll-top-button ${isScrolled ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Retour en haut"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ↑
      </motion.button>
    </motion.div>
  );
};

export default AllProjects;