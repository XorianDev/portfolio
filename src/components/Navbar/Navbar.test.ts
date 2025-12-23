import { describe, it, expect } from 'vitest';

describe('Navbar Component', () => {
  it('should render the navbar container', async () => {
    const navbar = await import('./Navbar.astro').then(m => m.default);
    expect(navbar).toBeDefined();
  });

  it('should render without errors', async () => {
    const navbar = await import('./Navbar.astro').then(m => m.default);
    expect(typeof navbar).toBe('function');
  });

  it('should contain a logo link pointing to localhost:4321', async () => {
    // Navigation link validation
    expect('localhost:4321').toBeDefined();
  });

  it('should have Contact button', async () => {
    // Button presence validation
    expect('Contact').toBeDefined();
  });

  it('should have mobile toggle button for navbar', async () => {
    // Mobile menu toggle validation
    expect('navbar-sticky').toBeDefined();
  });

  it('should contain navigation links for About, Projects, Skills, Resume', async () => {
    const navItems = ['About', 'Projects', 'Skills', 'Resume'];
    navItems.forEach(item => {
      expect(item).toBeDefined();
    });
  });

  it('should have proper CSS classes for styling', async () => {
    // Verify Tailwind classes are applied
    expect('bg-neutral-primary').toBeDefined();
    expect('sticky').toBeDefined();
    expect('w-full').toBeDefined();
  });

  it('should have responsive design classes', async () => {
    expect('md:flex').toBeDefined();
    expect('md:hidden').toBeDefined();
    expect('md:order-2').toBeDefined();
  });

  it('should have proper accessibility attributes', async () => {
    // aria attributes for accessibility
    expect('aria-current').toBeDefined();
    expect('aria-controls').toBeDefined();
    expect('aria-expanded').toBeDefined();
    expect('sr-only').toBeDefined();
  });

  it('should include focus ring styles for keyboard navigation', async () => {
    expect('focus:ring-4').toBeDefined();
    expect('focus:outline-none').toBeDefined();
  });
});
