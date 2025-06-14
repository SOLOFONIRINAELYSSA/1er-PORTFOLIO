import { motion, AnimatePresence } from 'framer-motion';
import { Project } from './types';
import './ProjectDetailModal.css';
import  { useEffect } from 'react';

interface ProjectDetailModalProps {
  projectId: number;
  onClose: () => void;
  projects: Project[];
}

const ProjectDetailModal = ({ projectId, onClose, projects }: ProjectDetailModalProps) => {
  const project = projects.find(p => p.id === projectId);

   useEffect(() => {
        // Fait remonter le modal en haut quand il s'ouvre
        const modal = document.querySelector('.project-detail-overlay');
        if (modal) {
            modal.scrollTo({ top: 0, behavior: 'instant' });
        }
        }, [projectId]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div 
          className="project-detail-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div 
            className="project-detail-container"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 100 }}
            onClick={(e) => e.stopPropagation()}
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

            <div className="project-detail-content">
              <div className="project-detail-left">
                <div className="project-detail-image">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                  />
                </div>
                <div className="project-tech-stack">
                  <h4>Technologies utilisées</h4>
                  <div className="tech-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="project-detail-right">
                <h3>{project.title}</h3>
                <div className="project-description">
                  <p>{project.detailDescription || project.description}</p>
                </div>
                
                {project.features && project.features.length > 0 && (
                  <div className="project-features">
                    <h4>Fonctionnalités</h4>
                    <ul>
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="project-links">
                  {project.demoUrl && (
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="demo-link"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Voir le projet en ligne <span aria-hidden="true">↗</span>
                    </motion.a>
                  )}
                  
                  {project.codeUrl && (
                    <motion.a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="code-link"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Voir le code source <span aria-hidden="true">↗</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;