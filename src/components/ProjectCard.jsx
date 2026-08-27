import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="project-card"
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(59,130,246,0.2)' }}
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
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tech">
          {project.tags.map((tag, index) => (
            <span key={index} className="tech-tag">{tag}</span>
          ))}
        </div>
        <div className="project-links">
          {project.pdf && project.slug && (
            <a onClick={() => navigate(`/papers/${project.slug}`)} className="project-link">
              📄 View Paper
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
              🌐 Visit Site
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
