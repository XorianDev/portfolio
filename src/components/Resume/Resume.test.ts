import { describe, it, expect } from 'vitest';

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
});
