import React from 'react';
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

test('includes the completed Pacific Climate Evidence Atlas project', () => {
  const project = projectsData.projects.find(
    ({ title }) => title === 'Pacific Climate Evidence Atlas'
  );

  expect(project).toEqual(expect.objectContaining({
    year: '2026',
    link: 'https://pacific-climate-gap-atlas-app.vercel.app/?view=overview',
    github: 'https://github.com/sardorsob/Pacific-Climate-Gap-Atlas'
  }));
  expect(project).not.toHaveProperty('screenshot');
});

test('orders active projects and gives each one its GitHub repository', () => {
  const visibleProjects = projectsData.projects.filter(({ hidden }) => !hidden);
  const visibleTitles = visibleProjects.map(({ title }) => title);

  expect(visibleTitles).toEqual([
    'GeoCrop Spatiotemporal Modeling',
    'Wildfire Property Intelligence',
    'Probabilistic Hurricane Track Forecasting',
    'Pacific Climate Evidence Atlas',
    'Uncertain Transit Access',
    'Neural Regime Shift'
  ]);
  expect(Object.fromEntries(
    visibleProjects.map(({ title, github }) => [title, github])
  )).toEqual({
    'GeoCrop Spatiotemporal Modeling': 'https://github.com/sardorsob/GeoCrop-Spatiotemporal-Modeling',
    'Wildfire Property Intelligence': 'https://github.com/sardorsob/Wildfire-Property-Intelligence',
    'Probabilistic Hurricane Track Forecasting': 'https://github.com/sardorsob/Probabilistic-Storm-Tracks',
    'Pacific Climate Evidence Atlas': 'https://github.com/sardorsob/Pacific-Climate-Gap-Atlas',
    'Uncertain Transit Access': 'https://github.com/sardorsob/Uncertain-Transit-Access',
    'Neural Regime Shift': 'https://github.com/sardorsob/Neural-Regime-Shift'
  });
  expect(projectsData.projects.every(
    (project) => !('screenshot' in project) && !('image' in project)
  )).toBe(true);
});

test('renders the project GitHub link with its icon', () => {
  const project = {
    title: 'Pacific Climate Evidence Atlas',
    description: 'A concise project description.',
    tags: ['Climate Data'],
    link: 'https://pacific-climate-gap-atlas-app.vercel.app/?view=overview',
    github: 'https://github.com/sardorsob/Pacific-Climate-Gap-Atlas'
  };

  const page = render(<ProjectCard project={project} />);
  const githubLink = page.querySelector(`a[href="${project.github}"]`);

  expect(page.querySelector('img')).toBeNull();
  expect(page.querySelector(`a[href="${project.link}"]`)).not.toBeNull();
  expect(githubLink).not.toBeNull();
  expect(githubLink?.querySelector('svg')).not.toBeNull();
  expect(githubLink?.textContent).toContain('GitHub');
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
