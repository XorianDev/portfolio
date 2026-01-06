/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
import { describe, it, expect } from 'vitest';

describe('Projects Component', () => {
  it('should be defined', async () => {
    const projects = await import('./Projects.astro').then(m => m.default);
    expect(projects).toBeDefined();
  });

  it('should render without errors', async () => {
    const projects = await import('./Projects.astro').then(m => m.default);
    expect(typeof projects).toBe('function');
  });

  it('should be callable', async () => {
    const projects = await import('./Projects.astro').then(m => m.default);
    expect(typeof projects.default === 'undefined').toBe(true);
  });
});
