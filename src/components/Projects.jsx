import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import projectsData from '../data/projects.json';

const filterCategories = [
  { label: 'All', match: null },
  { label: 'Bayesian', match: 'bayesian' },
  { label: 'Geospatial', match: 'geospatial' },
  { label: 'Spatial', match: 'spatial' },
  { label: 'Time Series', match: 'time series' },
  { label: 'Visualization', match: 'visualization' },
  { label: 'Machine Learning', match: 'machine learning' },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  useEffect(() => {
    setProjects(projectsData.projects.filter(p => !p.hidden));
  }, []);

  const filteredProjects = selectedFilter
    ? projects.filter(p => p.tags.some(t => t.toLowerCase().includes(selectedFilter)))
    : projects;

  return (
    <section id="projects" className="projects">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h2>

      <motion.div
        className="tag-filter-bar"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {filterCategories.map((cat) => (
          <button
            key={cat.label}
            className={`tag-pill ${selectedFilter === cat.match ? 'active' : ''}`}
            onClick={() => setSelectedFilter(cat.match)}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      <div className="projects-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
