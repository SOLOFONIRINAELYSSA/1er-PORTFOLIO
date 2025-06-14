import { motion } from 'framer-motion';
import { Project } from './types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const card = ({ project, onClick }: ProjectCardProps) => {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      onClick={onClick}
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
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          aria-label={`Voir le projet ${project.title}`}
        >
          Voir le projet <span aria-hidden="true">→</span>
        </motion.a>
        {project.codeUrl && (
          <motion.a 
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Code source du projet ${project.title}`}
          >
            Code source <span aria-hidden="true">↗</span>
          </motion.a>
        )}
      </div>
    </motion.article>
  );
};

export default card;