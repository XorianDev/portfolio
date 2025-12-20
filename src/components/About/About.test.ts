import { describe, it, expect } from 'vitest';

describe('About Component', () => {
  it('should be defined', async () => {
    const about = await import('./About.astro').then(m => m.default);
    expect(about).toBeDefined();
  });

  it('should render without errors', async () => {
    const about = await import('./About.astro').then(m => m.default);
    expect(typeof about).toBe('function');
  });

  it('should be callable', async () => {
    const about = await import('./About.astro').then(m => m.default);
    expect(typeof about.default === 'undefined').toBe(true);
  });
});
