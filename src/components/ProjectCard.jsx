import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const isResearch = project.section === 'research';

  return (
    <motion.div
      className={`project-card${isResearch ? ' project-card--repository' : ''}`}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      {project.screenshot && (
        <div className="project-image-container">
          <img
            src={project.screenshot}
            alt={`${project.title} application screenshot`}
            className="project-image"
          />
        </div>
      )}
      <div className="project-content">
        <div className="project-card-meta">
          <span>{isResearch ? 'Research repository' : project.year}</span>
          {isResearch && <FaGithub aria-hidden="true" />}
        </div>
        <h4>{project.title}</h4>
        <p className="project-summary">{project.summary || project.description}</p>
        {!isResearch && (
          <>
            <div className="project-tech project-preview-tags">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </div>
            {project.summary && (
              <details className="project-details">
                <summary>More details</summary>
                <p>{project.description}</p>
                {project.tags.length > 3 && (
                  <div className="project-tech">
                    {project.tags.slice(3).map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </details>
            )}
          </>
        )}
        <div className="project-links">
          {project.pdf && project.slug && (
            <a href={`/papers/${project.slug}`} onClick={(event) => {
              if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                navigate(`/papers/${project.slug}`);
              }
            }} className="project-link">
              <FaFileAlt aria-hidden="true" /> Paper
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
              <FaExternalLinkAlt aria-hidden="true" /> Visit Site
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
              <FaGithub aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
