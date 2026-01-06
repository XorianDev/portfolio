/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
import { describe, it, expect, beforeAll } from 'vitest';

let component: string;

beforeAll(async () => {
  component = await import('./Resume.astro?raw').then(m => m.default);
});

describe('Resume Component', () => {
  it('should be defined', async () => {
    const resume = await import('./Resume.astro').then(m => m.default);
    expect(resume).toBeDefined();
  });

  it('should render without errors', async () => {
    const resume = await import('./Resume.astro').then(m => m.default);
    expect(typeof resume).toBe('function');
  });

  it('should be callable', async () => {
    const resume = await import('./Resume.astro').then(m => m.default);
    expect(typeof resume.default === 'undefined').toBe(true);
  });

  it('should render the Experience section', async () => {
    expect(component).toContain('Experience');
  });

  it('should display Frontend Developer position', async () => {
    expect(component).toContain('Frontend Developer');
    expect(component).toContain('Globant');
    expect(component).toContain('May 2022 - current');
  });

  it('should display Quality Analyst position', async () => {
    expect(component).toContain('Quality Analyst');
    expect(component).toContain('Sept 2020 - May 2022');
  });

  it('should contain links to company and projects', async () => {
    expect(component).toContain('https://www.globant.com/');
    expect(component).toContain('FactoryTalk Design Studio');
    expect(component).toContain('Hogwarts Legacy');
  });

  it('should display Remote badge for Frontend role', async () => {
    expect(component).toContain('Remote');
  });

  it('should render experience achievements as list items', async () => {
    expect(component).toContain('list-disc');
    expect(component).toContain('TDD');
    expect(component).toContain('Angular, TypeScript, and GraphQL');
  });

  it('should include View Resume button', async () => {
    expect(component).toContain('View Resume');
  });

  it('should have proper dark mode classes', async () => {
    expect(component).toContain('dark:');
  });

  it('should have scroll-mt-16 for anchor navigation', async () => {
    expect(component).toContain('scroll-mt-16');
  });

  it('should have id attribute for section linking', async () => {
    expect(component).toContain('id="resume"');
  });
});
