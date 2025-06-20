import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from './data';
import ProjectDetailModal from './ProjectDetailModal';
import './AllProjects.css';
import ProjectCard from './card'; // Assurez-vous que le nom du fichier est correct

interface AllProjectsProps {
  onClose: () => void;
  onProjectSelect?: (projectId: number) => void;
}

const AllProjects = ({ onClose }: AllProjectsProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

        const scrollToTop = () => {
        const allProjectsContainer = document.querySelector('.all-projects-container');
        if (allProjectsContainer) {
          allProjectsContainer.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      };

   const handleProjectClick = (projectId: number) => {
      setSelectedProjectId(projectId);
      
      // Force le scroll après le rendu du modal
      setTimeout(() => {
        const modal = document.querySelector('.project-detail-overlay');
        if (modal) {
          modal.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 10);
    };

  return (
    <motion.div 
      className="all-projects-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
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
          {projects.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project.id)}
            />
          ))}
        </div>

        <div className="back-button-container">
          <motion.button 
            className="back-button"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Retour à la section Projets
          </motion.button>
        </div>
      </motion.div>

      {selectedProjectId && (
        <ProjectDetailModal 
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
          projects={projects}
        />
      )}

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