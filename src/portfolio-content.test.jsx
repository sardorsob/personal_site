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

test('uses concise active project titles and hides retired projects', () => {
  const visibleTitles = projectsData.projects
    .filter(({ hidden }) => !hidden)
    .map(({ title }) => title);

  expect(visibleTitles).toEqual([
    'Pacific Climate Evidence Atlas',
    'Uncertain Transit Access',
    'GeoCrop Spatiotemporal Modeling',
    'Wildfire Property Intelligence',
    'Neural Regime Shift',
    'Probabilistic Hurricane Track Forecasting'
  ]);
  expect(projectsData.projects.every(
    (project) => !('screenshot' in project) && !('image' in project)
  )).toBe(true);
});

test('renders both Pacific project links without an image', () => {
  const project = {
    title: 'Pacific Climate Evidence Atlas',
    description: 'A concise project description.',
    tags: ['Climate Data'],
    link: 'https://pacific-climate-gap-atlas-app.vercel.app/?view=overview',
    github: 'https://github.com/sardorsob/Pacific-Climate-Gap-Atlas'
  };

  const page = render(<ProjectCard project={project} />);

  expect(page.querySelector('img')).toBeNull();
  expect(page.querySelector(`a[href="${project.link}"]`)).not.toBeNull();
  expect(page.querySelector(`a[href="${project.github}"]`)).not.toBeNull();
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
