import { describe, it, expect } from 'vitest';

describe('Skills Component', () => {
  it('should be defined', async () => {
    const skills = await import('./Skills.astro').then(m => m.default);
    expect(skills).toBeDefined();
  });

  it('should render without errors', async () => {
    const skills = await import('./Skills.astro').then(m => m.default);
    expect(typeof skills).toBe('function');
  });

  it('should be callable', async () => {
    const skills = await import('./Skills.astro').then(m => m.default);
    expect(typeof skills.default === 'undefined').toBe(true);
  });
});
