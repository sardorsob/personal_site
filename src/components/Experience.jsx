import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const experiences = [
    {
      title: "Research and Development Capstone",
      company: "Cotality + HDSI",
      period: "Sep 2025 - Mar 2026",
      location: "San Diego, CA",
      bullets: [
        "Built a React/TypeScript geospatial dashboard using MapLibre GL, D3.js, Vite, and Tailwind CSS for Cotality's data science team to compare county-level property-characteristic distributions across California.",
        "Used BigQuery GIS, SQL, H3 spatial indexing, spatial joins, buffers, and centroid-based geometry processing to prepare property and land-cover data for county-level anomaly detection.",
        "Applied empirical Bayes shrinkage, Jensen-Shannon divergence, Moran's I, and classifier two-sample testing to help distinguish true property-data anomalies from sparse-data noise and county-level naming inconsistencies.",
        "Delivered a dashboard MVP that helped Cotality data scientists investigate property-data discrepancies more efficiently and supported their internal workflow for wildfire risk and property intelligence review."
      ]
    },
    {
      title: "Data Engineer Intern",
      company: "Apptics.ai",
      period: "June 2025 - Sep 2025",
      location: "Walnut Creek, CA",
      bullets: [
        "Built a reproducible Python ETL pipeline ingesting daily paid media data from the Meta Ads API into PostgreSQL for 5 DTC brands, consolidating 1K-10K daily spend records per brand into a single source of truth that replaced fragmented manual CSV exports.",
        "Designed an analytics-ready relational schema at the campaign/ad set/ad level and standardized 25+ marketing KPIs using SQL and Power BI, enabling consistent cross-brand performance comparisons that previously required manual reconciliation each reporting cycle.",
        "Ran A/B tests on Meta ad creatives using Python and Tableau to surface statistically significant differences in click and conversion rates; translated findings into plain-language recommendations for non-technical marketing teams, contributing to a 35% improvement in acquisition efficiency."
      ]
    },
    {
      title: "Research and Development Intern",
      company: "United States Department of Defense (DoD)",
      period: "Sep 2024 - Dec 2024",
      location: "La Jolla, CA",
      bullets: [
        "Conducted 50+ stakeholder interviews using Lean LaunchPad methodology to surface ambiguous operational needs, then mapped findings to a prioritized product roadmap, ensuring R&D investments were tied to concrete use cases rather than theoretical capability gaps.",
        "Designed a portfolio analytics dashboard in Excel and Power BI that mapped technology maturity signals to DoD use cases; presented to cross-functional leadership to inform multi-million dollar R&D transition decisions.",
        "Collaborated with engineers, program managers, and procurement teams to evaluate emerging dual-use technologies and accelerate the transition of R&D projects into market-ready national security solutions."
      ]
    },
    {
      title: "Web Developer Consultant",
      company: "Cornerstone Community Consultants (CCC)",
      period: "March 2022 - Sep 2024",
      location: "La Jolla, CA",
      bullets: [
        "Built responsive React/Bootstrap UI components for 5+ nonprofit and SMB client sites, replacing static HTML layouts to improve mobile navigation clarity and reduce drop-off on key intake flows.",
        "Translated Figma wireframes into production-ready UI using SCSS design tokens and a standardized component library, cutting per-client iteration time by ~20% across engagements by eliminating repeated style decisions.",
        "Integrated CRM form flows and contact endpoints into client sites, enabling organizations to replace email-based intake with structured web submissions tied directly to their existing tooling."
      ]
    },
    {
      title: "Undergraduate Research IT Assistant",
      company: "Ross Lab UCSD Health",
      period: "Sep 2022 - Sep 2024",
      location: "La Jolla, CA",
      bullets: [
        "Maintained secure data pipelines for active biology research, implementing automated backup protocols and access controls to protect experiment integrity across ongoing studies.",
        "Managed and troubleshot bioinformatics software including PYRAT, diagnosing environment and dependency issues to keep researcher analysis workflows running without disruption.",
        "Performed routine performance tuning and OS/software updates on lab workstations, ensuring consistent uptime during high-throughput data collection and sequencing analysis periods."
      ]
    }
  ];

  const toggleExpanded = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 768;

  return (
    <section id="experience" className="experience">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </motion.h2>
      <div className="experience-timeline">
        <motion.div
          className="timeline-line"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className={`experience-item ${index % 2 === 0 ? 'left' : 'right'}`}
            initial={{ opacity: 0, x: isDesktop ? (index % 2 === 0 ? -50 : 50) : 0, y: isDesktop ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
          >
            <motion.div
              className="timeline-dot"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
            />
            <div className="experience-content">
              <div className="experience-header">
                <h3>{exp.title}</h3>
                <div className="experience-meta">
                  <span className="company">{exp.company}</span>
                  <span className="location">{exp.location}</span>
                  <span className="period">{exp.period}</span>
                </div>
              </div>
              <div className="experience-description">
                <ul className={`experience-bullets ${expandedItems[index] ? 'expanded' : 'collapsed'}`}>
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
                <button
                  className="expand-button"
                  onClick={() => toggleExpanded(index)}
                >
                  {expandedItems[index] ? 'Show Less' : 'Show More'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
