import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectsData from '../data/projects.json';

const PaperView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = projectsData.projects.find(p => p.slug === slug);

  if (!project || !project.pdf) {
    return (
      <section className="paper-not-found">
        <h2>Paper not found</h2>
        <p>The paper you're looking for doesn't exist or has been moved.</p>
        <button onClick={() => navigate('/projects')} className="intro-btn">
          Back to Projects
        </button>
      </section>
    );
  }

  return (
    <section className="paper-view">
      <div className="paper-header">
        <button onClick={() => navigate('/projects')} className="paper-back-btn">
          ← Back to Projects
        </button>
        <h2>{project.title}</h2>
        <div className="paper-meta">
          <div className="project-tech">
            {project.tags.map((tag, i) => (
              <span key={i} className="tech-tag">{tag}</span>
            ))}
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="intro-btn" style={{ marginTop: '0.75rem', display: 'inline-flex' }}>
              🌐 Visit Dashboard
            </a>
          )}
        </div>
      </div>
      <div className="paper-embed">
        <iframe src={project.pdf} title={project.title} className="paper-iframe" />
      </div>
    </section>
  );
};

export default PaperView;
