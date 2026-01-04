import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('Skills Component', () => {
  let html: string;

  beforeAll(() => {
    const filePath = resolve(__dirname, './Skills.astro');
    html = readFileSync(filePath, 'utf-8');
  });

  describe('Component Structure', () => {
    it('should contain a skills section', () => {
      expect(html).toContain('id="skills"');
    });

    it('should have a main heading "Skills"', () => {
      expect(html).toContain('<h2 class="text-3xl font-semibold">Skills</h2>');
    });

    it('should have 5 skill category headings', () => {
      const h3Count = (html.match(/<h3/g) || []).length;
      expect(h3Count).toBe(5);
    });

    it('should contain all skill categories', () => {
      expect(html).toContain('Frontend');
      expect(html).toContain('Testing & Quality');
      expect(html).toContain('APIs & Data');
      expect(html).toContain('Tooling & Workflow');
      expect(html).toContain('Exploring');
    });
  });

  describe('Frontend Skills', () => {
    it('should have Frontend category', () => {
      expect(html).toContain('class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">');
      expect(html).toContain('Frontend');
    });

    it('should contain all Frontend skills', () => {
      expect(html).toContain('Angular');
      expect(html).toContain('Astro');
      expect(html).toContain('TypeScript');
      expect(html).toContain('HTML & CSS');
      expect(html).toContain('Tailwind');
    });
  });

  describe('Testing & Quality Skills', () => {
    it('should have Testing & Quality category', () => {
      expect(html).toContain('Testing & Quality');
    });

    it('should contain all Testing & Quality skills', () => {
      expect(html).toContain('Mocha');
      expect(html).toContain('TestCafe');
      expect(html).toContain('Vitest');
      expect(html).toContain('Cypress');
    });
  });

  describe('APIs & Data Skills', () => {
    it('should have APIs & Data category', () => {
      expect(html).toContain('APIs & Data');
    });

    it('should contain all APIs & Data skills', () => {
      expect(html).toContain('Node');
      expect(html).toContain('GraphQL');
      expect(html).toContain('REST APIs');
      expect(html).toContain('PostgreSQL');
      expect(html).toContain('MongoDB');
    });
  });

  describe('Tooling & Workflow Skills', () => {
    it('should have Tooling & Workflow category', () => {
      expect(html).toContain('Tooling & Workflow');
    });

    it('should contain all Tooling & Workflow skills', () => {
      expect(html).toContain('Git');
      expect(html).toContain('Jira');
      expect(html).toContain('Confluence');
      expect(html).toContain('Agile / SAFe');
    });
  });

  describe('Exploring Skills', () => {
    it('should have Exploring category', () => {
      expect(html).toContain('Exploring');
    });

    it('should contain all Exploring skills', () => {
      expect(html).toContain('AWS');
      expect(html).toContain('React');
      expect(html).toContain('Godot');
    });
  });

  describe('Styling and Layout', () => {
    it('should have dark mode support', () => {
      expect(html).toContain('dark:text-white');
      expect(html).toContain('dark:text-gray-400');
    });

    it('should have responsive layout classes', () => {
      expect(html).toContain('md:flex-row');
      expect(html).toContain('md:max-w-sm');
    });

    it('should have proper spacing classes', () => {
      expect(html).toContain('space-y-1');
      expect(html).toContain('gap-y-10');
      expect(html).toContain('gap-x-16');
    });

    it('should have proper flex layout', () => {
      expect(html).toContain('flex justify-center');
      expect(html).toContain('flex-col');
    });

    it('should have Tailwind color classes', () => {
      expect(html).toContain('text-gray-900');
      expect(html).toContain('text-gray-500');
      expect(html).toContain('text-gray-400');
      expect(html).toContain('bg-neutral-primary');
    });
  });

  describe('Total Skills Count', () => {
    it('should have 21 total skill items', () => {
      const liCount = (html.match(/<li>/g) || []).length;
      expect(liCount).toBe(21);
    });
  });

  describe('Structure Validation', () => {
    it('should have proper semantic HTML', () => {
      expect(html).toContain('<section');
      expect(html).toContain('<h2');
      expect(html).toContain('<h3');
      expect(html).toContain('<ul');
      expect(html).toContain('<li');
    });

    it('should have proper nesting', () => {
      expect(html).toContain('</li>');
      expect(html).toContain('</ul>');
      expect(html).toContain('</section>');
    });
  });
});