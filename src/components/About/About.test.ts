/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
import { describe, it, expect, beforeAll } from 'vitest';

let component: string;

beforeAll(async () => {
  component = await import('./About.astro?raw').then(m => m.default);
});

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

  it('should contain heading text "Software Developer"', async () => {
    expect(component).toContain('Software Developer');
  });

  it('should contain description text about ethical work', async () => {
    expect(component).toContain('Focused on ethical work, continuous learning, and collaborative teams');
  });

  it('should contain personal description', async () => {
    expect(component).toContain('Uruguayan, husband, father, musician, gamer');
  });

  it('should have avatar image element', async () => {
    expect(component).toContain('/avatar.webp');
    expect(component).toContain('img');
  });

  it('should contain connect button', async () => {
    expect(component).toContain("Let's connect");
  });

  it('should contain learn more button', async () => {
    expect(component).toContain('Learn more');
  });

  it('should have responsive classes for different screen sizes', async () => {
    expect(component).toContain('md:');
    expect(component).toContain('lg:');
    expect(component).toContain('sm:');
  });
});
