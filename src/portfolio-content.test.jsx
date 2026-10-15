import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import Projects from './components/Projects';
import { renderToStaticMarkup } from 'react-dom/server';
import Experience from './components/Experience';
import ProjectCard from './components/ProjectCard';
import projectsData from './data/projects.json';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn()
}), { virtual: true });

jest.mock('framer-motion', () => {
  const React = require('react');
  const motionProps = new Set([
    'animate', 'exit', 'initial', 'layout', 'transition', 'viewport', 'whileHover', 'whileInView'
  ]);

  return {
    AnimatePresence: ({ children }) => children,
    motion: new Proxy({}, {
      get: (_, tag) => ({ children, ...props }) => {
        const domProps = Object.fromEntries(
          Object.entries(props).filter(([name]) => !motionProps.has(name))
        );
        return React.createElement(tag, domProps, children);
      }
    })
  };
});

const render = (element) => {
  document.body.innerHTML = renderToStaticMarkup(element);
  return document.body;
};

afterEach(() => {
  document.body.innerHTML = '';
});

test('includes the completed Pacific Dataviz Challenge: Water & Energy project', () => {
  const project = projectsData.projects.find(
    ({ title }) => title === 'Pacific Dataviz Challenge: Water & Energy'
  );

  expect(project).toEqual(expect.objectContaining({
    year: '2026',
    link: 'https://pacific-climate-gap-atlas-app.vercel.app/?view=overview',
    github: 'https://github.com/sardorsob/Pacific-Resource-Map'
  }));
  expect(project).not.toHaveProperty('screenshot');
});

test('orders active projects and gives each one its GitHub repository', () => {
  const visibleProjects = projectsData.projects.filter(({ hidden }) => !hidden);
  const visibleTitles = visibleProjects.map(({ title }) => title);

  expect(visibleTitles).toEqual([
    'Reading the Corn Belt',
    'Wildfire Property Intelligence',
    'Probabilistic Hurricane Track Forecasting',
    'Pacific Dataviz Challenge: Water & Energy',
    'PacificVis 2027: Tsunami Timing',
    'Uncertain Transit Access',
    'Neural Regime Shift',
    'Mount Rainier Fluvial Seismology'
  ]);
  expect(Object.fromEntries(
    visibleProjects.map(({ title, github }) => [title, github])
  )).toEqual({
    'Reading the Corn Belt': 'https://github.com/sardorsob/Nafsi-Corn-Belt-Modeling',
    'Wildfire Property Intelligence': 'https://github.com/sardorsob/Wildfire-Property-Intelligence',
    'Probabilistic Hurricane Track Forecasting': 'https://github.com/sardorsob/Probabilistic-Storm-Tracks',
    'Pacific Dataviz Challenge: Water & Energy': 'https://github.com/sardorsob/Pacific-Resource-Map',
    'PacificVis 2027: Tsunami Timing': 'https://github.com/sardorsob/PacificVis-Tsunami-Warning',
    'Uncertain Transit Access': 'https://github.com/sardorsob/Uncertain-Transit-Access',
    'Neural Regime Shift': 'https://github.com/sardorsob/Neural-Regime-Shift',
    'Mount Rainier Fluvial Seismology': 'https://github.com/sardorsob/Mora-Fluvial-Analysis'
  });
  expect(projectsData.projects.every(
    (project) => !('screenshot' in project) && !('image' in project)
  )).toBe(true);
});

test('renders the project GitHub link with its icon', () => {
  const project = {
    title: 'Pacific Dataviz Challenge: Water & Energy',
    description: 'A concise project description.',
    tags: ['Climate Data'],
    link: 'https://pacific-climate-gap-atlas-app.vercel.app/?view=overview',
    github: 'https://github.com/sardorsob/Pacific-Resource-Map'
  };

  const page = render(<ProjectCard project={project} />);
  const githubLink = page.querySelector(`a[href="${project.github}"]`);

  expect(page.querySelector('img')).toBeNull();
  expect(page.querySelector(`a[href="${project.link}"]`)).not.toBeNull();
  expect(githubLink).not.toBeNull();
  expect(githubLink?.querySelector('svg')).not.toBeNull();
  expect(githubLink?.textContent).toContain('GitHub');
});

test('keeps project summaries compact with full details and real paper links available', () => {
  const project = {
    title: 'A modeling project',
    summary: 'A brief overview.',
    description: 'The complete methodology and results.',
    tags: ['Python', 'Bayesian', 'Spatial', 'Remote Sensing'],
    slug: 'modeling-project',
    pdf: '/modeling-project.pdf',
    github: 'https://github.com/example/modeling'
  };
  const page = render(<ProjectCard project={project} />);

  expect(page.querySelector('.project-summary')?.textContent).toBe(project.summary);
  expect(page.querySelectorAll('.project-preview-tags .tech-tag')).toHaveLength(3);
  expect(page.querySelector('details')?.hasAttribute('open')).toBe(false);
  expect(page.querySelector('details p')?.textContent).toBe(project.description);
  expect(page.querySelector('details')?.textContent).toContain('Remote Sensing');
  expect(page.querySelector('a[href="/papers/modeling-project"]')).not.toBeNull();
});

test('presents Mora as a single research repository box', () => {
  const page = render(<Projects />);
  const research = page.querySelector('[aria-labelledby="projects-research"]');
  expect(research.querySelectorAll('.project-card')).toHaveLength(1);
  expect(research.querySelector('h4')?.textContent).toBe('Mount Rainier Fluvial Seismology');
  expect(research.querySelectorAll('a')).toHaveLength(1);
  expect(research.querySelector('a')?.href).toBe('https://github.com/sardorsob/Mora-Fluvial-Analysis');
  expect(research.querySelector('details')).toBeNull();
  expect(research.querySelector('.project-summary')?.textContent).toContain('Mount Rainier');
});

test('lists the Mount Rainier geohazard data science role', () => {
  const page = render(<Experience />);
  const heading = [...page.querySelectorAll('h3')].find(
    (element) => element.textContent === 'Geohazard Data Science Intern'
  );
  const entry = heading?.closest('.experience-item');

  expect(entry?.querySelector('.company')?.textContent).toBe(
    'U.S. Department of the Interior — National Park Service'
  );
  expect(entry?.querySelector('.location')?.textContent).toBe(
    'Mount Rainier National Park, Longmire, WA'
  );
  expect(entry?.querySelector('.period')?.textContent).toBe('Sep 2026 - Jun 2027');
  expect(entry?.querySelectorAll('.experience-bullets li')).toHaveLength(3);
});


test('groups visible project cards under their portfolio sections', () => {
  const page = render(<Projects />);
  const groups = [...page.querySelectorAll('.project-group')];

  expect(groups.map(group => group.querySelector('h3')?.textContent)).toEqual([
    'Probabilistic Modeling', 'Maps & Visual Stories', 'Research'
  ]);
  expect(groups.map(group => [...group.querySelectorAll('.project-card h4')]
    .map(heading => heading.textContent))).toEqual([
    ['Reading the Corn Belt', 'Wildfire Property Intelligence',
      'Probabilistic Hurricane Track Forecasting', 'Neural Regime Shift'],
    ['Pacific Dataviz Challenge: Water & Energy', 'PacificVis 2027: Tsunami Timing', 'Uncertain Transit Access'],
    ['Mount Rainier Fluvial Seismology']
  ]);
  expect(page.textContent).not.toContain('Chronic Kidney Disease Prediction');
  const research = groups[2];
  expect(research.querySelector('a')?.href).toBe(
    'https://github.com/sardorsob/Mora-Fluvial-Analysis'
  );
});

test('filters cards across sections and hides sections without matches', () => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  try {
    act(() => root.render(<Projects />));
    const filter = [...container.querySelectorAll('button')]
      .find(button => button.textContent === 'Bayesian');
    act(() => filter.click());
    expect([...container.querySelectorAll('.project-group > h3')]
      .map(heading => heading.textContent)).toEqual([
      'Probabilistic Modeling', 'Maps & Visual Stories'
    ]);
    expect(container.textContent).toContain('Uncertain Transit Access');
    expect(container.textContent).toContain('Reading the Corn Belt');
    expect(container.textContent).not.toContain('Pacific Dataviz Challenge: Water & Energy');
    expect(container.textContent).not.toContain('Mount Rainier Fluvial Seismology');
    const all = [...container.querySelectorAll('button')]
      .find(button => button.textContent === 'All');
    act(() => all.click());
    expect(container.querySelectorAll('.project-card')).toHaveLength(8);
  } finally {
    act(() => root.unmount());
    delete global.IS_REACT_ACT_ENVIRONMENT;
  }
});
